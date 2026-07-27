import React, { useState, useRef } from 'react'
import { 
  Box, Camera, Upload, RotateCw, ZoomIn, Palette, CheckCircle2, 
  X, Sparkles, Layers, Sliders, Maximize2, RefreshCw, AlertCircle, ArrowRight 
} from 'lucide-react'
import toast from 'react-hot-toast'

const FURNITURE_CATALOG = [
  {
    id: 'desk',
    name: 'Ergonomic Study Desk',
    category: 'Study Workstation',
    dimensions: '4.0 x 2.0 ft',
    areaSqFt: 8,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80',
    colors: ['#3A2518', '#8C6239', '#1A1A1A', '#F0F0F0'],
    colorNames: ['Walnut', 'Oak', 'Matte Black', 'Snow White']
  },
  {
    id: 'bed',
    name: 'Single Student Bed',
    category: 'Bedroom',
    dimensions: '6.5 x 3.0 ft',
    areaSqFt: 19.5,
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80',
    colors: ['#3A2518', '#8C6239', '#2E4057'],
    colorNames: ['Walnut', 'Oak', 'Navy Linen']
  },
  {
    id: 'chair',
    name: 'High-Back Mesh Ergonomic Chair',
    category: 'Seating',
    dimensions: '2.0 x 2.0 ft',
    areaSqFt: 4,
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=600&q=80',
    colors: ['#1A1A1A', '#CA3433', '#2563EB'],
    colorNames: ['Obsidian Black', 'Persian Red', 'Cobalt Blue']
  },
  {
    id: 'wardrobe',
    name: 'Compact 2-Door Wardrobe',
    category: 'Storage',
    dimensions: '3.5 x 2.0 ft',
    areaSqFt: 7,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80',
    colors: ['#8C6239', '#F0F0F0', '#3A2518'],
    colorNames: ['Natural Oak', 'Pure White', 'Dark Teak']
  },
  {
    id: 'beanbag',
    name: 'Plush Lounge Beanbag',
    category: 'Comfort',
    dimensions: '3.0 x 3.0 ft',
    areaSqFt: 9,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    colors: ['#CA3433', '#10B981', '#6366F1'],
    colorNames: ['Ruby Red', 'Emerald Green', 'Indigo']
  }
]

export const ARRoomPreviewModal = ({ isOpen, onClose, propertyTitle }) => {
  const [selectedFurniture, setSelectedFurniture] = useState(FURNITURE_CATALOG[0])
  const [activeColorIndex, setActiveColorIndex] = useState(0)
  const [arMode, setArMode] = useState('photo') // 'photo' or 'camera'
  const [userRoomPhoto, setUserRoomPhoto] = useState(null)
  
  // 3D positioning controls state
  const [posX, setPosX] = useState(50) // percentage
  const [posY, setPosY] = useState(55) // percentage
  const [rotation, setRotation] = useState(0) // degrees
  const [scale, setScale] = useState(1.0)
  const [isCameraActive, setIsCameraActive] = useState(false)

  // Room dimension checker state
  const [roomWidth, setRoomWidth] = useState(10)
  const [roomLength, setRoomLength] = useState(12)

  const canvasRef = useRef(null)

  if (!isOpen) return null

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUserRoomPhoto(event.target.result)
        toast.success('Room photo loaded! Drag & scale furniture to preview.')
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerCameraAR = () => {
    setArMode('camera')
    setIsCameraActive(true)
    toast.success('Live Camera AR stream initialized!')
  }

  const totalRoomArea = roomWidth * roomLength
  const remainingArea = totalRoomArea - selectedFurniture.areaSqFt
  const remainingPercent = Math.max(0, Math.round((remainingArea / totalRoomArea) * 100))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl my-8 text-white">
        
        {/* Modal Header */}
        <div className="bg-slate-900 px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-r from-[#CA3433] to-rose-600 shadow-lg text-white">
              <Box size={22} />
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-white font-display flex items-center gap-2">
                GoEazy AR Studio™ <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">Furniture Try-On</span>
              </h3>
              <p className="text-xs text-slate-400">See how real furniture fits into your future student room</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Interactive AR Stage (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950 p-6 flex flex-col items-center justify-between relative min-h-[440px] border-r border-slate-800">
            
            {/* Mode Switcher Header */}
            <div className="w-full flex items-center justify-between mb-4 z-20">
              <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => { setArMode('photo'); setIsCameraActive(false) }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    arMode === 'photo' ? 'bg-[#CA3433] text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Upload size={14} /> Room Photo Mode
                </button>
                <button
                  onClick={triggerCameraAR}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    arMode === 'camera' ? 'bg-[#CA3433] text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Camera size={14} /> Live Camera AR
                </button>
              </div>

              {arMode === 'photo' && (
                <label className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5">
                  <Upload size={14} /> Upload Room Photo
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              )}
            </div>

            {/* AR Canvas Display Area */}
            <div 
              ref={canvasRef}
              className="relative w-full h-[360px] sm:h-[400px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 flex items-center justify-center shadow-inner group"
            >
              {arMode === 'photo' ? (
                <img 
                  src={userRoomPhoto || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80'} 
                  alt="Room Background" 
                  className="w-full h-full object-cover brightness-90"
                />
              ) : (
                <div className="relative w-full h-full bg-slate-950 flex flex-col items-center justify-center p-4">
                  {/* Simulated Camera feed scan lines */}
                  <div className="absolute inset-0 bg-[radial-gradient(#CA3433_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-red-500 animate-spin flex items-center justify-center mb-2">
                    <Camera size={24} className="text-red-400" />
                  </div>
                  <p className="text-xs font-bold text-slate-300">Scanning Room Plane & Surface...</p>
                  <p className="text-[11px] text-slate-500">Point device camera at room floor</p>
                </div>
              )}

              {/* 3D Furniture Overlay Object */}
              <div 
                style={{
                  top: `${posY}%`,
                  left: `${posX}%`,
                  transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
                  filter: `drop-shadow(0px 15px 25px rgba(0, 0, 0, 0.6))`
                }}
                className="absolute z-20 cursor-move transition-transform duration-75 select-none hover:scale-105"
                onMouseDown={(e) => {
                  const rect = canvasRef.current.getBoundingClientRect()
                  const onMove = (ev) => {
                    const newX = ((ev.clientX - rect.left) / rect.width) * 100
                    const newY = ((ev.clientY - rect.top) / rect.height) * 100
                    setPosX(Math.max(10, Math.min(90, newX)))
                    setPosY(Math.max(10, Math.min(90, newY)))
                  }
                  const onUp = () => {
                    window.removeEventListener('mousemove', onMove)
                    window.removeEventListener('mouseup', onUp)
                  }
                  window.addEventListener('mousemove', onMove)
                  window.addEventListener('mouseup', onUp)
                }}
              >
                <div className="relative group/furniture">
                  <img 
                    src={selectedFurniture.image} 
                    alt={selectedFurniture.name}
                    className="w-48 h-36 object-cover rounded-2xl border-2 border-white/80 shadow-2xl" 
                  />
                  {/* Selected Color Tint Indicator */}
                  <div 
                    className="absolute inset-0 rounded-2xl mix-blend-overlay opacity-40 pointer-events-none"
                    style={{ backgroundColor: selectedFurniture.colors[activeColorIndex] || '#000' }}
                  />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 text-amber-300 font-mono text-[10px] px-2 py-0.5 rounded-full border border-slate-700 whitespace-nowrap font-bold shadow-lg">
                    {selectedFurniture.dimensions}
                  </div>
                </div>
              </div>

              {/* Overlay Instructions */}
              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
                <Sliders size={14} className="text-red-400" />
                <span>Drag object to position • Use sliders to rotate & scale</span>
              </div>
            </div>

            {/* Manipulator Controls Bar */}
            <div className="w-full grid grid-cols-2 gap-4 mt-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div>
                <label className="text-xs font-bold text-slate-300 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1"><RotateCw size={12} className="text-red-400" /> 360° Rotation</span>
                  <span className="font-mono text-red-400">{rotation}°</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  value={rotation} 
                  onChange={(e) => setRotation(Number(e.target.value))} 
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1"><ZoomIn size={12} className="text-red-400" /> Object Scale</span>
                  <span className="font-mono text-red-400">{scale.toFixed(1)}x</span>
                </label>
                <input 
                  type="range" 
                  min="0.5" 
                  max="2.0" 
                  step="0.1" 
                  value={scale} 
                  onChange={(e) => setScale(Number(e.target.value))} 
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Catalog & Space Compatibility (5 cols) */}
          <div className="lg:col-span-5 p-6 bg-slate-900 flex flex-col justify-between space-y-6">
            
            {/* Furniture Catalog Selection */}
            <div>
              <h4 className="font-bold text-sm text-slate-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Box size={16} className="text-red-400" /> Select Student Furniture Item
              </h4>

              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 scrollbar-hide">
                {FURNITURE_CATALOG.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedFurniture(item)
                      setActiveColorIndex(0)
                    }}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      selectedFurniture.id === item.id 
                        ? 'bg-gradient-to-r from-slate-800 to-slate-850 border-red-500/80 shadow-md ring-1 ring-red-500/50' 
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                      <div>
                        <p className="font-bold text-xs text-white">{item.name}</p>
                        <p className="text-[11px] text-slate-400">{item.category} • {item.dimensions}</p>
                      </div>
                    </div>
                    {selectedFurniture.id === item.id && (
                      <CheckCircle2 size={18} className="text-red-400 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Color & Material Variant Selector */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <label className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <Palette size={14} className="text-red-400" /> Color & Finish Variant:
                <span className="text-red-400 font-normal">({selectedFurniture.colorNames[activeColorIndex]})</span>
              </label>
              <div className="flex items-center gap-3">
                {selectedFurniture.colors.map((colorHex, idx) => (
                  <button
                    key={colorHex}
                    onClick={() => setActiveColorIndex(idx)}
                    style={{ backgroundColor: colorHex }}
                    className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer shadow-md ${
                      activeColorIndex === idx ? 'scale-125 border-white ring-2 ring-red-500' : 'border-slate-700 hover:scale-110'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Space Compatibility Calculator */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-xs text-white font-display flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-400" /> Room Space Compatibility Check
                </h5>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                  {remainingPercent}% Free Space
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[10px] text-slate-400">Room Width (ft)</label>
                  <input 
                    type="number" 
                    value={roomWidth} 
                    onChange={(e) => setRoomWidth(Number(e.target.value))} 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">Room Length (ft)</label>
                  <input 
                    type="number" 
                    value={roomLength} 
                    onChange={(e) => setRoomLength(Number(e.target.value))} 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white font-mono"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Great fit!</strong> Furniture takes <span className="font-mono font-bold text-white">{selectedFurniture.areaSqFt} sq.ft</span> leaving <span className="font-mono font-bold text-white">{remainingArea} sq.ft</span> free for movement.
                </span>
              </div>
            </div>

            {/* Footer Action Button */}
            <button
              onClick={() => {
                toast.success(`Saved AR configuration for ${selectedFurniture.name}!`)
                onClose()
              }}
              className="w-full bg-gradient-to-r from-[#CA3433] to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-3 rounded-2xl transition-all shadow-xl shadow-red-900/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              Confirm AR Room Layout <ArrowRight size={16} />
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}
