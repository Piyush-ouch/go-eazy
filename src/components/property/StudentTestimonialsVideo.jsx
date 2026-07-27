import React, { useState } from 'react'
import { 
  Play, Star, ThumbsUp, CheckCircle2, UserCheck, 
  MessageSquare, Volume2, X, Sparkles, Award 
} from 'lucide-react'
import toast from 'react-hot-toast'

const STUDENT_TESTIMONIALS = [
  {
    id: '1',
    name: 'Aarav Sharma',
    college: 'IIT Roorkee / CSE 3rd Yr',
    stayDuration: 'Living here 1.5 Years',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    quote: "The 200Mbps WiFi is rock solid for coding & lectures. Landlord is super helpful when anything breaks!",
    rating: 5,
    likes: 42,
    verified: true,
    transcript: [
      "Hey guys! I've been staying in this PG for over 18 months now.",
      "The best part is definitely the uninterrupted high-speed internet and the silent study environment.",
      "Food quality is home-style, and we never had any water or electricity issues during exam weeks."
    ]
  },
  {
    id: '2',
    name: 'Ananya Verma',
    college: 'HNBGU Medical / MBBS',
    stayDuration: 'Living here 2 Years',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
    thumbnail: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    quote: "Extremely safe for female students. 24/7 CCTV and bio-metric entry give total peace of mind.",
    rating: 5,
    likes: 38,
    verified: true,
    transcript: [
      "Hi everyone, safety was my number one priority when looking for a room in Dehradun.",
      "The landlord living nearby ensures strict security and night curfews are well managed.",
      "Walking distance to medical college saves me 45 mins every single day!"
    ]
  },
  {
    id: '3',
    name: 'Rohan Mehra',
    college: 'Graphic Era University / MBA',
    stayDuration: 'Living here 8 Months',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    quote: "Great student vibe in the building! Super easy to find study partners and share cab rides.",
    rating: 5,
    likes: 29,
    verified: true,
    transcript: [
      "The community here is amazing. All fellow tenants are students or young professionals.",
      "Clean washrooms, daily maid cleaning, and zero hassle with landlord deposit returns."
    ]
  }
]

export const StudentTestimonialsVideo = ({ propertyTitle }) => {
  const [activeVideo, setActiveVideo] = useState(null)
  const [upvotes, setUpvotes] = useState({ '1': 42, '2': 38, '3': 29 })
  const [upvotedState, setUpvotedState] = useState({})

  const handleUpvote = (id, e) => {
    e?.stopPropagation()
    if (upvotedState[id]) {
      setUpvotes(prev => ({ ...prev, [id]: prev[id] - 1 }))
      setUpvotedState(prev => ({ ...prev, [id]: false }))
    } else {
      setUpvotes(prev => ({ ...prev, [id]: prev[id] + 1 }))
      setUpvotedState(prev => ({ ...prev, [id]: true }))
      toast.success('Marked as helpful!')
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white my-6 shadow-2xl">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 shadow-lg text-white">
            <UserCheck size={22} />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-white font-display flex items-center gap-2">
              Student Neighbor Video Reviews
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
                100% Verified Tenants
              </span>
            </h3>
            <p className="text-xs text-slate-400">Hear real students living in this property talk about internet, food, and security</p>
          </div>
        </div>
      </div>

      {/* Video Testimonials Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {STUDENT_TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            onClick={() => setActiveVideo(t)}
            className="bg-slate-950/80 border border-slate-800 hover:border-red-500/60 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg group cursor-pointer flex flex-col justify-between"
          >
            {/* Video Thumbnail Box */}
            <div className="relative w-full h-44 bg-slate-900 overflow-hidden">
              <img 
                src={t.thumbnail} 
                alt={t.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90" 
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-125 transition-transform">
                  <Play size={20} className="ml-0.5 fill-white" />
                </div>
              </div>

              {/* Verified Badge Overlay */}
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/40 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={12} /> Verified Tenant
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <img src={t.avatar} alt={t.name} className="w-7 h-7 rounded-full bg-slate-800" />
                  <div>
                    <p className="font-bold text-xs text-white leading-tight">{t.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{t.college}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic line-clamp-2 mt-2 leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              {/* Footer Rating & Upvote */}
              <div className="flex items-center justify-between border-t border-slate-800/80 pt-2.5 text-xs text-slate-400">
                <span className="text-[10px] text-slate-400 font-bold">{t.stayDuration}</span>
                <button
                  onClick={(e) => handleUpvote(t.id, e)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                    upvotedState[t.id] 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <ThumbsUp size={12} className={upvotedState[t.id] ? 'fill-red-400' : ''} />
                  <span>{upvotes[t.id]}</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl text-white">
            
            {/* Modal Header */}
            <div className="p-4 px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={activeVideo.avatar} alt={activeVideo.name} className="w-10 h-10 rounded-full bg-slate-800" />
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    {activeVideo.name}
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">Verified Student</span>
                  </h4>
                  <p className="text-xs text-slate-400">{activeVideo.college} • {activeVideo.stayDuration}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Simulated Video Stream */}
            <div className="relative w-full h-[320px] bg-slate-950 flex items-center justify-center overflow-hidden">
              <video 
                src={activeVideo.videoUrl} 
                controls 
                autoPlay 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Video Transcript Highlights */}
            <div className="p-6 bg-slate-900 space-y-3">
              <h5 className="font-bold text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <MessageSquare size={14} className="text-red-400" /> Key Video Highlights & Transcript:
              </h5>
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {activeVideo.transcript.map((line, idx) => (
                  <p key={idx} className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed">
                    • {line}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
