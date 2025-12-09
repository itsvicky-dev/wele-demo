import { useState, useEffect } from 'react';
import { ChatInterface } from '../components/ChatInterface';
import { supabase } from '../lib/supabase';
import type { Message } from '../lib/database.types';

export function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  useEffect(() => {
    if (activeConversationId) {
      loadMessages(activeConversationId);
    }
  }, [activeConversationId]);

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

  const simulateAssistantResponse = (userMessage: string): string => {
    const responses = [
      "That's an interesting question! Let me think about that for a moment.",
      "I appreciate you sharing that with me. Here's what I think...",
      "Great question! Let me break down some key points for you.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async (content: string) => {
    if (!activeConversationId) {
      const { data: newConvo, error } = await supabase
        .from('conversations')
        .insert({ title: content.slice(0, 50) })
        .select()
        .single();

      if (error) return;

      setActiveConversationId(newConvo.id);

      const { data: userMessage } = await supabase
        .from('messages')
        .insert({ conversation_id: newConvo.id, role: 'user', content })
        .select()
        .single();

      setMessages([userMessage!]);
      setIsLoading(true);

      setTimeout(async () => {
        const assistantResponse = simulateAssistantResponse(content);
        const { data: assistantMessage } = await supabase
          .from('messages')
          .insert({ conversation_id: newConvo.id, role: 'assistant', content: assistantResponse })
          .select()
          .single();

        setMessages(prev => [...prev, assistantMessage!]);
        setIsLoading(false);
      }, 1000);

      return;
    }

    const { data: userMessage } = await supabase
      .from('messages')
      .insert({ conversation_id: activeConversationId, role: 'user', content })
      .select()
      .single();

    setMessages(prev => [...prev, userMessage!]);
    setIsLoading(true);

    setTimeout(async () => {
      const assistantResponse = simulateAssistantResponse(content);
      const { data: assistantMessage } = await supabase
        .from('messages')
        .insert({ conversation_id: activeConversationId, role: 'assistant', content: assistantResponse })
        .select()
        .single();

      setMessages(prev => [...prev, assistantMessage!]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <ChatInterface
      messages={messages}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
    />
  );
}
