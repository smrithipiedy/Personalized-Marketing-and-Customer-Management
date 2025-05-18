import React, { useState, useRef, useEffect } from 'react';
import { usePreferences } from '../context/PreferencesContext';
import { SendHorizontal, X, ImagePlus, Mic, Paperclip, ChevronRight } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface QuickReply {
  id: string;
  text: string;
}

const ChatbotPage: React.FC = () => {
  const { selectedPreferences } = usePreferences();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Quick replies based on preferences and common questions
  const quickReplies: QuickReply[] = [
    { id: '1', text: 'What products do you recommend for me?' },
    { id: '2', text: 'Tell me about your best deals' },
    { id: '3', text: 'How does personalization work?' },
    { id: '4', text: 'Can you help me find a specific product?' },
  ];

  // Add initial welcome message when component mounts
  useEffect(() => {
    const welcomeMessage = {
      id: '0',
      sender: 'bot' as const,
      text: selectedPreferences.length > 0
        ? `Hello! I see you're interested in ${selectedPreferences.map(p => p.name).join(', ')}. How can I help you today?`
        : `Hello! I'm your personal shopping assistant. How can I help you today?`,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [selectedPreferences]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateResponse = (userMessage: string): Promise<string> => {
    // Simulate API call to generate response
    return new Promise((resolve) => {
      setTimeout(() => {
        if (userMessage.toLowerCase().includes('recommend') || userMessage.toLowerCase().includes('suggestion')) {
          if (selectedPreferences.length > 0) {
            resolve(`Based on your interest in ${selectedPreferences.map(p => p.name).join(', ')}, 
              I recommend checking out our new arrivals in those categories. 
              Would you like to see some specific product recommendations?`);
          } else {
            resolve(`I'd be happy to recommend products for you! 
              To provide the best recommendations, could you tell me a bit about your interests or preferences?`);
          }
        } else if (userMessage.toLowerCase().includes('deal') || userMessage.toLowerCase().includes('discount')) {
          resolve(`We currently have several promotions running! 
            There's 20% off on fitness equipment, a buy-one-get-one deal on tech accessories, 
            and free shipping on orders over $50. Would you like details on any specific deal?`);
        } else if (userMessage.toLowerCase().includes('how') && userMessage.toLowerCase().includes('personalization')) {
          resolve(`Our personalization system uses your preferences and shopping behavior to 
            suggest products you're most likely to enjoy. The more you interact with our platform, 
            the better our recommendations become. Your data is always kept secure and private.`);
        } else if (userMessage.toLowerCase().includes('find') || userMessage.toLowerCase().includes('looking for')) {
          resolve(`I'd be happy to help you find what you're looking for! Could you provide more details 
            about the specific product you're interested in? For example, a category, brand, or features?`);
        } else {
          resolve(`Thank you for your message! I'm here to help with product recommendations 
            and shopping assistance. Would you like to explore products based on your interests 
            or see our current popular items?`);
        }
      }, 1500);
    });
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsBotTyping(true);
    setShowSuggestions(false);

    try {
      const botResponse = await generateResponse(userMessage.text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleQuickReply = (reply: QuickReply) => {
    setInput(reply.text);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
        {/* Chat Header */}
        <div className="bg-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div className="ml-3">
              <h3 className="font-bold">Personal Shopping Assistant</h3>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></span>
                <span className="text-xs text-white/80">Online</span>
              </div>
            </div>
          </div>
          <button className="rounded-full p-1.5 hover:bg-white/20 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-purple-600 text-white rounded-br-none'
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
                <div
                  className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-purple-200' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {isBotTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg rounded-bl-none p-3 max-w-[70%]">
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-gray-400 dark:bg-gray-400 rounded-full animate-bounce"></span>
                  <span
                    className="w-2 h-2 bg-gray-400 dark:bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-gray-400 dark:bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  ></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {showSuggestions && messages.length === 1 && (
          <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply.id}
                  onClick={() => handleQuickReply(reply)}
                  className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center"
                >
                  {reply.text}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Input */}
        <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-end space-x-2">
            <div className="flex space-x-1">
              <button className="p-2 text-gray-500 hover:text-purple-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <ImagePlus className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-purple-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-purple-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <Mic className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-800 dark:text-gray-200 resize-none"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={input.trim() === ''}
              className={`p-2 rounded-full ${
                input.trim() === ''
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              } transition-colors`}
            >
              <SendHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;