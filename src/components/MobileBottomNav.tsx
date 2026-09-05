import React from 'react';
import { useCourse } from '../context/CourseContext';
import { 
  Home, 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  Tag
} from 'lucide-react';
import { CourseCategory } from '../types';

export const MobileBottomNav: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    selectedCategory, 
    setSelectedCategory,
    setSearchQuery,
    searchQuery
  } = useCourse();

  const handleNavClick = (
    target: 'home' | 'academic' | 'admission' | 'skills' | 'offers'
  ) => {
    setActiveView('home');

    if (target === 'home') {
      setSelectedCategory('all');
      setSearchQuery('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'academic') {
      setSelectedCategory('hsc');
      setSearchQuery('');
    } else if (target === 'admission') {
      setSelectedCategory('admission');
      setSearchQuery('');
    } else if (target === 'skills') {
      setSelectedCategory('skill');
      setSearchQuery('');
    } else if (target === 'offers') {
      setSelectedCategory('all');
      setSearchQuery('ছাড়');
    }

    // Scroll smoothly to the courses section
    setTimeout(() => {
      const el = document.getElementById('all-courses-catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  // Determine which tab is active
  const isHomeActive = activeView === 'home' && selectedCategory === 'all' && !searchQuery;
  const isAcademicActive = (activeView === 'home' && (selectedCategory === 'hsc' || selectedCategory === 'class-9-10' || selectedCategory === 'class-6-8')) || activeView === 'class-hub';
  const isAdmissionActive = activeView === 'home' && selectedCategory === 'admission';
  const isSkillsActive = activeView === 'home' && (selectedCategory === 'skill' || selectedCategory === 'language');
  const isOffersActive = searchQuery === 'ছাড়' || searchQuery.includes('offer');

  const navItems = [
    {
      id: 'home',
      label: 'হোম',
      icon: <Home className="w-5 h-5" fill={isHomeActive ? 'currentColor' : 'none'} />,
      isActive: isHomeActive,
      onClick: () => handleNavClick('home')
    },
    {
      id: 'academic',
      label: 'একাডেমিক',
      icon: <BookOpen className="w-5 h-5" />,
      isActive: isAcademicActive,
      onClick: () => handleNavClick('academic')
    },
    {
      id: 'admission',
      label: 'এডমিশন',
      icon: <GraduationCap className="w-5 h-5" />,
      isActive: isAdmissionActive,
      onClick: () => handleNavClick('admission')
    },
    {
      id: 'skills',
      label: 'স্কিলস',
      icon: <Sparkles className="w-5 h-5" />,
      isActive: isSkillsActive,
      onClick: () => handleNavClick('skills')
    },
    {
      id: 'offers',
      label: 'স্পেশাল ছাড়',
      icon: <Tag className="w-5 h-5" />,
      isActive: isOffersActive,
      onClick: () => handleNavClick('offers'),
      badge: 'অফার'
    }
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-3px_16px_rgba(0,0,0,0.06)] py-1 px-1 flex justify-around items-center sm:hidden select-none"
    >
      {navItems.map((item) => {
        const active = item.isActive;
        return (
          <button
            key={item.id}
            type="button"
            onClick={item.onClick}
            className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-0.5 transition-all duration-150 active:scale-95 touch-manipulation cursor-pointer ${
              active 
                ? 'text-[#D62B3B]' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {item.badge && !active && (
              <span className="absolute -top-1 right-2 bg-red-500 text-white text-[8px] font-bold px-1 py-0.2 rounded-full animate-pulse">
                {item.badge}
              </span>
            )}
            <div className={`p-0.5 transition-transform ${active ? 'scale-110' : ''}`}>
              {item.icon}
            </div>
            <span className={`text-[10px] tracking-tight leading-none mt-1 font-medium ${
              active ? 'font-bold text-[#D62B3B]' : 'text-slate-600'
            }`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
