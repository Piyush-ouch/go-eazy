import React, { useState, useEffect } from 'react'
import { 
  Users, Calendar, Clock, Video, Send, CheckCircle2, 
  Sparkles, MessageSquare, ShieldCheck, X, Share2, Bell 
} from 'lucide-react'
import toast from 'react-hot-toast'

const MOCK_CHAT_MESSAGES = [
  { sender: 'Aarav (Student)', text: 'Can we check if there is space for a study table?' },
  { sender: 'Landlord (Host)', text: 'Yes Aarav! Every room has a 4ft dedicated wooden desk.' },
  { sender: 'Priya M.', text: 'Is food included in the monthly rent?' },
  { sender: 'Landlord (Host)', text: 'Breakfast and dinner are included in PG package!' }
]

export const VirtualOpenHouse = ({ propertyTitle }) => {
  const [isRsvped, setIsRsvped] = useState(false)
  const [attendeeCount, setAttendeeCount] = useState(48)
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState(MOCK_CHAT_MESSAGES)
  const [inputMsg, setInputMsg] = useState('')

  const handleRsvp = () => {
    if (isRsvped) {
      setIsRsvped(false)
      setAttendeeCount(prev => prev - 1)
      toast('RSVP Cancelled')
    } else {
      setIsRsvped(true)
      setAttendeeCount(prev => prev + 1)
      toast.success('RSVP Confirmed! Reminder notification added to your account.')
    }
  }

  const handleSendChat = (e) => {
    e.preventDefault()
    if (!inputMsg.trim()) return
    setChatMessages(prev => [...prev, { sender: 'You (Student)', text: inputMsg }])
    setInputMsg('')
  }

  const addToCalendar = () => {
    const title = encodeURIComponent(`Virtual Open House: ${propertyTitle || 'GoEazy Student Housing'}`)
    const details = encodeURIComponent('Join live guided virtual tour with landlord and ask questions.')
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`
    window.open(url, '_blank')
    toast.success('Calendar link generated!')
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-3xl p-6 text-white my-6 shadow-2xl relative overflow-hidden">
      
      {/* Background Graphic Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 shadow-lg text-white">
            <Users size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-xl text-white font-display">Virtual Open House Event</h3>
              <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full border border-amber-500/30 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> Scheduled Live Tour
              </span>
            </div>
            <p className="text-xs text-slate-400">Join a live Zoom-style group walkthrough with landlord & live Q&A session</p>
          </div>
        </div>

        <button
          onClick={() => setIsLiveModalOpen(true)}
          className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-xl transition-all flex items-center gap-2 cursor-pointer"
        >
          <Video size={16} /> Join Virtual Open House Stream
        </button>
      </div>

      {/* Schedule Info Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 z-10 relative">
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
          <Calendar className="text-red-400" size={20} />
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-mono">Date & Time</p>
            <p className="font-bold text-xs text-white">Sunday, 04:00 PM IST</p>
          </div>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
          <Users className="text-amber-400" size={20} />
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-mono">RSVP Status</p>
            <p className="font-bold text-xs text-white">{attendeeCount} Students Attending</p>
          </div>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-center gap-2 justify-between">
          <button
            onClick={handleRsvp}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isRsvped 
                ? 'bg-emerald-600 text-white shadow-lg' 
                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
            }`}
          >
            <CheckCircle2 size={14} />
            <span>{isRsvped ? 'RSVP Confirmed' : 'RSVP Now'}</span>
          </button>

          <button
            onClick={addToCalendar}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Add to Google Calendar"
          >
            <Calendar size={16} />
          </button>
        </div>
      </div>

      {/* Live Stream Room Modal */}
      {isLiveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl text-white">
            
            {/* Modal Header */}
            <div className="p-4 px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    Live Virtual Open House Stream
                    <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold">48 Live Viewers</span>
                  </h4>
                  <p className="text-xs text-slate-400">Host: Property Landlord • Guided Group Walkthrough</p>
                </div>
              </div>
              <button
                onClick={() => setIsLiveModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Grid Layout: Stream Feed (8 cols) + Live Q&A Chat (4 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Stream Video Feed */}
              <div className="lg:col-span-8 bg-slate-950 p-4 relative flex items-center justify-center h-[360px] border-r border-slate-800">
                <img 
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1000&q=80" 
                  alt="Live Stream" 
                  className="w-full h-full object-cover rounded-xl brightness-90"
                />
                <div className="absolute top-6 left-6 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-red-400 border border-red-500/40 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE STREAMING
                </div>
              </div>

              {/* Live Chat Box */}
              <div className="lg:col-span-4 bg-slate-900 p-4 flex flex-col justify-between h-[360px]">
                <div>
                  <h5 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <MessageSquare size={14} className="text-red-400" /> Student Q&A Live Chat
                  </h5>
                  
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-xs">
                        <p className="font-bold text-[11px] text-amber-300">{msg.sender}</p>
                        <p className="text-slate-200 text-[11px] mt-0.5">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendChat} className="flex items-center gap-2 pt-3 border-t border-slate-800">
                  <input
                    type="text"
                    placeholder="Ask landlord a question..."
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                  <button 
                    type="submit" 
                    className="bg-red-600 hover:bg-red-500 p-2.5 rounded-xl text-white font-bold transition-colors cursor-pointer"
                  >
                    <Send size={14} />
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}
