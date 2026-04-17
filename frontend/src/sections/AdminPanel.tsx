"use client"
import { useState } from 'react'
import { X, Plus, Edit2, Trash2, Save, Image as ImageIcon, FileText, Bell, LogOut } from 'lucide-react'
import { useAdmin, type NewsItem, type AnnouncementItem } from '../context/AdminContext'
import { useLanguage } from '../context/LanguageContext'

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
}

type Tab = 'news' | 'announcements' | 'photos'

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('news')
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [editingAnnouncement, setEditingAnnouncement] = useState<AnnouncementItem | null>(null)
  const [newPhotoUrl, setNewPhotoUrl] = useState('')
  const [newPhotoCaption, setNewPhotoCaption] = useState('')
  
  const { 
    isLoggedIn, 
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
  } = useAdmin()
  const { t } = useLanguage()

  if (!isOpen || !isLoggedIn) return null

  const handleLogout = () => {
    logout()
    onClose()
  }

  const handleAddNews = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    addNews({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      date: new Date().toISOString().split('T')[0]
    })
    e.currentTarget.reset()
  }

  const handleUpdateNews = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editingNews) {
      const formData = new FormData(e.currentTarget)
      updateNews(editingNews.id, {
        title: formData.get('title') as string,
        content: formData.get('content') as string
      })
      setEditingNews(null)
    }
  }

  const handleAddAnnouncement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    addAnnouncement({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      date: new Date().toISOString().split('T')[0]
    })
    e.currentTarget.reset()
  }

  const handleUpdateAnnouncement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editingAnnouncement) {
      const formData = new FormData(e.currentTarget)
      updateAnnouncement(editingAnnouncement.id, {
        title: formData.get('title') as string,
        content: formData.get('content') as string
      })
      setEditingAnnouncement(null)
    }
  }

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPhotoUrl && newPhotoCaption) {
      addPhoto({
        url: newPhotoUrl,
        caption: newPhotoCaption
      })
      setNewPhotoUrl('')
      setNewPhotoCaption('')
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{t('admin.welcome')}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {t('admin.logout')}
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('news')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
              activeTab === 'news' 
                ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50' 
                : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            {t('admin.news')}
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
              activeTab === 'announcements' 
                ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50' 
                : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
            }`}
          >
            <Bell className="w-4 h-4" />
            {t('admin.announcements')}
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
              activeTab === 'photos' 
                ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50' 
                : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            {t('admin.photos')}
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* News Tab */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              {/* Add Form */}
              {!editingNews && (
                <form onSubmit={handleAddNews} className="bg-gray-50 p-4 rounded-xl space-y-4">
                  <h3 className="font-semibold text-gray-800">{t('admin.addNew')}</h3>
                  <input
                    name="title"
                    type="text"
                    placeholder={t('admin.title')}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    required
                  />
                  <textarea
                    name="content"
                    placeholder={t('admin.content')}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                    required
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    {t('admin.addNew')}
                  </button>
                </form>
              )}
              
              {/* Edit Form */}
              {editingNews && (
                <form onSubmit={handleUpdateNews} className="bg-orange-50 p-4 rounded-xl space-y-4 border-2 border-orange-200">
                  <h3 className="font-semibold text-gray-800">{t('admin.edit')}</h3>
                  <input
                    name="title"
                    type="text"
                    defaultValue={editingNews.title}
                    placeholder={t('admin.title')}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    required
                  />
                  <textarea
                    name="content"
                    defaultValue={editingNews.content}
                    placeholder={t('admin.content')}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                    required
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      {t('admin.save')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingNews(null)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      {t('admin.cancel')}
                    </button>
                  </div>
                </form>
              )}
              
              {/* List */}
              <div className="space-y-3">
                {news.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 p-4 rounded-xl flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{item.content}</p>
                      <span className="text-xs text-gray-400 mt-2 block">{item.date}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingNews(item)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteNews(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Announcements Tab */}
          {activeTab === 'announcements' && (
            <div className="space-y-6">
              {/* Add Form */}
              {!editingAnnouncement && (
                <form onSubmit={handleAddAnnouncement} className="bg-gray-50 p-4 rounded-xl space-y-4">
                  <h3 className="font-semibold text-gray-800">{t('admin.addNew')}</h3>
                  <input
                    name="title"
                    type="text"
                    placeholder={t('admin.title')}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    required
                  />
                  <textarea
                    name="content"
                    placeholder={t('admin.content')}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                    required
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    {t('admin.addNew')}
                  </button>
                </form>
              )}
              
              {/* Edit Form */}
              {editingAnnouncement && (
                <form onSubmit={handleUpdateAnnouncement} className="bg-orange-50 p-4 rounded-xl space-y-4 border-2 border-orange-200">
                  <h3 className="font-semibold text-gray-800">{t('admin.edit')}</h3>
                  <input
                    name="title"
                    type="text"
                    defaultValue={editingAnnouncement.title}
                    placeholder={t('admin.title')}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    required
                  />
                  <textarea
                    name="content"
                    defaultValue={editingAnnouncement.content}
                    placeholder={t('admin.content')}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                    required
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      {t('admin.save')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingAnnouncement(null)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      {t('admin.cancel')}
                    </button>
                  </div>
                </form>
              )}
              
              {/* List */}
              <div className="space-y-3">
                {announcements.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 p-4 rounded-xl flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{item.content}</p>
                      <span className="text-xs text-gray-400 mt-2 block">{item.date}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingAnnouncement(item)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteAnnouncement(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Photos Tab */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              {/* Add Form */}
              <form onSubmit={handleAddPhoto} className="bg-gray-50 p-4 rounded-xl space-y-4">
                <h3 className="font-semibold text-gray-800">{t('admin.addNew')}</h3>
                <input
                  type="text"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  placeholder="Image URL (/images/photo.jpg)"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  required
                />
                <input
                  type="text"
                  value={newPhotoCaption}
                  onChange={(e) => setNewPhotoCaption(e.target.value)}
                  placeholder={t('admin.title')}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  required
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {t('admin.addNew')}
                </button>
              </form>
              
              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <p className="text-sm text-gray-700 truncate">{item.caption}</p>
                      <button
                        onClick={() => deletePhoto(item.id)}
                        className="mt-2 flex items-center gap-1 text-red-500 hover:text-red-600 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        {t('admin.delete')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

