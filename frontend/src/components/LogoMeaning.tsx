"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, Plus } from 'lucide-react'

interface LogoFeature {
  title: { [key: string]: string }
  description: { [key: string]: string }
}

interface LogoMeaningProps {
  features: LogoFeature[]
  language: string
}

export default function LogoMeaning({ features, language }: LogoMeaningProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Positions for the dots around the logo (percentage based)
  // These can be adjusted based on the actual logo shape
  const positions = [
    { top: '20%', left: '20%' },
    { top: '20%', left: '80%' },
    { top: '50%', left: '10%' },
    { top: '50%', left: '90%' },
    { top: '80%', left: '25%' },
    { top: '80%', left: '75%' },
  ]

  const getTitle = (f: LogoFeature) => f.title?.[language] || f.title?.tr || ''
  const getDesc = (f: LogoFeature) => f.description?.[language] || f.description?.tr || ''

  if (!features || features.length === 0) return null

  return (
    <div className="w-full py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-kefder-teal/10 text-kefder-teal rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            KURUMSAL KİMLİK
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-kefder-gray-dark mb-4">Logo Anlamı</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Logomuzun her detayı, derneğimizin vizyonunu ve değerlerini temsil eden birer semboldür.</p>
        </div>

        {/* Desktop View: Interactive Logo with Side Panels */}
        <div className="hidden lg:flex items-center justify-center gap-8 xl:gap-16 relative min-h-[600px] xl:min-h-[700px]">
          
          {/* Left Content Area */}
          <div className="w-[300px] xl:w-[380px] shrink-0 h-[500px] flex flex-col justify-center items-end text-right">
            <AnimatePresence mode="wait">
              {activeIndex !== null && activeIndex % 2 === 0 ? (
                <motion.div
                  key={`left-${activeIndex}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-6"
                >
                  <div className="inline-block w-16 h-1.5 bg-kefder-teal rounded-full"></div>
                  <h4 className="text-3xl font-bold text-kefder-gray-dark">{getTitle(features[activeIndex])}</h4>
                  <p className="text-lg text-kefder-gray leading-relaxed">{getDesc(features[activeIndex])}</p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  className="text-kefder-teal font-medium text-lg flex flex-col items-end gap-3"
                >
                  <span className="bg-kefder-teal/10 px-4 py-2 rounded-2xl border border-kefder-teal/20">
                    İşaretçilerin üzerine gelerek <br /> anlamlarını keşfedin
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Center Logo Circle */}
          <div className="relative w-[420px] h-[420px] xl:w-[650px] xl:h-[650px] shrink-0">
            {/* Background Rings */}
            <div className="absolute inset-0 border-2 border-dashed border-gray-100 rounded-full animate-[spin_80s_linear_infinite]"></div>
            <div className="absolute inset-16 border border-gray-100 rounded-full"></div>
            <div className="absolute inset-32 border border-gray-50 rounded-full"></div>
            
            <div className="absolute inset-0 flex items-center justify-center p-32">
              <div className="relative w-full h-full p-16 bg-white/40 backdrop-blur-sm rounded-full border border-gray-200 shadow-2xl group transition-all duration-700 hover:shadow-kefder-teal/10">
                <img 
                  src="/images/logo.png" 
                  alt="KEFDER Logo" 
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Interactive Dots */}
            {features.map((_, index) => {
              const pos = positions[index % positions.length]
              const isActive = activeIndex === index
              return (
                <div 
                  key={index}
                  className="absolute z-20"
                  style={{ top: pos.top, left: pos.left }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div className="relative cursor-pointer group">
                    <div className={`absolute inset-0 rounded-full bg-kefder-teal/30 ${isActive ? 'animate-ping' : 'opacity-0'}`}></div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive 
                        ? 'bg-kefder-teal text-white scale-125 shadow-xl' 
                        : 'bg-white border-2 border-kefder-teal text-kefder-teal shadow-lg hover:scale-110'
                    }`}>
                      {isActive ? <Info className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Content Area */}
          <div className="w-[300px] xl:w-[380px] shrink-0 h-[500px] flex flex-col justify-center items-start text-left">
            <AnimatePresence mode="wait">
              {activeIndex !== null && activeIndex % 2 !== 0 ? (
                <motion.div
                  key={`right-${activeIndex}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="space-y-6"
                >
                  <div className="inline-block w-16 h-1.5 bg-kefder-teal rounded-full"></div>
                  <h4 className="text-3xl font-bold text-kefder-gray-dark">{getTitle(features[activeIndex])}</h4>
                  <p className="text-lg text-kefder-gray leading-relaxed">{getDesc(features[activeIndex])}</p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  className="text-kefder-teal font-medium text-lg flex flex-col items-start gap-3"
                >
                  <span className="bg-kefder-teal/10 px-4 py-2 rounded-2xl border border-kefder-teal/20">
                    Logomuzun hikayesini <br /> incelemek için dokunun
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile View: List */}
        <div className="lg:hidden space-y-12">
          <div className="relative w-64 h-64 mx-auto bg-gray-50 rounded-full p-10 flex items-center justify-center border border-gray-100 shadow-inner">
            <img 
              src="/images/logo.png" 
              alt="KEFDER Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="grid gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#FDF6F0] p-6 rounded-2xl border border-orange-100 flex gap-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-kefder-teal shadow-sm shrink-0 mt-1">
                   <Info className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-kefder-gray-dark text-lg mb-1">{getTitle(feature)}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{getDesc(feature)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
