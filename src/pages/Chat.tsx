import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChatInterface } from '../components/ChatInterface';
import { supabase } from '../lib/supabase';
import type { Conversation, Message } from '../lib/database.types';
import chatData from '../data/chatData.json';

export function Chat() {
  const [searchParams] = useSearchParams();
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
      if (chatData[chatId as keyof typeof chatData]) {
        const chat = chatData[chatId as keyof typeof chatData];
        setMessages(chat.messages);
        setActiveConversationId(chatId);
      } else {
        loadMessages(chatId);
        setActiveConversationId(chatId);
      }
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

  const simulateAssistantResponse = (userMessage: string): string => {
    const responses = [
      "That's an interesting question! Let me think about that for a moment. Based on what you're asking, I'd say that understanding the context is really important here.",
      "I appreciate you sharing that with me. From my perspective, there are several ways we could approach this topic, each with their own merits.",
      "Great question! This is a topic that has many facets to consider. Let me break down some key points that might help address what you're asking about.",
      "Thank you for bringing this up. It's definitely worth exploring further. Let me share some thoughts that might be helpful in this context.",
      "I understand what you're getting at. This is something that requires careful consideration of various factors. Here's what I think...",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return `${randomResponse}\n\nRegarding "${userMessage.slice(0, 30)}${userMessage.length > 30 ? '...' : ''}", I think it's important to consider multiple perspectives. What specific aspect would you like me to focus on?`;
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

      setTimeout(async () => {
        const assistantResponse = simulateAssistantResponse(content);
        const { data: assistantMessage, error: assistantMsgError } = await supabase
          .from('messages')
          .insert({ conversation_id: newConvo.id, role: 'assistant', content: assistantResponse })
          .select()
          .single();

        if (assistantMsgError) {
          console.error('Error creating assistant message:', assistantMsgError);
          setIsLoading(false);
          return;
        }

        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);

        await supabase
          .from('conversations')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', newConvo.id);

        await loadConversations();
      }, 1000 + Math.random() * 1000);

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

    setTimeout(async () => {
      const assistantResponse = simulateAssistantResponse(content);
      const { data: assistantMessage, error: assistantMsgError } = await supabase
        .from('messages')
        .insert({ conversation_id: activeConversationId, role: 'assistant', content: assistantResponse })
        .select()
        .single();

      if (assistantMsgError) {
        console.error('Error creating assistant message:', assistantMsgError);
        setIsLoading(false);
        return;
      }

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);

      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', activeConversationId);

      await loadConversations();
    }, 1000 + Math.random() * 1000);
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