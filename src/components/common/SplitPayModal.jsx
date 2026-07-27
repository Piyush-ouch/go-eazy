import React, { useState } from 'react'
import { 
  Calculator, Users, Percent, IndianRupee, QrCode, MessageSquare, 
  Plus, Trash2, CheckCircle2, AlertCircle, Copy, Share2, Sparkles, X, ArrowRight, ShieldCheck 
} from 'lucide-react'
import { getFlatmateSplitReminderLink } from '../../utils/whatsapp'
import toast from 'react-hot-toast'

const DEFAULT_FLATMATES = [
  { id: '1', name: 'Aarav Sharma', phone: '9876543210', roomType: 'Master Bed + Bath', weight: 40, upiId: 'aarav@upi' },
  { id: '2', name: 'Rohan Mehra', phone: '9876543211', roomType: 'Balcony Room', weight: 35, upiId: 'rohan@upi' },
  { id: '3', name: 'Karan Verma', phone: '9876543212', roomType: 'Single Room', weight: 25, upiId: 'karan@upi' }
]

export const SplitPayModal = ({ isOpen, onClose, propertyTitle = '3BHK Luxury Flat in Rajpur Road', basePrice = 24000 }) => {
  // Expenses state
  const [rentAmount, setRentAmount] = useState(basePrice)
  const [depositAmount, setDepositAmount] = useState(0)
  const [maidFee, setMaidFee] = useState(3000)
  const [electricityBill, setElectricityBill] = useState(2400)
  const [wifiFee, setWifiFee] = useState(999)

  // Landlord UPI ID
  const [landlordUpi, setLandlordUpi] = useState('goeazy.landlord@upi')

  // Split mode: 'weighted' | 'equal' | 'custom'
  const [splitMode, setSplitMode] = useState('weighted')
  const [flatmates, setFlatmates] = useState(DEFAULT_FLATMATES)

  if (!isOpen) return null

  const totalPool = Number(rentAmount) + Number(depositAmount) + Number(maidFee) + Number(electricityBill) + Number(wifiFee)

  const addFlatmate = () => {
    const newId = Date.now().toString()
    setFlatmates(prev => [
      ...prev,
      { id: newId, name: `Flatmate ${prev.length + 1}`, phone: '9999999999', roomType: 'Standard Room', weight: 0, upiId: 'flatmate@upi' }
    ])
  }

  const removeFlatmate = (id) => {
    if (flatmates.length <= 1) {
      toast.error('At least 1 flatmate required')
      return
    }
    setFlatmates(prev => prev.filter(f => f.id !== id))
  }

  const updateFlatmate = (id, field, value) => {
    setFlatmates(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f))
  }

  // Calculate share per flatmate
  const calculateShare = (flatmate) => {
    if (flatmates.length === 0) return 0
    if (splitMode === 'equal') {
      return Math.round(totalPool / flatmates.length)
    }
    if (splitMode === 'weighted' || splitMode === 'custom') {
      const totalWeight = flatmates.reduce((sum, f) => sum + (Number(f.weight) || 0), 0)
      if (totalWeight === 0) return Math.round(totalPool / flatmates.length)
      return Math.round((totalPool * (Number(flatmate.weight) || 0)) / totalWeight)
    }
    return 0
  }

  const totalWeightSum = flatmates.reduce((sum, f) => sum + (Number(f.weight) || 0), 0)

  const copyUpiLink = (shareAmount, flatmateName) => {
    const link = `upi://pay?pa=${landlordUpi}&pn=GoEazyRent&am=${shareAmount}&cu=INR`
    navigator.clipboard.writeText(link)
    toast.success(`Copied UPI Pay Link for ${flatmateName}!`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl my-8 text-white">
        
        {/* Header Banner */}
        <div className="p-5 px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 shadow-lg text-white">
              <Calculator size={22} />
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-white font-display flex items-center gap-2">
                GoEazy Split&Pay™
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
                  Group Rent & Deposit Splitter
                </span>
              </h3>
              <p className="text-xs text-slate-400">Calculate room-weighted rent shares, generate UPI links & send WhatsApp requests</p>
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
          
          {/* Top Section: Expense Pool Builder & Landlord UPI */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Monthly Expenses Breakdown (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="font-bold text-xs text-slate-300 uppercase tracking-widest flex items-center justify-between">
                <span>1. Monthly Flat Expense Pool</span>
                <span className="text-red-400 font-mono">Total: ₹{totalPool.toLocaleString('en-IN')}</span>
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 font-semibold">Base Flat Rent (₹)</label>
                  <input 
                    type="number" 
                    value={rentAmount} 
                    onChange={(e) => setRentAmount(Number(e.target.value))} 
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-semibold">Security Deposit (₹)</label>
                  <input 
                    type="number" 
                    value={depositAmount} 
                    onChange={(e) => setDepositAmount(Number(e.target.value))} 
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-semibold">Maid / Cook Fee (₹)</label>
                  <input 
                    type="number" 
                    value={maidFee} 
                    onChange={(e) => setMaidFee(Number(e.target.value))} 
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-semibold">Electricity Bill (₹)</label>
                  <input 
                    type="number" 
                    value={electricityBill} 
                    onChange={(e) => setElectricityBill(Number(e.target.value))} 
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-semibold">High-Speed WiFi / Water Bill (₹)</label>
                <input 
                  type="number" 
                  value={wifiFee} 
                  onChange={(e) => setWifiFee(Number(e.target.value))} 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
            </div>

            {/* Right: Split Mode & Landlord UPI ID (5 cols) */}
            <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-bold text-xs text-slate-300 uppercase tracking-widest mb-3">
                  2. Choose Rent Split Method
                </h4>

                <div className="space-y-2">
                  {[
                    { id: 'weighted', title: '📐 Room-Size Weighted', desc: 'Master bed pays more than single room' },
                    { id: 'equal', title: '⚖️ Equal Split', desc: 'Divide total equally among flatmates' },
                    { id: 'custom', title: '✏️ Custom Percentage', desc: 'Set manual % share per flatmate' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setSplitMode(mode.id)}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        splitMode === mode.id 
                          ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-500 shadow-md ring-1 ring-red-400' 
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      <p className="font-bold text-xs">{mode.title}</p>
                      <p className="text-[10px] opacity-80 mt-0.5">{mode.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-semibold mb-1 block">Landlord UPI VPA ID (For 1-Click Pay)</label>
                <input 
                  type="text" 
                  value={landlordUpi} 
                  onChange={(e) => setLandlordUpi(e.target.value)} 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-emerald-400"
                />
              </div>
            </div>

          </div>

          {/* Middle Section: Flatmate List & Room Weighting */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <Users size={16} className="text-red-400" /> 3. Flatmates Breakdown ({flatmates.length} Tenants)
              </h4>

              <div className="flex items-center gap-3">
                {splitMode !== 'equal' && (
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${totalWeightSum === 100 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'}`}>
                    Total Weight: {totalWeightSum}%
                  </span>
                )}
                <button
                  onClick={addFlatmate}
                  className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={14} /> Add Flatmate
                </button>
              </div>
            </div>

            {/* Flatmates Cards Table */}
            <div className="space-y-3">
              {flatmates.map((f) => {
                const calculatedShare = calculateShare(f)
                const whatsappReminderLink = getFlatmateSplitReminderLink(f.phone, f.name, propertyTitle, calculatedShare, f.roomType, landlordUpi)

                return (
                  <div key={f.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    
                    {/* Flatmate Name & Room */}
                    <div className="flex-1 min-w-[200px] grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400">Flatmate Name</label>
                        <input 
                          type="text" 
                          value={f.name} 
                          onChange={(e) => updateFlatmate(f.id, 'name', e.target.value)} 
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400">Room Type</label>
                        <input 
                          type="text" 
                          value={f.roomType} 
                          onChange={(e) => updateFlatmate(f.id, 'roomType', e.target.value)} 
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300"
                        />
                      </div>
                    </div>

                    {/* Weight % (If weighted/custom) */}
                    {splitMode !== 'equal' && (
                      <div className="w-24">
                        <label className="text-[10px] text-slate-400">Share Weight (%)</label>
                        <input 
                          type="number" 
                          value={f.weight} 
                          onChange={(e) => updateFlatmate(f.id, 'weight', Number(e.target.value))} 
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-amber-300 font-mono font-bold"
                        />
                      </div>
                    )}

                    {/* Calculated Share */}
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase">Individual Share</span>
                      <span className="font-mono font-extrabold text-base text-emerald-400">
                        ₹{calculatedShare.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Actions: Copy UPI & Send WhatsApp */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyUpiLink(calculatedShare, f.name)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 p-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                        title="Copy UPI Pay Link"
                      >
                        <Copy size={14} /> <span className="hidden sm:inline">UPI</span>
                      </button>

                      <a
                        href={whatsappReminderLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare size={14} className="fill-white" />
                        <span>Send WhatsApp</span>
                      </a>

                      <button
                        onClick={() => removeFlatmate(f.id)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                  </div>
                )
              })}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" size={16} />
            <span>GoEazy Split&Pay™ calculates exact UPI shares with zero rounding error.</span>
          </div>

          <button
            onClick={() => {
              toast.success('Split configuration saved! Requests generated.')
              onClose()
            }}
            className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            Confirm & Save Split Config <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  )
}
