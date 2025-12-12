import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChatInterface } from '../components/ChatInterface';
import { supabase } from '../lib/supabase';
import { aiService } from '../services/aiService';
import type { Conversation, Message } from '../lib/database.types';
import type { AIMessage } from '../services/aiService';
import chatData from '../data/chatData.json';

export function Chat() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const chatId = searchParams.get('id');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(chatId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (chatId) {
      loadMessages(chatId);
      setActiveConversationId(chatId);
    } else {
      setMessages([]);
      setActiveConversationId(null);
    }
  }, [chatId]);

  const loadConversations = async () => {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error loading conversations:', error);
      return;
    }

    setConversations(data || []);
  };

  const loadMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
      if (chatData[conversationId as keyof typeof chatData]) {
        const chat = chatData[conversationId as keyof typeof chatData];
        setMessages(chat.messages);
      }
      return;
    }

    setMessages(data || []);
  };

  const updateConversationTitle = async (conversationId: string, firstMessage: string) => {
    const title = firstMessage.slice(0, 50) + (firstMessage.length > 50 ? '...' : '');

    const { error } = await supabase
      .from('conversations')
      .update({ title, updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    if (error) {
      console.error('Error updating conversation title:', error);
      return;
    }

    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, title, updated_at: new Date().toISOString() }
          : conv
      )
    );
  };

  const generateAssistantResponse = async (conversationId: string, userMessage: string) => {
    const conversationMessages: AIMessage[] = messages
      .filter(msg => msg.conversation_id === conversationId)
      .map(msg => ({ role: msg.role as 'user' | 'assistant', content: msg.content }));
    
    conversationMessages.push({ role: 'user', content: userMessage });

    let assistantContent = '';
    const { data: assistantMessage, error } = await supabase
      .from('messages')
      .insert({ conversation_id: conversationId, role: 'assistant', content: '' })
      .select()
      .single();

    if (error) {
      console.error('Error creating assistant message:', error);
      return;
    }

    setMessages(prev => [...prev, assistantMessage]);

    try {
      for await (const chunk of aiService.streamResponse(conversationMessages)) {
        if (!chunk.isComplete) {
          assistantContent += chunk.content;
          setMessages(prev => 
            prev.map(msg => 
              msg.id === assistantMessage.id 
                ? { ...msg, content: assistantContent }
                : msg
            )
          );
        }
      }

      await supabase
        .from('messages')
        .update({ content: assistantContent })
        .eq('id', assistantMessage.id);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorContent = "Sorry, I'm having trouble generating a response. Please try again.";
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessage.id 
            ? { ...msg, content: errorContent }
            : msg
        )
      );

      await supabase
        .from('messages')
        .update({ content: errorContent })
        .eq('id', assistantMessage.id);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!activeConversationId) {
      const { data: newConvo, error } = await supabase
        .from('conversations')
        .insert({ title: content.slice(0, 50) + (content.length > 50 ? '...' : '') })
        .select()
        .single();

      if (error) {
        console.error('Error creating conversation:', error);
        return;
      }

      setConversations(prev => [newConvo, ...prev]);
      setActiveConversationId(newConvo.id);

      const { data: userMessage, error: userMsgError } = await supabase
        .from('messages')
        .insert({ conversation_id: newConvo.id, role: 'user', content })
        .select()
        .single();

      if (userMsgError) {
        console.error('Error creating user message:', userMsgError);
        return;
      }

      setMessages([userMessage]);
      setIsLoading(true);

      await generateAssistantResponse(newConvo.id, content);
      setIsLoading(false);

      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', newConvo.id);

      await loadConversations();
      
      // Refresh sidebar chat history
      window.dispatchEvent(new CustomEvent('refreshChatHistory'));
      
      // Redirect to the new chat
      navigate(`/chat?id=${newConvo.id}`);
      return;
    }

    const { data: userMessage, error: userMsgError } = await supabase
      .from('messages')
      .insert({ conversation_id: activeConversationId, role: 'user', content })
      .select()
      .single();

    if (userMsgError) {
      console.error('Error creating user message:', userMsgError);
      return;
    }

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const isFirstMessage = messages.length === 0;
    if (isFirstMessage) {
      await updateConversationTitle(activeConversationId, content);
    }

    await generateAssistantResponse(activeConversationId, content);
    setIsLoading(false);

    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', activeConversationId);

    await loadConversations();
  };

  const currentConversation = conversations.find(conv => conv.id === activeConversationId);
  const selectedChat = chatId ? chatData[chatId as keyof typeof chatData] : null;
  const isNewChat = !chatId && (!activeConversationId || messages.length === 0);
  const chatTitle = selectedChat?.title || currentConversation?.title;

  return (
    <ChatInterface
      messages={messages}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
      chatTitle={chatTitle}
      isNewChat={isNewChat}
    />
  );
}