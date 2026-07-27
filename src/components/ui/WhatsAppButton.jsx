import React from 'react'
import { MessageSquare, ExternalLink } from 'lucide-react'
import { getLandlordChatLink, generateWhatsAppLink } from '../../utils/whatsapp'

export const WhatsAppButton = ({ 
  phone, 
  propertyTitle, 
  price, 
  city, 
  area, 
  label = 'Chat on WhatsApp', 
  customMessage,
  variant = 'solid', // 'solid', 'outline', 'icon'
  className = '' 
}) => {
  const link = customMessage 
    ? generateWhatsAppLink(phone, customMessage) 
    : getLandlordChatLink(phone, propertyTitle, price, city, area)

  if (variant === 'icon') {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        className={`w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer ${className}`}
      >
        <MessageSquare size={18} className="fill-white" />
      </a>
    )
  }

  if (variant === 'outline') {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`px-4 py-2.5 rounded-xl border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${className}`}
      >
        <MessageSquare size={16} />
        <span>{label}</span>
        <ExternalLink size={12} className="opacity-70" />
      </a>
    )
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm transition-all shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2.5 active:scale-[0.98] cursor-pointer ${className}`}
    >
      <MessageSquare size={18} className="fill-white" />
      <span>{label}</span>
      <ExternalLink size={14} className="opacity-80 ml-0.5" />
    </a>
  )
}
