import React, { useState, useRef, useEffect } from 'react'
import { 
  Eye, Maximize2, RotateCcw, Compass, MapPin, Sparkles, 
  Layers, Move, Info, CheckCircle2, ChevronRight, Ruler, Play, Pause, Volume2, ShieldCheck 
} from 'lucide-react'

const ROOM_DATA = [
  {
    id: 'bedroom',
    name: 'Master Bedroom',
    panoramaUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=80',
    hotspots: [
      { id: 'desk', label: 'Ergonomic Study Desk & High-speed WiFi', x: 32, y: 55, icon: '💻', details: 'Dedicated quiet study workstation with power outlets and 200Mbps fibre connection.' },
      { id: 'bed', label: 'Orthopedic Queen Bed & Storage', x: 68, y: 62, icon: '🛏️', details: 'Comfortable memory foam mattress with under-bed sliding storage drawers.' },
      { id: 'window', label: 'East-Facing Sunlit Window', x: 50, y: 35, icon: '☀️', details: 'Abundant morning natural light and soundproof double-glazed window.' }
    ]
  },
  {
    id: 'living',
    name: 'Living Studio & Lounge',
    panoramaUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80',
    hotspots: [
      { id: 'sofa', label: 'Lounge Seating Area', x: 40, y: 65, icon: '🛋️', details: 'Cozy seating area with Smart TV and high-speed streaming.' },
      { id: 'ac', label: 'Inverter AC Unit', x: 75, y: 25, icon: '❄️', details: '5-Star rated energy efficient split air conditioner.' }
    ]
  },
  {
    id: 'study',
    name: 'Study Nook',
    panoramaUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1600&q=80',
    hotspots: [
      { id: 'bookshelf', label: 'Wall Bookshelf & Task Light', x: 25, y: 40, icon: '📚', details: 'Ample storage for textbooks, notes, and study supplies.' }
    ]
  },
  {
    id: 'kitchen',
    name: 'Modular Kitchen',
    panoramaUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&q=80',
    hotspots: [
      { id: 'fridge', label: 'Double Door Refrigerator', x: 20, y: 50, icon: '🧊', details: 'Shared frost-free refrigerator with designated tenant shelves.' },
      { id: 'water', label: 'RO Water Purifier', x: 60, y: 42, icon: '💧', details: 'Multi-stage UV+RO water purification system available 24/7.' }
    ]
  },
  {
    id: 'washroom',
    name: 'Attached Washroom',
    panoramaUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80',
    hotspots: [
      { id: 'geyser', label: 'Instant Water Geyser', x: 55, y: 30, icon: '🚿', details: '15L energy efficient instant hot water geyser.' }
    ]
  }
]

export const VirtualTourViewer = ({ propertyTitle }) => {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0)
  const [viewMode, setViewMode] = useState('360') // '360', 'matterport', 'floorplan'
  const [isAutoRotate, setIsAutoRotate] = useState(true)
  const [rotationX, setRotationX] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showRuler, setShowRuler] = useState(false)
  const containerRef = useRef(null)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const rotStartRef = useRef(0)

  const activeRoom = ROOM_DATA[activeRoomIndex]

  // Auto rotation loop
  useEffect(() => {
    if (!isAutoRotate || viewMode !== '360') return
    const interval = setInterval(() => {
      setRotationX(prev => (prev + 0.15) % 360)
    }, 30)
    return () => clearInterval(interval)
  }, [isAutoRotate, viewMode])

  const handleMouseDown = (e) => {
    if (viewMode !== '360') return
    isDraggingRef.current = true
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0
    rotStartRef.current = rotationX
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || viewMode !== '360') return
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const diff = (currentX - startXRef.current) * 0.4
    setRotationX((rotStartRef.current - diff) % 360)
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }

  return (
    <div 
      ref={containerRef}
      className="bg-slate-900 text-white rounded-2xl overflow-hidden shadow-2xl border border-slate-800 transition-all duration-300 relative"
    >
      {/* Header Banner */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4 z-20 relative backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 shadow-lg shadow-red-500/20 text-white">
            <Compass className="animate-spin-slow" size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-white font-display">360° Virtual Tour & Matterport 3D</h3>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Live 3D Walkthrough
              </span>
            </div>
            <p className="text-xs text-slate-400">Explore rooms in 3D panoramic views before visiting in person</p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-800/90 rounded-xl p-1 border border-slate-700">
          <button
            onClick={() => setViewMode('360')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === '360' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <RotateCcw size={14} /> 360° Panorama
          </button>
          <button
            onClick={() => setViewMode('matterport')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'matterport' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers size={14} /> Matterport 3D
          </button>
          <button
            onClick={() => setViewMode('floorplan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'floorplan' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapPin size={14} /> 3D Floorplan
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div 
        className="relative w-full h-[450px] sm:h-[540px] bg-slate-950 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        {viewMode === '360' && (
          <>
            {/* Background Panorama Canvas simulation */}
            <div 
              className="absolute inset-0 transition-transform duration-75 bg-cover bg-center"
              style={{
                backgroundImage: `url(${activeRoom.panoramaUrl})`,
                transform: `scale(1.1) translateX(${(rotationX % 100) * 0.4}px)`,
                filter: 'brightness(0.95) contrast(1.05)'
              }}
            />
            
            {/* Ambient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

            {/* Interactive Hotspots */}
            {activeRoom.hotspots.map((hs) => {
              const adjustedX = (hs.x + (rotationX * 0.3)) % 100
              if (adjustedX < 5 || adjustedX > 95) return null
              return (
                <div
                  key={hs.id}
                  style={{ top: `${hs.y}%`, left: `${adjustedX}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveHotspot(hs)
                  }}
                >
                  <button className="relative flex items-center justify-center cursor-pointer">
                    <span className="absolute w-10 h-10 rounded-full bg-red-500/40 animate-ping" />
                    <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-base shadow-xl border-2 border-white hover:scale-125 transition-transform">
                      {hs.icon}
                    </span>
                  </button>

                  {/* Hotspot Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 bg-slate-900/95 backdrop-blur-md border border-slate-700 text-white text-xs p-3 rounded-xl shadow-2xl pointer-events-none z-40">
                    <p className="font-bold text-amber-300 flex items-center gap-1 mb-1">
                      <span>{hs.icon}</span> {hs.label}
                    </p>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{hs.details}</p>
                  </div>
                </div>
              )
            })}

            {/* Measurement Ruler Tool Overlay */}
            {showRuler && (
              <div className="absolute inset-x-8 top-16 bg-slate-900/90 border border-amber-500/40 rounded-xl p-4 text-xs text-amber-300 flex flex-wrap items-center justify-between gap-2 shadow-2xl z-30 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <Ruler className="text-amber-400" size={18} />
                  <div>
                    <p className="font-bold text-white">Virtual 3D Room Dimension Tool</p>
                    <p className="text-[11px] text-amber-200/80">Estimated Desk-to-Bed Clearance: <span className="font-mono font-bold text-emerald-400">8.5 ft</span> • Ceiling Height: <span className="font-mono font-bold text-emerald-400">10.2 ft</span></p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowRuler(false)} 
                  className="bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer"
                >
                  Dismiss Tool
                </button>
              </div>
            )}

            {/* Drag Hint overlay */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/70 border border-slate-700/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs text-slate-300 flex items-center gap-2 pointer-events-none">
              <Move size={14} className="text-red-400 animate-bounce" />
              <span>Click & Drag to Look Around 360°</span>
            </div>
          </>
        )}

        {viewMode === 'matterport' && (
          <div className="relative w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
              <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 mx-auto mb-4">
                <Layers size={32} />
              </div>
              <h4 className="font-bold text-xl text-white mb-2 font-display">Matterport 3D Showcase Ready</h4>
              <p className="text-sm text-slate-300 mb-4">Interactive 3D Dollhouse and walkthrough model generated for {propertyTitle || 'this property'}.</p>
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 text-xs text-slate-400 font-mono mb-4 text-left space-y-1">
                <p>• Dollhouse View: Ready</p>
                <p>• Floor Navigation: 2 Floors</p>
                <p>• Spatial Precision: 99.4%</p>
              </div>
              <button 
                onClick={() => setViewMode('360')}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-2.5 rounded-xl transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} /> Switch to High-Res 360° Panorama
              </button>
            </div>
          </div>
        )}

        {viewMode === 'floorplan' && (
          <div className="relative w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-xl w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <h4 className="font-bold text-xl text-white mb-4 font-display flex items-center justify-center gap-2">
                <MapPin className="text-red-500" size={20} /> Architectural 3D Floorplan
              </h4>
              <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center relative overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80" 
                  alt="Floorplan" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col items-center justify-end p-4">
                  <span className="text-sm font-bold text-white mb-1">Total Carpet Area: 420 Sq. Ft.</span>
                  <span className="text-xs text-slate-400">Master Bedroom (12x10) • Attached Bath (6x5) • Balcony (8x4)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Controls Bar */}
        <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
          <button
            onClick={() => setShowRuler(!showRuler)}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md ${
              showRuler 
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg' 
                : 'bg-slate-900/80 text-amber-300 border-slate-700 hover:bg-slate-800'
            }`}
            title="Measure Room Dimensions"
          >
            <Ruler size={16} /> <span className="hidden sm:inline">Measure</span>
          </button>
          
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md ${
              isAutoRotate 
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg' 
                : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
            title="Toggle 360 Auto-Rotation"
          >
            {isAutoRotate ? <Pause size={16} /> : <Play size={16} />}
            <span className="hidden sm:inline">{isAutoRotate ? 'Auto-Rotate ON' : 'Paused'}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white hover:bg-slate-800 transition-colors backdrop-blur-md cursor-pointer"
            title="Fullscreen Tour"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Room Selector Strip */}
      <div className="bg-slate-900 border-t border-slate-800 p-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span>Select Room View:</span>
          <span className="text-slate-500">• {ROOM_DATA.length} Available Rooms</span>
        </p>
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {ROOM_DATA.map((room, index) => (
            <button
              key={room.id}
              onClick={() => {
                setActiveRoomIndex(index)
                setActiveHotspot(null)
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border cursor-pointer ${
                activeRoomIndex === index
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-500 shadow-lg shadow-red-600/20'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Eye size={14} />
              <span>{room.name}</span>
              <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded-full font-mono">
                {room.hotspots.length} pins
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Hotspot Modal Detail */}
      {activeHotspot && (
        <div className="bg-slate-950 border-t border-red-500/30 p-4 px-6 flex flex-wrap items-center justify-between gap-4 z-40 relative">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800">{activeHotspot.icon}</span>
            <div>
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                {activeHotspot.label}
                <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-0.5 rounded-full font-bold">Hotspot Feature</span>
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">{activeHotspot.details}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveHotspot(null)}
            className="text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 cursor-pointer"
          >
            Close Details
          </button>
        </div>
      )}
    </div>
  )
}
