import React, { useState, useEffect } from 'react'
import { 
  Sun, Moon, Sunrise, Sunset, Clock, Play, Pause, 
  Sparkles, Shield, Volume2, Eye, Compass, Zap 
} from 'lucide-react'

const TIME_PRESETS = [
  {
    time: 8,
    label: '08:00 AM',
    title: 'Morning Sunrise',
    desc: 'Soft East-facing natural sunlight ideal for early morning studying.',
    bgUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80',
    lighting: '85% Natural',
    noise: 'Quiet (32 dB)',
    filter: 'sepia(0.15) brightness(1.05) contrast(0.95)',
    icon: Sunrise
  },
  {
    time: 13,
    label: '01:00 PM',
    title: 'Midday Peak Light',
    desc: 'Maximum daylight illumination across study desk and living space.',
    bgUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
    lighting: '100% Brightness',
    noise: 'Moderate (45 dB)',
    filter: 'brightness(1.15) contrast(1.05)',
    icon: Sun
  },
  {
    time: 18,
    label: '06:00 PM',
    title: 'Golden Hour Sunset',
    desc: 'Warm sunset glow creating a relaxed evening ambiance.',
    bgUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    lighting: '70% Warm Light',
    noise: 'Quiet (35 dB)',
    filter: 'sepia(0.35) hue-rotate(-15deg) brightness(0.95)',
    icon: Sunset
  },
  {
    time: 22,
    label: '10:00 PM',
    title: 'Night Study Ambiance',
    desc: 'Warm desk lamp and warm ambient lighting optimized for night focus.',
    bgUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80',
    lighting: 'Ambient LED',
    noise: 'Ultra Quiet (24 dB)',
    filter: 'brightness(0.7) contrast(1.2) hue-rotate(190deg)',
    icon: Moon
  }
]

export const PropertyTimeLapse = ({ propertyTitle }) => {
  const [activePresetIndex, setActivePresetIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const activePreset = TIME_PRESETS[activePresetIndex]

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setActivePresetIndex((prev) => (prev + 1) % TIME_PRESETS.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [isPlaying])

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 text-white my-6">
      
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Clock size={22} />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-white font-display flex items-center gap-2">
              24-Hour Time-Lapse & Lighting View
              <span className="text-xs bg-red-500/20 text-red-400 px-2.5 py-0.5 rounded-full border border-red-500/30 font-semibold">
                Day / Night Preview
              </span>
            </h3>
            <p className="text-xs text-slate-400">See natural sunlight during study hours and night lighting atmosphere</p>
          </div>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
            isPlaying 
              ? 'bg-amber-500 text-slate-950 shadow-amber-500/20 font-extrabold' 
              : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/20'
          }`}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          <span>{isPlaying ? 'Pause Auto Time-Lapse' : 'Play 24h Time-Lapse Video'}</span>
        </button>
      </div>

      {/* Main Visual Display */}
      <div className="relative w-full h-[340px] sm:h-[400px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group">
        <img 
          src={activePreset.bgUrl} 
          alt={activePreset.title}
          className="w-full h-full object-cover transition-all duration-700"
          style={{ filter: activePreset.filter }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Top Floating Badge */}
        <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800 text-xs font-bold text-amber-300 flex items-center gap-2 shadow-lg">
          <activePreset.icon size={16} className="text-amber-400" />
          <span>{activePreset.label} • {activePreset.title}</span>
        </div>

        {/* Bottom Info Banner */}
        <div className="absolute bottom-4 inset-x-4 bg-slate-950/85 border border-slate-800/80 backdrop-blur-md p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-2xl">
          <div>
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              {activePreset.title}
              <span className="text-[11px] text-slate-400 font-mono">({activePreset.label})</span>
            </h4>
            <p className="text-xs text-slate-300 mt-0.5 max-w-xl">{activePreset.desc}</p>
          </div>

          <div className="flex items-center gap-4 border-l border-slate-800 pl-4 text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Sunlight Level</span>
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <Zap size={12} /> {activePreset.lighting}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Noise Level</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <Volume2 size={12} /> {activePreset.noise}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {TIME_PRESETS.map((preset, index) => {
          const Icon = preset.icon
          const isActive = activePresetIndex === index
          return (
            <button
              key={preset.time}
              onClick={() => {
                setActivePresetIndex(index)
                setIsPlaying(false)
              }}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive 
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-500 shadow-lg ring-1 ring-red-400' 
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold">{preset.label}</span>
                <Icon size={16} className={isActive ? 'text-white' : 'text-amber-400'} />
              </div>
              <p className={`font-extrabold text-xs ${isActive ? 'text-white' : 'text-slate-200'}`}>
                {preset.title}
              </p>
            </button>
          )
        })}
      </div>

    </div>
  )
}
