import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  LayoutDashboard, CloudRain, CheckSquare, AlertTriangle, MapPin,
  HeartHandshake, BarChart3, User, LogOut, Sun, Moon, Menu, X,
  Bell, Globe, Search, MessageSquare, ChevronLeft, ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: 'Namaste! I am Monsoon Sahayak. How can I help you prepare or find assistance today?' }
  ]);
  const [language, setLanguage] = useState('en');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Severe Rain Advisory', body: 'Red alert issued for Ludhiana, expect 120mm+ rainfall.', time: '5m ago', unread: true },
    { id: 2, title: 'Preparedness Plan Ready', body: 'AI has generated a fresh monsoon checklist based on your profile.', time: '1h ago', unread: false },
    { id: 3, title: 'Safety Shelter Nearby', body: 'Model Town Community Shelter has updated status to: OPEN.', time: '3h ago', unread: false }
  ];

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/weather', label: 'Weather Forecast', icon: CloudRain },
    { path: '/preparedness', label: 'Preparedness Plan', icon: CheckSquare },
    { path: '/alerts', label: 'Live Alerts', icon: AlertTriangle },
    { path: '/safety-points', label: 'Safety Points', icon: MapPin },
    { path: '/donations', label: 'Donation Dashboard', icon: HeartHandshake },
    { path: '/reports', label: 'Reports & Analytics', icon: BarChart3 },
    { path: '/profile', label: 'My Profile', icon: User }
  ];

  const handleSendAi = () => {
    if (!aiMessage.trim()) return;
    const userMsg = aiMessage;
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setAiMessage('');

    setTimeout(() => {
      let reply = "Based on your household profile, please ensure you have stored clean drinking water (at least 3 liters per person per day) and keep your medication in a waterproof zip bag on the first floor.";
      if (userMsg.toLowerCase().includes('shelter') || userMsg.toLowerCase().includes('open')) {
        reply = "There are 3 shelters open within 5km of your location in Ludhiana. The closest is Model Town Community Center (1.2 km away) which is currently at 45% capacity.";
      } else if (userMsg.toLowerCase().includes('rain') || userMsg.toLowerCase().includes('weather')) {
        reply = "The forecast predicts heavy showers (80mm) in your area in the next 12 hours. The alert level is orange. Please stay indoors.";
      }
      setChatHistory(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 h-16 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <ShieldAlert size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:inline-block">
              Monsoon <span className="text-blue-600">Sahayak</span>
            </span>
          </Link>
        </div>

        {/* Top bar settings/utilities */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Quick Weather Snippet */}
          <div className="hidden lg:flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
            <CloudRain size={14} className="animate-bounce" />
            <span>Ludhiana: 29°C | Heavy Rain Alert</span>
          </div>

          {/* Search bar */}
          <div className="relative hidden md:block w-48 lg:w-64">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search services, shelters..."
              className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLanguage(prev => prev === 'en' ? 'hi' : prev === 'hi' ? 'pa' : 'en')}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 text-xs font-bold"
            >
              <Globe size={18} />
              <span className="uppercase">{language}</span>
            </button>
          </div>

          {/* Theme Toggler */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(prev => !prev)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 relative"
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {notificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg z-50 overflow-hidden"
                  >
                    <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
                      <span className="font-bold text-sm">Notifications</span>
                      <span className="text-xs text-blue-600 cursor-pointer">Mark all read</span>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className={`p-3 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 ${n.unread ? 'bg-blue-50/20 dark:bg-blue-950/10' : ''}`}>
                          <div className="flex justify-between items-start mb-0.5">
                            <span className="font-bold text-slate-900 dark:text-white">{n.title}</span>
                            <span className="text-slate-400 text-[10px]">{n.time}</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{n.body}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          {user && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-inner">
                {user.name.charAt(0)}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold leading-none">{user.name}</span>
                <span className="text-[10px] text-slate-400">{user.email}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex relative">

        {/* Sidebar (Desktop) */}
        <aside
          className={`hidden md:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ${
            sidebarOpen ? 'w-64' : 'w-20'
          }`}
        >
          <div className="p-4 flex justify-end">
            <button
              onClick={() => setSidebarOpen(prev => !prev)}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>

          <nav className="flex-1 px-3 space-y-1">
            {menuItems.map(item => {
              const active = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon size={20} />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-40 bg-slate-950/60 md:hidden"
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.2 }}
                className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-5 flex flex-col md:hidden"
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-2 rounded-lg text-white">
                      <ShieldAlert size={18} />
                    </div>
                    <span className="font-bold text-md tracking-tight">Monsoon Sahayak</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex-1 space-y-1">
                  {menuItems.map(item => {
                    const active = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                          active
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-7xl mx-auto w-full pb-20 md:pb-6">
          {children}
        </main>
      </div>

      {/* Floating AI Assistant Trigger */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => setAiOpen(prev => !prev)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        >
          <MessageSquare size={24} />
        </button>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around md:hidden px-2 shadow-lg">
        {menuItems.slice(0, 5).map(item => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors ${
                active ? 'text-blue-600' : 'text-slate-400'
              }`}
            >
              <Icon size={20} />
              <span className="text-[9px] mt-1 font-semibold leading-none">{item.label.split(' ')[0]}</span>
            </Link>
          );
        })}
        {/* Floating Chat Trigger inside mobile nav bar */}
        <button
          onClick={() => setAiOpen(true)}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-lg text-slate-400"
        >
          <MessageSquare size={20} />
          <span className="text-[9px] mt-1 font-semibold leading-none">Sahayak AI</span>
        </button>
      </nav>

      {/* AI Assistant Chat Drawer */}
      <AnimatePresence>
        {aiOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-slate-950/40" onClick={() => setAiOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-blue-600 text-white">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={20} />
                  <div>
                    <h4 className="font-bold text-sm">Monsoon Sahayak AI</h4>
                    <span className="text-[10px] opacity-75">Citizen Preparedness Assistant</span>
                  </div>
                </div>
                <button onClick={() => setAiOpen(false)} className="text-white hover:opacity-85">
                  <X size={20} />
                </button>
              </div>

              {/* Chat messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatHistory.map((chat, idx) => (
                  <div key={idx} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-xl text-xs leading-relaxed ${
                        chat.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                      }`}
                    >
                      {chat.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input section */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={aiMessage}
                  onChange={e => setAiMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendAi()}
                  placeholder="Ask about preparedness checklists..."
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendAi}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-semibold"
                >
                  Send
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};
