import React, { useState, useRef, useEffect } from 'react'
import { 
  MessageSquare, Send, X, CheckCheck, Sparkles, Phone, 
  ExternalLink, Search, Calendar, FileText, CreditCard, ChevronRight, Bot 
} from 'lucide-react'
import { generateWhatsAppLink, OFFICIAL_WHATSAPP_BOT_NUMBER } from '../../utils/whatsapp'
import toast from 'react-hot-toast'

const INITIAL_BOT_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: "Namaste! 👋 I am **GoEazy WhatsApp Assist™**.\nHow can I help your student housing search today?",
    time: '10:15 AM',
    options: [
      '🔍 Find 3BHK under ₹15,000 in Rajpur Road',
      '📅 Schedule a Site Visit',
      '📜 Get Lease PDF on WhatsApp',
      '💳 Pay Rent / Check Due Status'
    ]
  }
]

const MOCK_PROPERTIES_RESPONSE = [
  {
    id: 'e2fa5154-1506-4b47-9dc4-142f1f582d9f',
    title: 'Premium Studio near IT Park',
    price: 15000,
    area: 'Rajpur Road, Dehradun',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
    type: '3BHK / Flat'
  },
  {
    id: 'f3eb6265-2617-5c58-0ed5-253f2f693e0g',
    title: 'Cozy Student Apartment',
    price: 13500,
    area: 'Rajpur Road, Dehradun',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    type: '3BHK / Flat'
  }
]

export const WhatsAppBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(INITIAL_BOT_MESSAGES)
  const [inputText, setInputText] = useState('')
  const [unreadCount, setUnreadCount] = useState(1)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const toggleWidget = () => {
    setIsOpen(!isOpen)
    if (!isOpen) setUnreadCount(0)
  }

  const handleOptionClick = (optionText) => {
    processUserQuery(optionText)
  }

  const handleSendSubmit = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return
    processUserQuery(inputText)
    setInputText('')
  }

  const processUserQuery = (userText) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    // Add User Message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      time: timeNow
    }

    setMessages(prev => [...prev, userMsg])

    // Simulate Bot Response delay
    setTimeout(() => {
      let botResponse = {}
      const lower = userText.toLowerCase()

      if (lower.includes('3bhk') || lower.includes('rajpur') || lower.includes('find') || lower.includes('search')) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Found 2 verified properties matching *"3BHK under ₹15,000 in Rajpur Road"*:`,
          time: timeNow,
          properties: MOCK_PROPERTIES_RESPONSE
        }
      } else if (lower.includes('visit') || lower.includes('schedule') || lower.includes('book')) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `📅 *Site Visit Confirmed!*\n\n• **Property**: Premium Studio near IT Park\n• **Date**: Tomorrow, 04:00 PM IST\n• **Landlord**: Rajesh Negi (+91 98765 43210)\n\n📍 *Google Maps Pin sent to your WhatsApp!*`,
          time: timeNow
        }
      } else if (lower.includes('lease') || lower.includes('pdf') || lower.includes('doc')) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `📄 *Official Lease Agreement PDF Generated*\n\nRef ID: #GE-2026-8842\nStatus: Verified & Stamped\n\nClick below to open PDF directly in WhatsApp:`,
          time: timeNow,
          hasPdfLink: true
        }
      } else if (lower.includes('rent') || lower.includes('pay') || lower.includes('due')) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `💳 *Rent Due Alert*\n\n• **Amount**: ₹15,000\n• **Due Date**: 1st Aug 2026\n• **Razorpay Status**: Pending\n\nClick below to launch 1-click Razorpay payment on WhatsApp:`,
          time: timeNow,
          hasPayLink: true
        }
      } else {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `I've forwarded your request: "${userText}" to our WhatsApp support team. You can also chat directly on WhatsApp Web!`,
          time: timeNow
        }
      }

      setMessages(prev => [...prev, botResponse])
    }, 600)
  }

  const openRealWhatsApp = (msg = '') => {
    const link = generateWhatsAppLink(OFFICIAL_WHATSAPP_BOT_NUMBER, msg || 'Hi GoEazy WhatsApp Assist! I want to search for student housing.')
    window.open(link, '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating WhatsApp Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleWidget}
          className="relative group flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 px-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-2 border-white/20"
        >
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white animate-bounce">
              {unreadCount}
            </span>
          )}
          <MessageSquare size={24} className="fill-white" />
          <span className="font-extrabold text-xs tracking-wide hidden sm:inline font-display">
            WhatsApp Assist
          </span>
        </button>
      )}

      {/* Expandable WhatsApp Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-[#efeae2] dark:bg-[#0b141a] rounded-3xl overflow-hidden shadow-2xl border border-slate-700/40 flex flex-col justify-between transition-all duration-300 animate-in fade-in slide-in-from-bottom-6">
          
          {/* Header */}
          <div className="bg-[#075E54] dark:bg-[#202c33] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold shadow-md">
                  <Bot size={20} />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#075E54]" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5 font-display">
                  GoEazy WhatsApp Assist™
                  <Sparkles size={14} className="text-amber-300" />
                </h4>
                <p className="text-[11px] text-emerald-200/90 font-mono">Online • Official AI Bot</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => openRealWhatsApp()} 
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer" 
                title="Open in WhatsApp Web / App"
              >
                <ExternalLink size={16} />
              </button>
              <button 
                onClick={toggleWidget} 
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-hide">
            
            {/* Encryption Encrypted Notice */}
            <div className="bg-amber-100/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-[10px] text-amber-900 dark:text-amber-300 p-2 rounded-xl text-center font-medium shadow-sm">
              🔒 End-to-end encrypted WhatsApp integration. Powered by GoEazy API.
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm relative ${
                    msg.sender === 'user'
                      ? 'bg-[#d9fdd3] dark:bg-[#005c4b] text-slate-900 dark:text-white rounded-tr-none'
                      : 'bg-white dark:bg-[#202c33] text-slate-900 dark:text-white rounded-tl-none border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Render Property Cards if available */}
                  {msg.properties && (
                    <div className="mt-3 space-y-2">
                      {msg.properties.map((p) => (
                        <div key={p.id} className="bg-slate-50 dark:bg-[#111b21] p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
                          <img src={p.image} alt={p.title} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[11px] truncate text-slate-900 dark:text-white">{p.title}</p>
                            <p className="text-[10px] text-slate-500 font-mono">₹{p.price.toLocaleString('en-IN')}/mo • {p.area}</p>
                          </div>
                          <button 
                            onClick={() => openRealWhatsApp(`Tell me more about property: ${p.title}`)} 
                            className="bg-[#25D366] text-white p-1.5 rounded-lg text-[10px] font-bold hover:bg-[#20bd5a] transition-colors cursor-pointer whitespace-nowrap"
                          >
                            WhatsApp
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* PDF Link Button */}
                  {msg.hasPdfLink && (
                    <button 
                      onClick={() => toast.success('Lease PDF sent to your WhatsApp!')} 
                      className="mt-2.5 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-1.5 rounded-lg text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FileText size={14} /> Download Lease PDF on WhatsApp
                    </button>
                  )}

                  {/* Razorpay Link Button */}
                  {msg.hasPayLink && (
                    <button 
                      onClick={() => toast.success('Redirecting to 1-Click WhatsApp Razorpay Checkout!')} 
                      className="mt-2.5 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 rounded-lg text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <CreditCard size={14} /> 1-Click Rent Pay via WhatsApp
                    </button>
                  )}

                  {/* Time & Double Check */}
                  <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400 font-mono">
                    <span>{msg.time}</span>
                    {msg.sender === 'user' && <CheckCheck size={12} className="text-emerald-500" />}
                  </div>
                </div>

                {/* Option Shortcuts */}
                {msg.options && (
                  <div className="mt-2 space-y-1.5 w-full">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(opt)}
                        className="w-full text-left bg-white/90 dark:bg-[#202c33] hover:bg-[#25D366] hover:text-white dark:hover:bg-[#25D366] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 p-2 px-3 rounded-xl text-[11px] font-bold transition-all shadow-sm flex items-center justify-between cursor-pointer group"
                      >
                        <span>{opt}</span>
                        <ChevronRight size={12} className="opacity-40 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                )}

              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Footer Input Bar */}
          <form onSubmit={handleSendSubmit} className="bg-white dark:bg-[#202c33] p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask WhatsApp Bot..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-100 dark:bg-[#111b21] text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-[#25D366]"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center transition-colors cursor-pointer shadow-md flex-shrink-0"
            >
              <Send size={16} />
            </button>
          </form>

        </div>
      )}

    </div>
  )
}
