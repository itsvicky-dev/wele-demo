import { Search, SlidersHorizontal, Clock, MoreHorizontal, ChevronDown, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { chatService } from "../services/chatService";
import type { Conversation, Message } from "../lib/database.types";

interface ConversationWithPreview extends Conversation {
  preview?: string;
}

export function ChatHistory() {
  const [conversations, setConversations] = useState<ConversationWithPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    setLoading(true);
    const data = await chatService.getConversations();
    
    // Get preview for each conversation (first user message)
    const conversationsWithPreviews = await Promise.all(
      data.map(async (conv) => {
        const messages = await chatService.getMessages(conv.id);
        const firstUserMessage = messages.find(msg => msg.role === 'user');
        return {
          ...conv,
          preview: firstUserMessage ? firstUserMessage.content.slice(0, 60) + '...' : 'No messages yet'
        };
      })
    );
    
    setConversations(conversationsWithPreviews);
    setLoading(false);
  };

  const handleDeleteConversation = (conversationId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteConfirm(conversationId);
  };

  const confirmDelete = async () => {
    if (deleteConfirm) {
      await chatService.deleteConversation(deleteConfirm);
      setConversations(prev => prev.filter(conv => conv.id !== deleteConfirm));
      setDeleteConfirm(null);
    }
  };

  const filteredConversations = conversations.filter(conv => 
    conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (conv.preview && conv.preview.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col h-screen bg-white max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Library</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search your conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BF53] focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            Select
          </button>
          <button className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-1">
            Type
            <span className="text-gray-400 flex"><ChevronDown size={14} /></span>
          </button>
          <button className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-1">
            Temporary Threads: Show
            <span className="text-gray-400"><ChevronDown size={14} /></span>
          </button>
          <div className="ml-auto">
            <button className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-1">
              Sort: Newest
              <span className="text-gray-400"><ChevronDown size={14} /></span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-8 py-4 scrollbar-hide">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Loading conversations...</div>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-500 mb-2">
              {searchTerm ? 'No conversations found' : 'No conversations yet'}
            </div>
            {!searchTerm && (
              <Link
                to="/chat"
                className="text-[#00BF53] hover:underline text-sm"
              >
                Start your first conversation
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredConversations.map((conversation) => (
              <Link
                key={conversation.id}
                to={`/chat?id=${conversation.id}`}
                className="block border-b border-gray-200 pb-4 hover:bg-gray-50 -mx-4 px-4 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-medium text-gray-800 flex-1 pr-4">
                    {conversation.title}
                  </h3>
                  <button 
                    onClick={(e) => handleDeleteConversation(conversation.id, e)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete conversation"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {conversation.preview}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock size={14} />
                  <span>{chatService.formatTimestamp(conversation.updated_at)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-medium mb-2">Delete conversation?</h3>
            <p className="text-gray-600 text-sm mb-4">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
