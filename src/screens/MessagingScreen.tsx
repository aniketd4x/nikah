import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { 
  Send, 
  Paperclip, 
  Smile, 
  ShieldCheck, 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical, 
  Sparkles, 
  Lock, 
  Mic, 
  Check, 
  CheckCheck,
  Info,
  Users
} from 'lucide-react';

export const MessagingScreen: React.FC = () => {
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    sendMessage, 
    profiles, 
    navigateTo, 
    currentUser,
    addToast
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [showIcebreakers, setShowIcebreakers] = useState(false);
  const [isRecordingMock, setIsRecordingMock] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || conversations[0];
  const partner = activeConversation ? profiles.find((p) => p.id === activeConversation.partnerId) : null;

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeConversation && inputMessage.trim()) {
      sendMessage(activeConversation.id, inputMessage);
      setInputMessage('');
    }
  };

  const icebreakerPrompts = [
    'Assalamu Alaikum! What does a peaceful weekend look like for you and your family?',
    'Assalamu Alaikum, how do you like to approach continuous Deen learning and Quran?',
    'Assalamu Alaikum! When convenient, my family would love to connect with your Wali / parents.'
  ];

  const handleSendIcebreaker = (prompt: string) => {
    if (activeConversation) {
      sendMessage(activeConversation.id, prompt);
      setShowIcebreakers(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-20 md:pb-6">
      <div className="bg-white rounded-3xl border border-cream-300 shadow-card overflow-hidden h-[78vh] min-h-[550px] flex">
        {/* LEFT: Conversation List (hidden on mobile when chat is open) */}
        <div
          className={`w-full md:w-80 lg:w-96 border-r border-cream-300 flex flex-col bg-cream-50/50 ${
            activeConversationId ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* List Header */}
          <div className="p-4 border-b border-cream-200 bg-white">
            <h2 className="font-serif font-bold text-lg text-emerald-950">Messages & Chats</h2>
            <p className="text-[11px] text-charcoal-500">Respectful matrimonial conversations</p>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto divide-y divide-cream-200">
            {conversations.map((conv) => {
              const convPartner = profiles.find((p) => p.id === conv.partnerId);
              if (!convPartner) return null;
              const isActive = activeConversation?.id === conv.id;

              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    isActive ? 'bg-emerald-50/90 border-l-4 border-emerald-800' : 'hover:bg-cream-100'
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-cream-300">
                    <img src={convPartner.photo} alt={convPartner.name} className="w-full h-full object-cover" />
                    {convPartner.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="text-xs font-bold text-emerald-950 truncate">{convPartner.name}</h4>
                      <span className="text-[10px] text-charcoal-400 shrink-0">{conv.lastMessageTime}</span>
                    </div>
                    <p className="text-[11px] text-charcoal-500 truncate">{conv.lastMessage}</p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="bg-gold-500 text-emerald-950 text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Chat Window */}
        {partner && activeConversation ? (
          <div
            className={`flex-1 flex flex-col bg-white ${
              !activeConversationId ? 'hidden md:flex' : 'flex'
            }`}
          >
            {/* Chat Header */}
            <div className="p-3.5 sm:p-4 border-b border-cream-300 flex items-center justify-between bg-cream-50/70">
              <div className="flex items-center gap-3">
                {/* Back button for mobile */}
                <button
                  onClick={() => setActiveConversationId(null)}
                  className="md:hidden p-1.5 rounded-xl text-charcoal-600 hover:bg-cream-200"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div
                  className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-emerald-800 cursor-pointer"
                  onClick={() => navigateTo('profile-details', partner.id)}
                >
                  <img src={partner.photo} alt={partner.name} className="w-full h-full object-cover" />
                  {partner.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>

                <div onClick={() => navigateTo('profile-details', partner.id)} className="cursor-pointer">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif font-bold text-sm sm:text-base text-emerald-950">{partner.name}</h3>
                    {partner.verified.photo && <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />}
                  </div>
                  <p className="text-[10px] text-charcoal-500">
                    {partner.online ? 'Online now' : `Last active: ${partner.lastActive}`} • {partner.city}
                  </p>
                </div>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Users className="w-3.5 h-3.5" />}
                  onClick={() => addToast('Wali Introduction Mode', 'Your guardian / Wali details have been shared with this family.', 'info')}
                  className="hidden sm:inline-flex text-[11px]"
                >
                  Involve Wali
                </Button>
                <button
                  onClick={() => navigateTo('profile-details', partner.id)}
                  className="p-2 text-charcoal-500 hover:bg-cream-200 rounded-xl"
                  title="View Profile Details"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Respectful Etiquette Notice Banner */}
            <div className="bg-emerald-950 text-cream-100 py-1.5 px-4 text-[11px] text-center flex items-center justify-center gap-2 border-b border-gold-500/20">
              <Lock className="w-3 h-3 text-gold-400" />
              <span>
                Keep conversations respectful and purposeful toward Nikah. Avoid sharing personal sensitive details too early.
              </span>
            </div>

            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-cream-50/40">
              {activeConversation.messages.map((msg) => {
                if (msg.senderId === 'system') {
                  return (
                    <div key={msg.id} className="flex justify-center my-2">
                      <div className="bg-cream-200 text-charcoal-600 text-[11px] py-1.5 px-4 rounded-full max-w-md text-center border border-cream-300">
                        {msg.text}
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-soft ${
                        msg.isSelf
                          ? 'bg-emerald-900 text-white rounded-br-none'
                          : 'bg-white text-charcoal-900 border border-cream-300 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-charcoal-400">
                      <span>{msg.timestamp}</span>
                      {msg.isSelf && <CheckCheck className="w-3 h-3 text-emerald-700" />}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Icebreaker Suggestions Drawer */}
            {showIcebreakers && (
              <div className="p-3 bg-gold-50 border-t border-gold-200 animate-in slide-in-from-bottom duration-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                    Respectful Islamic Conversation Starters
                  </span>
                  <button onClick={() => setShowIcebreakers(false)} className="text-charcoal-400 text-xs">Close</button>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {icebreakerPrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendIcebreaker(p)}
                      className="text-left text-xs bg-white hover:bg-cream-100 p-2.5 rounded-xl border border-cream-300 text-charcoal-800 transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Composer Form */}
            <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-cream-300 bg-white flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowIcebreakers(!showIcebreakers)}
                className="p-2 text-gold-600 hover:bg-gold-50 rounded-xl border border-gold-200"
                title="Islamic Icebreakers"
              >
                <Sparkles className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => addToast('File Attachment', 'Attach bio-data or Wali verification documents (Demo).', 'info')}
                className="p-2 text-charcoal-400 hover:text-charcoal-700 hover:bg-cream-100 rounded-xl"
                title="Attach Document"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a respectful message..."
                className="flex-1 px-4 py-2.5 rounded-2xl bg-cream-50 border border-cream-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={!inputMessage.trim()}
                leftIcon={<Send className="w-4 h-4" />}
              >
                Send
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-cream-50">
            <h3 className="font-serif font-bold text-lg text-emerald-950">No Conversation Selected</h3>
            <p className="text-xs text-charcoal-500 mt-1">Select a connected match on the left to start conversing.</p>
          </div>
        )}
      </div>
    </div>
  );
};
