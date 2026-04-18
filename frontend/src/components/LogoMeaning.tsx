"use client"
import React, { useState } from 'react'
import Image from 'next/image'
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
    <div className="w-full py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">Logo Anlamı</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Kurumsal kimliğimizin temel taşı olan logomuzun her detayı, derneğimizin vizyonunu ve değerlerini temsil eder.</p>
        </div>

        {/* Desktop View: Interactive Logo */}
        <div className="hidden lg:block relative max-w-2xl mx-auto aspect-square">
          {/* Main Logo */}
          <div className="absolute inset-0 flex items-center justify-center p-20">
             <div className="relative w-full h-full p-12 bg-gray-50/50 rounded-full border border-gray-100 shadow-inner">
                <img 
                  src="/images/logo.png" 
                  alt="KEFDER Logo" 
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
             </div>
          </div>

          {/* Feature Points */}
          {features.map((feature, index) => {
            const pos = positions[index % positions.length]
            return (
              <div 
                key={index}
                className="absolute z-20 group"
                style={{ top: pos.top, left: pos.left }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Pulse Dot */}
                <div className="relative cursor-pointer">
                  <div className="absolute inset-0 rounded-full bg-orange-500/30 animate-ping"></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeIndex === index ? 'bg-orange-500 scale-125 shadow-lg' : 'bg-white border-2 border-orange-500 shadow-md'}`}>
                    <Plus className={`w-4 h-4 transition-colors ${activeIndex === index ? 'text-white' : 'text-orange-500'}`} />
                  </div>
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className={`absolute z-30 w-72 p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 ${
                        index % 2 === 0 ? 'left-full ml-4' : 'right-full mr-4'
                      } -top-1/2 transform`}
                    >
                      <div className="h-1 w-12 bg-orange-500 rounded-full mb-4"></div>
                      <h4 className="text-lg font-bold text-slate-800 mb-2">{getTitle(feature)}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{getDesc(feature)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Mobile View: List */}
        <div className="lg:hidden space-y-12">
          <div className="relative w-48 h-48 mx-auto bg-gray-50 rounded-full p-8 flex items-center justify-center">
            <img 
              src="/images/logo.png" 
              alt="KEFDER Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="grid gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#FDF6F0] p-6 rounded-2xl border border-orange-100 flex gap-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-orange-500 shadow-sm shrink-0 mt-1">
                   <Info className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg mb-1">{getTitle(feature)}</h4>
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
