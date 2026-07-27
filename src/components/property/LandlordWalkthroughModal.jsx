import React, { useState } from 'react'
import { 
  Video, Calendar, Clock, CheckCircle2, Phone, X, 
  MessageSquare, Mic, MicOff, VideoOff, Share2, PhoneOff, Sparkles, UserCheck 
} from 'lucide-react'
import toast from 'react-hot-toast'

const CHECKLIST_ITEMS = [
  'Inspect washroom water pressure & geyser',
  'Test WiFi speed live with landlord',
  'Check desk size & study power outlets',
  'Verify ventilation & natural window light',
  'Ask about guest rules & curfew timings'
]

export const LandlordWalkthroughModal = ({ isOpen, onClose, propertyTitle, landlordName }) => {
  const [step, setStep] = useState('schedule') // 'schedule' or 'call'
  const [selectedDate, setSelectedDate] = useState('2026-07-28')
  const [selectedSlot, setSelectedSlot] = useState('04:00 PM - 04:30 PM')
  const [selectedTopics, setSelectedTopics] = useState(CHECKLIST_ITEMS.slice(0, 3))
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  if (!isOpen) return null

  const toggleTopic = (topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    )
  }

  const handleStartInstantCall = () => {
    setStep('call')
    toast.success(`Connected live video walkthrough with ${landlordName || 'Landlord'}!`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl my-8 text-white">
        
        {/* Header */}
        <div className="p-5 px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 shadow-lg text-white">
              <Video size={22} />
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-white font-display flex items-center gap-2">
                Landlord 1-on-1 Virtual Walkthrough
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
                  Live Video Call
                </span>
              </h3>
              <p className="text-xs text-slate-400">Ask the landlord to show specific spots, run WiFi tests & inspect room</p>
            </div>
          </div>
          <button
            onClick={() => { setStep('schedule'); onClose() }}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {step === 'schedule' ? (
          <div className="p-6 space-y-6">
            
            {/* Landlord Card Info */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-red-600 text-white font-bold flex items-center justify-center text-lg shadow-lg">
                  {landlordName ? landlordName.charAt(0) : 'L'}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                    {landlordName || 'Landlord / Property Owner'}
                    <UserCheck size={14} className="text-emerald-400" />
                  </h4>
                  <p className="text-xs text-slate-400">Available for 1-on-1 video call tours</p>
                </div>
              </div>

              <button
                onClick={handleStartInstantCall}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Phone size={14} /> Start Call Now
              </button>
            </div>

            {/* Checklist items to ask Landlord */}
            <div>
              <h4 className="font-bold text-xs text-slate-300 uppercase tracking-widest mb-3">
                Select Checklist Topics for Video Tour:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CHECKLIST_ITEMS.map((item) => {
                  const isChecked = selectedTopics.includes(item)
                  return (
                    <div
                      key={item}
                      onClick={() => toggleTopic(item)}
                      className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center gap-2.5 ${
                        isChecked 
                          ? 'bg-slate-800 text-white border-red-500/80 shadow-md' 
                          : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-red-600 border-red-500 text-white' : 'border-slate-700'}`}>
                        {isChecked && <CheckCircle2 size={12} />}
                      </div>
                      <span>{item}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Schedule Slot Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-400 mb-1.5 block">Select Date</label>
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 mb-1.5 block">Select Time Slot</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
                >
                  <option>04:00 PM - 04:30 PM</option>
                  <option>05:30 PM - 06:00 PM</option>
                  <option>07:00 PM - 07:30 PM</option>
                </select>
              </div>
            </div>

            {/* Schedule Submit */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  toast.success(`Walkthrough requested for ${selectedDate} at ${selectedSlot}!`)
                  onClose()
                }}
                className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-3 rounded-2xl transition-all shadow-xl cursor-pointer"
              >
                Schedule Virtual Tour Request
              </button>
            </div>

          </div>
        ) : (
          /* Live Video Call Room Simulation */
          <div className="p-6 space-y-4 bg-slate-950">
            <div className="relative w-full h-[360px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center shadow-2xl">
              {/* Landlord Feed */}
              <img 
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1000&q=80" 
                alt="Landlord Video Feed" 
                className="w-full h-full object-cover brightness-90"
              />

              {/* Top Banner */}
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/40 text-xs text-emerald-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Walkthrough with {landlordName || 'Landlord'}
              </div>

              {/* Tenant Self Video PIP */}
              <div className="absolute bottom-4 right-4 w-32 h-24 bg-slate-950 rounded-xl overflow-hidden border-2 border-slate-700 shadow-2xl">
                {!isVideoOff ? (
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80" alt="Self" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-xs">Camera Off</div>
                )}
              </div>
            </div>

            {/* Video Control Bar */}
            <div className="flex items-center justify-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <button 
                onClick={() => setIsMuted(!isMuted)} 
                className={`p-3 rounded-2xl border text-white transition-colors cursor-pointer ${isMuted ? 'bg-red-600 border-red-500' : 'bg-slate-800 border-slate-700'}`}
              >
                {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              <button 
                onClick={() => setIsVideoOff(!isVideoOff)} 
                className={`p-3 rounded-2xl border text-white transition-colors cursor-pointer ${isVideoOff ? 'bg-red-600 border-red-500' : 'bg-slate-800 border-slate-700'}`}
              >
                {isVideoOff ? <VideoOff size={18} /> : <Video size={18} />}
              </button>

              <button 
                onClick={() => {
                  setStep('schedule')
                  onClose()
                  toast.error('Video Call Ended')
                }} 
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl font-bold text-xs text-white shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <PhoneOff size={18} /> End Tour Call
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
