import React, { useState, useRef, useEffect } from 'react';
import echo from '@/services/echo';
import { useTranslation } from 'react-i18next';
import { Search, Send, Paperclip, ArrowLeft, Plus, MoreVertical, PanelLeft, Trash2, Loader2, File, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/services/api';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'react-router-dom';

// Composants UI
const Avatar = ({ fallback, color, online, size = 'default' }) => {
  const sizeClasses = size === 'large' ? 'w-12 h-12 text-xl' : 'w-10 h-10 text-base';
  return (
    <div className="relative flex-shrink-0">
      <div className={`relative flex items-center justify-center rounded-full font-medium text-white ${sizeClasses} ${color || 'bg-gray-400'}`}>
        {fallback}
      </div>
      {online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
    </div>
  );
};

const SearchInput = ({ placeholder, value, onChange }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#009739] focus:border-transparent"
    />
  </div>
);

const ConversationItem = ({ conv, onSelect, isSelected, currentUser }) => {
  const { t } = useTranslation();
  // Trouver l'autre participant dans la conversation
  const otherParticipant = conv.participants?.find(p => p.id !== currentUser?.id);
  const participantName = otherParticipant ? [otherParticipant.prenom, otherParticipant.nom].filter(Boolean).join(' ') : t('pages.messages.unknownUser');
  const lastMessage = conv.messages?.[conv.messages.length - 1];
  console.log(conv);

  return (
    <div
      onClick={() => onSelect(conv)}
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${isSelected ? 'bg-green-100' : 'hover:bg-gray-50'}`}
    >
      <Avatar fallback={participantName.substring(0, 2).toUpperCase() || '??'} color={conv.color} online={otherParticipant?.is_active} />
      <div className="flex-grow ml-4 min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-sm text-gray-800 truncate">{participantName}</p>
          <p className="text-xs text-gray-400 flex-shrink-0 ml-2">{lastMessage ? new Date(lastMessage.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : ''}</p>
        </div>
        <div className="flex justify-between items-start mt-1">
          <p className="text-xs text-gray-500 truncate pr-4">{lastMessage?.content || t('pages.messages.noMessages')}</p>
          {conv.unread_count > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0">
              {conv.unread_count}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const ConversationList = ({ conversations, onSelect, selectedId, loading, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();
  const filteredConversations = conversations.filter(c => {
    if (!currentUser) return false;
    const otherParticipant = c.participants?.find(p => p.id !== currentUser.id);
    if (!otherParticipant) return false;
    const participantName = [otherParticipant.prenom, otherParticipant.nom].filter(Boolean).join(' ');
    return participantName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  console.log(filteredConversations);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col bg-white border-r border-gray-200 items-center justify-center" style={{ flexShrink: 0 }}>
        <Loader2 className="w-8 h-8 animate-spin text-[#009739]" />
        <p className="mt-2 text-gray-600">{t('pages.messages.loading')}</p>
      </div>
    );
  }
  if (conversations.length === 0) {
    return (
      <div className="w-full h-full flex flex-col bg-white border-r border-gray-200" style={{ flexShrink: 0 }}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">{t('pages.messages.title')}</h2>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-[#009739]">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <SearchInput
            placeholder={t('pages.messages.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <p className="w-full h-full flex flex-col bg-white items-center justify-center">
          {t('pages.messages.empty')}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-white border-r border-gray-200" style={{ flexShrink: 0 }}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">{t('pages.messages.title')}</h2>
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-[#009739]">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <SearchInput
          placeholder={t('pages.messages.search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex-grow overflow-y-auto p-2 space-y-1">
        {filteredConversations.map(conv => (
          <ConversationItem
            key={conv.id}
            conv={conv}
            onSelect={onSelect}
            currentUser={currentUser}
            isSelected={selectedId === conv.id}
          />
        ))}
      </div>
    </div>
  );
};

const ChatView = ({ conversation, onBack, onToggleList, isListVisible, onMessageSent, onMessageDeleted }) => {
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null); // Added textareaRef for auto-resizing

  // 👇 Real-time integration
  useEffect(() => {
    if (!conversation?.id || !user) { // Ensure conversation and user are available
      return;
    }

    // Subscribe to the private channel for this conversation
    // The channel name should match your Laravel backend's broadcasting setup
    const channelName = `conversations.${conversation.id}`; // Assuming private channels for chat
    const channel = echo.private(channelName);

    // Listen for the 'MessageSent' event (adjust event name if different in Laravel)
    channel.listen('.message.sent', (e) => { // Assuming 'MessageSent' is the event name
      // Check if the message is not from the current user to avoid duplicates
      // (messages sent by the current user are optimistically added)
      if (e.message.sender_id !== user.id) {
        setMessages(prevMessages => [...prevMessages, e.message]);
      }
      onMessageSent(); // To refresh the conversation list in the sidebar (e.g., last message, unread count)
    });

    // Cleanup function: unsubscribe from the channel when component unmounts
    // or when the selected conversation changes
    return () => { echo.leave(channelName); };
  }, [conversation?.id, user, onMessageSent]); // Re-run effect if conversation or user changes

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversation?.id) return;
      setLoading(true);
      try {
        const response = await api.get(`/conversations/${conversation.id}`);
        setMessages(response.data.messages || []);
      } catch (error) {
        toast.error("Erreur lors du chargement des messages.");
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [conversation?.id]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [newMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if ((newMessage.trim() || attachments.length > 0) && conversation?.id) {
      const tempId = Date.now();
      // Ensure user.id is available for optimistic update
      if (!user?.id) {
        toast.error("Erreur: Utilisateur non identifié pour l'envoi du message.");
        return;
      }

      const sentMessage = {
        id: tempId,
        content: newMessage,
        sender_id: user.id,
        attachments: attachments.map(file => ({ name: file.name, url: URL.createObjectURL(file) })), // Preview
        created_at_time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        isSending: true,
      }; // Optimistic update
      setMessages(prev => [...prev, sentMessage]);
      setNewMessage('');

      try {
        const formData = new FormData();
        formData.append('content', sentMessage.content);
        attachments.forEach(file => {
          formData.append('attachments[]', file);
        });

        const response = await api.post(`/messages/${conversation.id}`, formData);
        setAttachments([]); // Clear attachments after sending
        setMessages(prev => prev.map(msg => msg.id === tempId ? { ...response.data, isSending: false } : msg));
        onMessageSent(); // Pour rafraîchir la liste des conversations
      } catch (error) {
        toast.error("Échec de l'envoi du message.");
        setMessages(prev => prev.filter(msg => msg.id !== tempId));
      }
    }
  };

  const handleDelete = async (messageId) => {
    const originalMessages = [...messages];
    setMessages(prev => prev.filter(msg => msg.id !== messageId));

    try {
      await api.delete(`/messages/${messageId}`);
      toast.success("Message supprimé.");
      onMessageDeleted(); // Rafraîchir la liste des conversations
    } catch (error) {
      toast.error("Erreur lors de la suppression.");
      setMessages(originalMessages);
    }
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setAttachments(prev => [...prev, ...files]);
    }
  };

  const handleRemoveAttachment = (indexToRemove) => {
    setAttachments(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  if (loading) {
    return (
      <div className="flex-grow h-full flex flex-col bg-gray-50 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#009739]" />
      </div>
    );
  }

  return (
    <div className="flex-grow h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center p-3 border-b border-gray-200 bg-white shadow-sm flex-shrink-0">
        <button onClick={onToggleList} className="hidden md:block p-2 mr-2 rounded-full hover:bg-gray-100 text-gray-600">
          <PanelLeft className={`w-5 h-5 transition-transform duration-300 ${isListVisible ? '' : 'rotate-180'}`} />
        </button>
        <button onClick={onBack} className="md:hidden p-2 mr-2 rounded-full hover:bg-gray-100 text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <Avatar fallback={conversation.participant?.name?.substring(0, 2).toUpperCase() || '??'} color={conversation.color} online={conversation.participant?.online} size="large" />
        <div className="ml-4">
          <p className="font-bold text-gray-900">{conversation.participant?.name}</p>
          <p className={`text-xs ${conversation.participant?.online ? 'text-green-600' : 'text-gray-500'}`}>
            {conversation.participant?.online ? t('pages.messages.online') : t('pages.messages.offline')}
          </p>
        </div>
        <div className="ml-auto">
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`group flex items-end gap-2 ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'}`}>
              {msg.sender_id === user.id && (
                <button onClick={() => handleDelete(msg.id)} className="opacity-0 group-hover:opacity-100 text-red-500 p-1">
                  <Trash2 size={14} />
                </button>
              )}
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-2xl break-words ${msg.sender_id === user.id
                    ? 'bg-[#009739] text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  } ${msg.isSending ? 'opacity-50' : ''}`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.sender_id === user.id ? 'text-green-100' : 'text-gray-400'}`}>
                  {msg.created_at_time}
                </p>
              </div>
              {/* Affichage des pièces jointes */}
              {msg.attachments && msg.attachments.length > 0 && (
                console.log(msg.attachments),
                <div className="mt-2 space-y-2">
                  {msg.attachments.map((att, index) => (
                    <a key={index} href={att.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg text-sm text-blue-600 hover:underline">
                      <File size={16} />
                      <span>{att.name || 'Pièce jointe'}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
        {/* Prévisualisation des pièces jointes */}
        {attachments.length > 0 && (
          <div className="mb-2 p-2 border rounded-lg bg-gray-50 max-h-32 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-2 rounded border text-sm">
                  <span className="truncate text-gray-700">{file.name}</span>
                  <button onClick={() => handleRemoveAttachment(index)} className="text-red-500 hover:text-red-700 ml-2">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="relative flex items-end gap-2">
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
          {/* Added textareaRef to the textarea */}
          <button onClick={() => fileInputRef.current.click()} className="p-2 text-gray-500 hover:text-gray-800 flex-shrink-0">
            <Paperclip className="w-5 h-5" />
          </button>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              // Auto-resize textarea logic
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={t('pages.messages.writeMessage')}
            rows="1"
            ref={textareaRef} // Assign ref here
            className="flex-grow px-4 py-2.5 border border-gray-200 rounded-full bg-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-[#009739] transition-all"
            style={{ maxHeight: '120px' }}
          />
          <button
            onClick={handleSend}
            className="bg-[#009739] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#007a2f] transition-colors disabled:bg-gray-300 flex-shrink-0"
            disabled={!newMessage.trim() && attachments.length === 0}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const MessagesSection = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isListVisible, setIsListVisible] = useState(true);
  const { t } = useTranslation();
  const { state: locationState } = useLocation();
  const { user } = useAuth(); // Get user here for conversation processing
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // eslint-disable-line no-unused-vars

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const response = await api.get('/conversations');
      const rawConversations = response.data || [];

      const processedConversations = rawConversations.map(conv => {
        const otherParticipant = user ? conv.participants.find(p => p.id !== user.id) : null;
        const participantName = otherParticipant ? [otherParticipant.prenom, otherParticipant.nom].filter(Boolean).join(' ') : t('pages.messages.unknownUser');
        const colors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-orange-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
        const color = colors[((otherParticipant?.id || 0) % colors.length)];

        return {
          ...conv,
          participant: otherParticipant ? { id: otherParticipant.id, name: participantName, online: otherParticipant.is_active } : { name: t('pages.messages.unknownUser') },
          color: color
        };
      });

      setConversations(processedConversations);
      return processedConversations;
    } catch (error) {
      toast.error("Erreur lors du chargement des conversations.");
      setConversations([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedFetchConversations = React.useCallback(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!user) return;
    const init = async () => {
      const convs = await memoizedFetchConversations();
      const conversationIdFromState = locationState?.conversationId;

      if (conversationIdFromState && convs.length > 0) {
        const conversationToSelect = convs.find(c => c.id === conversationIdFromState);
        if (conversationToSelect) {
          setSelectedConversation(conversationToSelect);
        }
      }
    };
    init(); // Call init only once user is available
  }, [locationState?.conversationId, user, memoizedFetchConversations]); // Depend on user

  const handleSelectConversation = (conv) => {
    setSelectedConversation(conv);
  };

  if (isMobile) {
    return (
      <div className="h-[calc(100vh-56px)] w-full bg-white overflow-hidden relative">
        <AnimatePresence initial={false}>
          {selectedConversation ? (
            <motion.div
              key="chat"
              className="w-full h-full absolute top-0 left-0"
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <ChatView
                conversation={selectedConversation}
                onBack={() => setSelectedConversation(null)}
                onToggleList={() => { }}
                isListVisible={false}
                onMessageSent={memoizedFetchConversations}
                onMessageDeleted={memoizedFetchConversations}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              className="w-full h-full absolute top-0 left-0"
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <ConversationList
                conversations={conversations}
                onSelect={handleSelectConversation}
                selectedId={null}
                currentUser={user}
                loading={loading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-56px)] w-full bg-white overflow-hidden">
      <AnimatePresence>
        {isListVisible && (
          <motion.div
            className="w-full md:w-1/3 lg:w-1/4 h-full"
            style={{ flexShrink: 0 }} // Empêche la sidebar d'être compressée par le flex-grow du chat
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ConversationList
              conversations={conversations}
              onSelect={handleSelectConversation}
              selectedId={selectedConversation?.id}
              currentUser={user}
              loading={loading}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow h-full">
        {selectedConversation ? (
          <ChatView
            conversation={selectedConversation}
            onBack={() => setSelectedConversation(null)}
            onToggleList={() => setIsListVisible(!isListVisible)}
            isListVisible={isListVisible}
            onMessageSent={memoizedFetchConversations}
            onMessageDeleted={memoizedFetchConversations}
          />
        ) : (
          <div className="flex flex-grow flex-col items-center justify-center bg-gray-50 text-center p-8 h-full">
            {/* Placeholder content */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesSection;