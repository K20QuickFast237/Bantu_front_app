import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Paperclip, ArrowLeft, Plus, MoreVertical, PanelLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Données fictives
const conversationsData = [
  { id: 1, name: 'Sarah Martinez', avatar: 'SM', color: 'bg-blue-500', lastMessage: 'Bonjour, je suis très intéressée par le poste...', time: '10:42', unread: 2, online: true },
  { id: 2, name: 'Paul Samuelle', avatar: 'PS', color: 'bg-green-500', lastMessage: 'Merci pour votre retour rapide ! Voici mon CV...', time: 'Hier', unread: 0, online: false },
  { id: 3, name: 'David Stranges', avatar: 'DS', color: 'bg-orange-500', lastMessage: 'Avez-vous pu consulter mon portfolio ?', time: '12/06', unread: 0, online: true },
  { id: 4, name: 'Laura Dubois', avatar: 'LD', color: 'bg-purple-500', lastMessage: 'Je confirme ma disponibilité pour un entretien.', time: '11/06', unread: 1, online: false },
  { id: 5, name: 'Kevin Durant', avatar: 'KD', color: 'bg-red-500', lastMessage: 'Parfait, merci !', time: '10/06', unread: 0, online: false },
];

const messagesData = {
  1: [
    { sender: 'other', text: 'Bonjour, je suis très intéressée par le poste de Développeur Frontend.', time: '10:30' },
    { sender: 'me', text: 'Bonjour Sarah, merci pour votre intérêt. Pouvez-vous me faire parvenir votre CV ?', time: '10:35' },
    { sender: 'other', text: 'Bien sûr, le voici en pièce jointe.', time: '10:40' },
    { sender: 'other', text: 'Je reste à votre disposition pour toute question.', time: '10:42' },
  ],
  2: [
    { sender: 'me', text: 'Bonjour Paul, votre profil correspond à ce que nous recherchons.', time: 'Hier, 14:00' },
    { sender: 'other', text: 'Merci pour votre retour rapide ! Voici mon CV mis à jour.', time: 'Hier, 14:05' },
  ],
};

// Composants UI
const Avatar = ({ fallback, color, online, size = 'default' }) => {
  const sizeClasses = size === 'large' ? 'w-12 h-12 text-xl' : 'w-10 h-10 text-base';
  return (
    <div className="relative flex-shrink-0">
      <div className={`relative flex items-center justify-center rounded-full font-medium text-white ${sizeClasses} ${color}`}>
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

const ConversationItem = ({ conv, onSelect, isSelected }) => (
  <div
    onClick={() => onSelect(conv)}
    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${isSelected ? 'bg-green-100' : 'hover:bg-gray-50'}`}
  >
    <Avatar fallback={conv.avatar} color={conv.color} online={conv.online} />
    <div className="flex-grow ml-4 min-w-0">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-sm text-gray-800 truncate">{conv.name}</p>
        <p className="text-xs text-gray-400 flex-shrink-0 ml-2">{conv.time}</p>
      </div>
      <div className="flex justify-between items-start mt-1">
        <p className="text-xs text-gray-500 truncate pr-4">{conv.lastMessage}</p>
        {conv.unread > 0 && (
          <span className="bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0">
            {conv.unread}
          </span>
        )}
      </div>
    </div>
  </div>
);

const ConversationList = ({ conversations, onSelect, selectedId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredConversations = conversations.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full md:w-1/3 lg:w-1/4 h-full flex flex-col bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Messagerie</h2>
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-[#009739]">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <SearchInput
          placeholder="Rechercher une conversation..."
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
            isSelected={selectedId === conv.id}
          />
        ))}
      </div>
    </div>
  );
};

const ChatView = ({ conversation, onBack, onToggleList, isListVisible }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const messages = messagesData[conversation.id] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      console.log('Sending:', newMessage);
      setNewMessage('');
    }
  };

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
        <Avatar fallback={conversation.avatar} color={conversation.color} online={conversation.online} size="large" />
        <div className="ml-4">
          <p className="font-bold text-gray-900">{conversation.name}</p>
          <p className={`text-xs ${conversation.online ? 'text-green-600' : 'text-gray-500'}`}>
            {conversation.online ? 'En ligne' : 'Hors ligne'}
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
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'other' && <div className="w-8 h-8 flex-shrink-0"></div>}
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-2xl break-words ${
                  msg.sender === 'me'
                    ? 'bg-[#009739] text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-green-100' : 'text-gray-400'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
        <div className="relative flex items-end gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-800 flex-shrink-0">
            <Paperclip className="w-5 h-5" />
          </button>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Écrivez votre message..."
            rows="1"
            className="flex-grow px-4 py-2.5 border border-gray-200 rounded-full bg-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-[#009739] transition-all"
            style={{ maxHeight: '120px' }}
          />
          <button
            onClick={handleSend}
            className="bg-[#009739] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#007a2f] transition-colors disabled:bg-gray-300 flex-shrink-0"
            disabled={!newMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const MessagesSection = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Liste des conversations - Visible sur tous les écrans sauf quand une conv est sélectionnée en mobile */}
      {!selectedConversation ? (
        <ConversationList
          conversations={conversationsData}
          onSelect={setSelectedConversation}
          selectedId={selectedConversation?.id}
        />
      ) : null}

      {/* Vue chat - Visible uniquement sur desktop ou quand une conv est sélectionnée en mobile */}
      {selectedConversation ? (
        <ChatView
          conversation={selectedConversation}
          onBack={() => setSelectedConversation(null)}
        />
      ) : (
        <div className="hidden md:flex flex-grow flex-col items-center justify-center bg-gray-50 text-center p-8">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Votre messagerie</h3>
          <p className="text-gray-500 mt-2 max-w-sm">
            Sélectionnez une conversation pour commencer à discuter, ou recherchez un contact pour démarrer un nouvel échange.
          </p>
        </div>
      )}
    </div>
  );
};

export default MessagesSection;