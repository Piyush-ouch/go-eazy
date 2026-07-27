import React, { useState } from 'react'
import { 
  Gift, Award, Trophy, Users, Copy, CheckCircle2, Share2, 
  MessageSquare, Sparkles, X, ChevronRight, Zap, ExternalLink, ArrowRight, ShieldCheck 
} from 'lucide-react'
import { generateWhatsAppLink } from '../../utils/whatsapp'
import toast from 'react-hot-toast'

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Aarav Sharma', college: 'IIT Roorkee', referrals: 14, earned: 14000, badge: '🥇 Gold Ambassador' },
  { rank: 2, name: 'Ananya Verma', college: 'HNBGU Medical', referrals: 11, earned: 11000, badge: '🥈 Silver Ambassador' },
  { rank: 3, name: 'Rohan Mehra', college: 'Graphic Era University', referrals: 8, earned: 8000, badge: '🥈 Silver Ambassador' },
  { rank: 4, name: 'Priya Rawat', college: 'UPES Dehradun', referrals: 6, earned: 6000, badge: '🥉 Bronze Ambassador' },
  { rank: 5, name: 'Kabir Singh', college: 'DIT University', referrals: 5, earned: 5000, badge: '🥉 Bronze Ambassador' }
]

export const ReferralHubModal = ({ isOpen, onClose, userName = 'Student' }) => {
  const [activeTab, setActiveTab] = useState('tenant') // 'tenant' or 'landlord'
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const tenantRefCode = `GO-${userName.toUpperCase().slice(0, 4)}-500`
  const landlordRefCode = `LANDLORD-${userName.toUpperCase().slice(0, 4)}-1000`

  const currentRefCode = activeTab === 'tenant' ? tenantRefCode : landlordRefCode
  const currentRewardAmount = activeTab === 'tenant' ? '₹500' : '₹1,000'
  const refLink = `https://goeazy.in/signup?ref=${currentRefCode}`

  const copyRefLink = () => {
    navigator.clipboard.writeText(refLink)
    setCopied(true)
    toast.success('Referral link copied to clipboard!')
    setTimeout(() => setCopied(false), 3000)
  }

  const shareWhatsApp = () => {
    const msg = activeTab === 'tenant'
      ? `Hey! Searching for a verified PG or student flat near campus? Join GoEazy using my referral link and we BOTH get ₹500 instant rent credit! 🎁\n\nLink: ${refLink}`
      : `Hi! Are you a property owner looking for verified student tenants in Dehradun/Uttarakhand? List on GoEazy using my code "${landlordRefCode}" and get ₹1,000 bonus credits!\n\nLink: ${refLink}`
    
    window.open(generateWhatsAppLink('', msg), '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl my-8 text-white">
        
        {/* Header Banner */}
        <div className="p-5 px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg text-slate-950 font-extrabold">
              <Gift size={24} />
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-white font-display flex items-center gap-2">
                GoEazy Refer&Earn™ Marketplace
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-semibold">
                  Earn up to ₹2,000/Referral
                </span>
              </h3>
              <p className="text-xs text-slate-400">Invite student friends or property owners and earn instant GoEazy Rent Credits</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto scrollbar-hide">
          
          {/* Dual Tab Switcher: Tenant (₹500) vs Landlord (₹1,000) */}
          <div className="grid grid-cols-2 gap-3 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('tenant')}
              className={`py-3 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'tenant' 
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users size={16} />
              <span>Refer Student Friend (Both Get ₹500)</span>
            </button>

            <button
              onClick={() => setActiveTab('landlord')}
              className={`py-3 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'landlord' 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles size={16} />
              <span>Refer Property Owner (Earn ₹1,000)</span>
            </button>
          </div>

          {/* Referral Link & Share Box */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  Your Unique Referral Code & Share Link
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono font-bold">
                    Active Rewards
                  </span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activeTab === 'tenant' 
                    ? 'Give ₹500 to your friend, get ₹500 in your GoEazy Wallet upon signup' 
                    : 'Earn ₹1,000 for every landlord friend who lists a verified property'}
                </p>
              </div>

              <div className="bg-slate-900 px-4 py-2 rounded-xl border border-amber-500/30 text-amber-300 font-mono font-extrabold text-sm">
                Code: {currentRefCode}
              </div>
            </div>

            {/* Input Link Bar */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={refLink}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 font-mono focus:outline-none"
              />
              <button
                onClick={copyRefLink}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700"
              >
                {copied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>

              <button
                onClick={shareWhatsApp}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare size={16} className="fill-white" />
                <span>WhatsApp Share</span>
              </button>
            </div>
          </div>

          {/* Referral Tier Progression */}
          <div>
            <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Trophy size={14} className="text-amber-400" /> Ambassador Bonus Tiers
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { tier: '🥉 Bronze Tier', req: '1 - 3 Referrals', perk: '₹500 per referral + Bronze Badge', active: true },
                { tier: '🥈 Silver Tier', req: '4 - 7 Referrals', perk: '₹1,000 per referral + ₹500 Rent Bonus', active: false },
                { tier: '🥇 Gold Super Referrer', req: '8+ Referrals', perk: '₹2,000 per referral + VIP Support', active: false }
              ].map((t, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-2xl border transition-all ${
                    t.active 
                      ? 'bg-gradient-to-br from-slate-950 to-slate-900 border-amber-500/60 ring-1 ring-amber-500/30' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <p className="font-bold text-xs text-white mb-1">{t.tier}</p>
                  <p className="text-[10px] text-amber-400 font-mono mb-2">{t.req}</p>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{t.perk}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Referrer Ambassador Leaderboard */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <Award size={16} className="text-amber-400" /> Monthly Top Student Ambassadors
              </h4>
              <span className="text-[10px] text-slate-400 font-mono">Updated Daily</span>
            </div>

            <div className="space-y-2">
              {MOCK_LEADERBOARD.map((user) => (
                <div key={user.rank} className="bg-slate-900 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-300 font-bold flex items-center justify-center text-[11px] font-mono">
                      #{user.rank}
                    </span>
                    <div>
                      <p className="font-bold text-white flex items-center gap-1.5">
                        {user.name}
                        <span className="text-[10px] text-amber-300 font-semibold">{user.badge}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">{user.college}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-extrabold text-emerald-400 font-mono block">₹{user.earned.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-slate-400">{user.referrals} referrals</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-emerald-400" /> Referrals auto-credited instantly upon friend signup.
          </p>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Close Referral Hub
          </button>
        </div>

      </div>
    </div>
  )
}
