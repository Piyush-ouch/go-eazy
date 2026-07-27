import React, { useState } from 'react'
import { 
  TrendingUp, MapPin, Building, ShieldCheck, Zap, Users, 
  DollarSign, Briefcase, AlertTriangle, Sparkles, CheckCircle2, 
  Search, ArrowRight, BarChart2, Compass, Clock, Award, Sliders, ChevronRight 
} from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const LOCALITIES_DATA = [
  {
    id: 'rajpur',
    name: 'Rajpur Road',
    city: 'Dehradun',
    avgPg: 9500,
    avg1Bhk: 14500,
    avg2Bhk: 22000,
    occupancy: 94,
    safetyScore: 9.2,
    commuteTime: '12 mins to Clock Tower',
    vibe: 'Premium & Central',
    density: 'High (420+ Listings)',
    trend: '+8.4% this semester',
    popularUniversities: ['DIT University', 'HNBGU Campus', 'Graphic Era']
  },
  {
    id: 'premnagar',
    name: 'Prem Nagar',
    city: 'Dehradun',
    avgPg: 8200,
    avg1Bhk: 12000,
    avg2Bhk: 18500,
    occupancy: 88,
    safetyScore: 8.8,
    commuteTime: '8 mins to UPES / Bidholi',
    vibe: 'Student Hub',
    density: 'Very High (580+ Listings)',
    trend: '+6.2% this semester',
    popularUniversities: ['UPES Bidholi', 'BFIT Institution']
  },
  {
    id: 'itpark',
    name: 'IT Park / Sahastradhara',
    city: 'Dehradun',
    avgPg: 10500,
    avg1Bhk: 16000,
    avg2Bhk: 25000,
    occupancy: 82,
    safetyScore: 9.5,
    commuteTime: '5 mins to IT Tech Parks',
    vibe: 'Corporate Tech Corridor',
    density: 'Moderate (290+ Listings)',
    trend: '+9.1% this semester',
    popularUniversities: ['IMS Unison', 'Doon University']
  },
  {
    id: 'subhashnagar',
    name: 'Subhash Nagar',
    city: 'Dehradun',
    avgPg: 7800,
    avg1Bhk: 11000,
    avg2Bhk: 16500,
    occupancy: 91,
    safetyScore: 8.6,
    commuteTime: '6 mins to GEU Campus',
    vibe: 'Budget Friendly & Food Density',
    density: 'High (340+ Listings)',
    trend: '+4.5% this semester',
    popularUniversities: ['Graphic Era University (GEU)', 'GEHU']
  },
  {
    id: 'tapovan',
    name: 'Tapovan',
    city: 'Rishikesh',
    avgPg: 12000,
    avg1Bhk: 18000,
    avg2Bhk: 28000,
    occupancy: 75,
    safetyScore: 9.4,
    commuteTime: '10 mins to Laxman Jhula',
    vibe: 'Scenic & Quiet Study',
    density: 'Moderate (180+ Listings)',
    trend: '+11.2% this semester',
    popularUniversities: ['AIIMS Rishikesh', 'HNBGU Rishikesh']
  }
]

const CORPORATE_HIRING_HUBS = [
  { company: 'Infosys Ltd', location: 'IT Park, Dehradun', roles: 'Software Intern, Associate Engineer', avgStipend: '₹25,000/mo' },
  { company: 'TCS Innovation Hub', location: 'Sahastradhara Road', roles: 'System Engineer, Data Analyst', avgStipend: '₹22,000/mo' },
  { company: 'Wipro Technologies', location: 'IT Park Campus', roles: 'Fullstack Intern, Support Engineer', avgStipend: '₹20,000/mo' },
  { company: 'Genpact India', location: 'Rajpur Road Tech Park', roles: 'Process Developer, Analyst', avgStipend: '₹18,000/mo' }
]

export const MarketIntelPage = () => {
  const [semester, setSemester] = useState('monsoon') // 'monsoon' or 'spring'
  const [monthlyBudget, setMonthlyBudget] = useState(12000)
  const [selectedLocality, setSelectedLocality] = useState(LOCALITIES_DATA[0])

  // Affordability calculation
  const maxRentShare = Math.round(monthlyBudget * 0.55)
  const estimatedFood = Math.round(monthlyBudget * 0.25)
  const remainingAllowance = monthlyBudget - maxRentShare - estimatedFood

  return (
    <div className="pt-6 pb-20 bg-slate-950 text-white min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-6 z-10 relative">
            <div className="space-y-2 max-w-2xl">
              <span className="bg-amber-500/20 text-amber-300 text-xs px-3.5 py-1 rounded-full font-bold border border-amber-500/30 uppercase tracking-wider inline-flex items-center gap-1.5">
                <BarChart2 size={14} /> GoEazy MarketIntel™ 2026
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
                Student Housing Market Intelligence Dashboard
              </h1>
              <p className="text-sm text-slate-300">
                Data-driven insights on student rent trends, peak admission rush alerts, neighborhood safety, and corporate job market proximity.
              </p>
            </div>

            {/* Semester Switcher */}
            <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-2">
              <button
                onClick={() => setSemester('monsoon')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  semester === 'monsoon' 
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monsoon Rush (Jul - Dec)
              </button>
              <button
                onClick={() => setSemester('spring')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  semester === 'spring' 
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Spring Semester (Jan - Jun)
              </button>
            </div>
          </div>
        </div>

        {/* Peak Booking Rush Alert Banner */}
        <div className="bg-gradient-to-r from-amber-950/80 via-red-950/80 to-slate-900 border border-amber-500/40 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-amber-300 font-display flex items-center gap-2">
                PEAK ADMISSION RUSH ALERT: July Semester Intake
                <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">78% Rooms Booked</span>
              </h3>
              <p className="text-xs text-slate-300">
                Student housing demand in Rajpur Road & Prem Nagar is up <strong className="text-white">+14.2% YoY</strong>. Lock your rent before July 15th.
              </p>
            </div>
          </div>

          <Link 
            to="/search" 
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            Lock Rent Price Now <ArrowRight size={14} />
          </Link>
        </div>

        {/* Heatmaps by Semester & Locality Density Cards */}
        <div>
          <h2 className="text-xl font-extrabold text-white font-display mb-4 flex items-center gap-2">
            <MapPin className="text-red-500" size={22} /> Locality Rent Heatmap & Density Breakdown
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {LOCALITIES_DATA.map((loc) => (
              <div
                key={loc.id}
                onClick={() => setSelectedLocality(loc)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  selectedLocality.id === loc.id
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-red-500 shadow-xl ring-1 ring-red-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white">{loc.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">{loc.occupancy}% Booked</span>
                  </div>
                  <p className="text-[10px] text-slate-400">{loc.vibe}</p>
                </div>

                <div className="space-y-1 text-xs font-mono">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Avg PG:</span>
                    <span className="font-bold text-white">₹{loc.avgPg.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Avg 1BHK:</span>
                    <span className="font-bold text-amber-400">₹{loc.avg1Bhk.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Safety: {loc.safetyScore}/10</span>
                  <span className="text-red-400 font-bold">{loc.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Neighborhood Side-by-Side Comparison Matrix */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-extrabold text-xl text-white font-display flex items-center gap-2">
                <Sliders size={20} className="text-red-500" /> 5-Neighborhood Side-by-Side Comparison Matrix
              </h3>
              <p className="text-xs text-slate-400">Compare price, commute, safety score, and wifi reliability across top student areas</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono">
                  <th className="p-3">Neighborhood</th>
                  <th className="p-3">Avg PG Rent</th>
                  <th className="p-3">Avg 1BHK Rent</th>
                  <th className="p-3">Campus Commute</th>
                  <th className="p-3">Safety Rating</th>
                  <th className="p-3">WiFi & Power Uptime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {LOCALITIES_DATA.map((loc) => (
                  <tr key={loc.id} className="hover:bg-slate-850 transition-colors">
                    <td className="p-3 font-bold text-white flex items-center gap-2 font-sans">
                      <MapPin size={14} className="text-red-400" /> {loc.name}
                    </td>
                    <td className="p-3 text-emerald-400 font-bold">₹{loc.avgPg.toLocaleString('en-IN')}/mo</td>
                    <td className="p-3 text-amber-300 font-bold">₹{loc.avg1Bhk.toLocaleString('en-IN')}/mo</td>
                    <td className="p-3 text-slate-300">{loc.commuteTime}</td>
                    <td className="p-3 font-bold text-white">{loc.safetyScore} / 10 ⭐</td>
                    <td className="p-3 text-emerald-400 font-bold">99.4% Inverter Backup</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rent Affordability Predictor & Corporate Job Insights (2 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Rent Affordability Predictor (6 cols) */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-white font-display flex items-center gap-2">
                <DollarSign size={20} className="text-emerald-400" /> Rent Affordability Calculator
              </h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                Student Budget Predictor
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Input your total monthly allowance/budget to calculate maximum affordable rent share and room recommendations.
            </p>

            <div>
              <label className="text-xs font-bold text-slate-300 mb-1 flex items-center justify-between">
                <span>Monthly Student Budget:</span>
                <span className="font-mono text-emerald-400 text-sm font-extrabold">₹{monthlyBudget.toLocaleString('en-IN')}</span>
              </label>
              <input 
                type="range" 
                min="6000" 
                max="35000" 
                step="500" 
                value={monthlyBudget} 
                onChange={(e) => setMonthlyBudget(Number(e.target.value))} 
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Max Rent Share</span>
                <span className="font-mono font-extrabold text-sm text-emerald-400">₹{maxRentShare.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Est. Tiffin/Food</span>
                <span className="font-mono font-extrabold text-sm text-amber-300">₹{estimatedFood.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Pocket Allowance</span>
                <span className="font-mono font-extrabold text-sm text-white">₹{remainingAllowance.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
              <span>
                <strong>Recommended Option:</strong> Double sharing PG in Subhash Nagar or 3BHK Flat share in Rajpur Road.
              </span>
            </div>
          </div>

          {/* Corporate & Job Market Proximity (6 cols) */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-white font-display flex items-center gap-2">
                <Briefcase size={20} className="text-amber-400" /> Corporate Job & Internship Proximity
              </h3>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-bold">
                Tech Employers Nearby
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Top corporate tech hubs and hiring companies located near student accommodation zones.
            </p>

            <div className="space-y-2.5">
              {CORPORATE_HIRING_HUBS.map((hub, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">{hub.company}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{hub.location} • {hub.roles}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-amber-300 block">{hub.avgStipend}</span>
                    <span className="text-[9px] text-emerald-400">Hiring Interns</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
