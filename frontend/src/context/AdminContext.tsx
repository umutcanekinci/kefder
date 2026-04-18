"use client"
import { createContext, useContext, useState, type ReactNode, useEffect } from 'react'

export interface NewsItem {
  id: string
  title: string
  content: string
  image?: string
  date: string
}

export interface AnnouncementItem {
  id: string
  title: string
  content: string
  date: string
}

export interface PhotoItem {
  id: string
  url: string
  caption: string
}

interface AdminContextType {
  isLoggedIn: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  news: NewsItem[]
  announcements: AnnouncementItem[]
  photos: PhotoItem[]
  addNews: (item: Omit<NewsItem, 'id'>) => void
  updateNews: (id: string, item: Partial<NewsItem>) => void
  deleteNews: (id: string) => void
  addAnnouncement: (item: Omit<AnnouncementItem, 'id'>) => void
  updateAnnouncement: (id: string, item: Partial<AnnouncementItem>) => void
  deleteAnnouncement: (id: string) => void
  addPhoto: (item: Omit<PhotoItem, 'id'>) => void
  deletePhoto: (id: string) => void
}

const ADMIN_USERNAME = 'kefder'
const ADMIN_PASSWORD = 'kefder2024'

const defaultNews: NewsItem[] = [
  {
    id: '1',
    title: 'Yeni Projelerimiz Başlıyor',
    content: '2024 yılında yeni sosyal sorumluluk projelerimiz ile karşınızdayız.',
    date: '2024-01-15'
  },
  {
    id: '2',
    title: 'Gönüllü Buluşması',
    content: 'Tüm gönüllülerimizi bekliyoruz.',
    date: '2024-01-10'
  }
]

const defaultAnnouncements: AnnouncementItem[] = [
  {
    id: '1',
    title: 'Yılbaşı Etkinliği',
    content: 'Yılbaşına özel etkinliğimize davetlisiniz.',
    date: '2024-01-05'
  }
]

const defaultPhotos: PhotoItem[] = [
  {
    id: '1',
    url: '/images/asset_1.jpg',
    caption: 'Gönüllülerimiz'
  }
]

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [news, setNews] = useState<NewsItem[]>(() => {
    if (typeof window === 'undefined') return defaultNews
    const saved = localStorage.getItem('kefder_news')
    return saved ? JSON.parse(saved) : defaultNews
  })
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(() => {
    if (typeof window === 'undefined') return defaultAnnouncements
    const saved = localStorage.getItem('kefder_announcements')
    return saved ? JSON.parse(saved) : defaultAnnouncements
  })
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    if (typeof window === 'undefined') return defaultPhotos
    const saved = localStorage.getItem('kefder_photos')
    return saved ? JSON.parse(saved) : defaultPhotos
  })

  useEffect(() => {
    localStorage.setItem('kefder_news', JSON.stringify(news))
  }, [news])

  useEffect(() => {
    localStorage.setItem('kefder_announcements', JSON.stringify(announcements))
  }, [announcements])

  useEffect(() => {
    localStorage.setItem('kefder_photos', JSON.stringify(photos))
  }, [photos])

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
  }

  const addNews = (item: Omit<NewsItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() }
    setNews(prev => [newItem, ...prev])
  }

  const updateNews = (id: string, item: Partial<NewsItem>) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, ...item } : n))
  }

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id))
  }

  const addAnnouncement = (item: Omit<AnnouncementItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() }
    setAnnouncements(prev => [newItem, ...prev])
  }

  const updateAnnouncement = (id: string, item: Partial<AnnouncementItem>) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, ...item } : a))
  }

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id))
  }

  const addPhoto = (item: Omit<PhotoItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() }
    setPhotos(prev => [...prev, newItem])
  }

  const deletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id))
  }

  return (
    <AdminContext.Provider value={{
      isLoggedIn,
      login,
      logout,
      news,
      announcements,
      photos,
      addNews,
      updateNews,
      deleteNews,
      addAnnouncement,
      updateAnnouncement,
      deleteAnnouncement,
      addPhoto,
      deletePhoto
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
