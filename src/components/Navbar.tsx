import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { 
  Video, 
  Menu, 
  X, 
  ChevronDown, 
  FileText, 
  Star,
  Flame,
  Bot,
  GraduationCap,
  Sparkles,
  Layers
} from 'lucide-react';
import { CourseCategory, CustomPage, NavItemConfig } from '../types';
import { OfficialWhatsAppIcon } from './FakeWhatsAppWidget';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  const { 
    siteSettings, 
    selectedCategory, 
    setSelectedCategory, 
    openWhatsAppWithCourse,
    activeView,
    setActiveView,
    activeCategories,
    classes,
    openClassPortal,
    customPages,
    openCustomPage,
    isAssistantOpen,
    setIsAssistantOpen,
    setAdminModalOpen,
    navItems
  } = useCourse();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [classesDropdownOpen, setClassesDropdownOpen] = useState(false);
  const [customPagesDropdownOpen, setCustomPagesDropdownOpen] = useState(false);

  const navCustomPages = customPages.filter(p => p.showInNavbar);

  // Secret Triple Click on Logo to open Admin Panel discreetly
  const logoClickRef = React.useRef<{ count: number; lastTime: number }>({ count: 0, lastTime: 0 });
  const handleLogoClick = () => {
    const now = Date.now();
    if (now - logoClickRef.current.lastTime < 800) {
      logoClickRef.current.count += 1;
      if (logoClickRef.current.count >= 3) {
        setAdminModalOpen(true);
        logoClickRef.current.count = 0;
        return;
      }
    } else {
      logoClickRef.current.count = 1;
    }
    logoClickRef.current.lastTime = now;
    handleHomeClick();
  };

  const handleHomeClick = () => {
    setActiveView('home');
    setSelectedCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCoursesClick = () => {
    setActiveView('home');
    setSelectedCategory('all');
    setTimeout(() => {
      const el = document.getElementById('all-courses-catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleCategorySelect = (cat: CourseCategory) => {
    setSelectedCategory(cat);
    setCategoryDropdownOpen(false);
    setMobileMenuOpen(false);
    setActiveView('home');
    setTimeout(() => {
      const el = document.getElementById('all-courses-catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Render Desktop Nav Item dynamically
  const renderDesktopNavItem = (item: NavItemConfig) => {
    if (!item.enabled) return null;

    if (item.type === 'dropdown') {
      if (item.dropdownType === 'classes') {
        return (
          <div key={item.id} className="relative">
            <button
              onClick={() => setClassesDropdownOpen(!classesDropdownOpen)}
              onMouseEnter={() => setClassesDropdownOpen(true)}
              className={`hover:text-[#EA1D2C] transition flex items-center gap-1 cursor-pointer ${activeView === 'class-hub' ? 'text-[#EA1D2C]' : ''}`}
            >
              <GraduationCap className="w-4 h-4 text-[#EA1D2C]" />
              <span>{item.label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {classesDropdownOpen && (
              <div 
                onMouseLeave={() => setClassesDropdownOpen(false)}
                className="absolute top-full left-0 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 mt-1 z-50 animate-in fade-in slide-in-from-top-2"
              >
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  ক্লাস ভিত্তিক পেজ
                </div>
                {classes.map((cls) => (
                  <button
                    key={cls.id}
                    onClick={() => {
                      openClassPortal(cls.id);
                      setClassesDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 transition cursor-pointer text-slate-700 hover:text-[#EA1D2C]"
                  >
                    <span className="text-base">{cls.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs">{cls.shortTitle}</div>
                      <div className="text-[10px] text-slate-400 truncate">{cls.gradeBadge}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      }

      if (item.dropdownType === 'custom_pages' && navCustomPages.length > 0) {
        return (
          <div key={item.id} className="relative">
            <button
              onClick={() => setCustomPagesDropdownOpen(!customPagesDropdownOpen)}
              onMouseEnter={() => setCustomPagesDropdownOpen(true)}
              className={`hover:text-[#EA1D2C] transition flex items-center gap-1 cursor-pointer ${activeView === 'custom-page' ? 'text-[#EA1D2C]' : ''}`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{item.label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {customPagesDropdownOpen && (
              <div 
                onMouseLeave={() => setCustomPagesDropdownOpen(false)}
                className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 mt-1 z-50 animate-in fade-in slide-in-from-top-2"
              >
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  বিশেষ কোর্স সংগ্রহ
                </div>
                {navCustomPages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => {
                      openCustomPage(page);
                      setCustomPagesDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 transition cursor-pointer text-slate-700 hover:text-[#EA1D2C]"
                  >
                    <span className="text-base">{page.icon || '📄'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs truncate">{page.title}</div>
                      <div className="text-[10px] text-slate-400 truncate">{page.selectedCourseIds.length}টি কোর্স</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      }

      if (item.dropdownType === 'categories') {
        return (
          <div key={item.id} className="relative">
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              onMouseEnter={() => setCategoryDropdownOpen(true)}
              className="hover:text-[#EA1D2C] transition flex items-center gap-1 cursor-pointer"
            >
              <span>{item.label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {categoryDropdownOpen && (
              <div 
                onMouseLeave={() => setCategoryDropdownOpen(false)}
                className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 mt-1 z-50 animate-in fade-in slide-in-from-top-2"
              >
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  কোর্স ক্যাটাগরি
                </div>
                {activeCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-slate-50 transition cursor-pointer ${
                      selectedCategory === cat.id ? 'text-[#EA1D2C] bg-red-50/50 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      }
    }

    if (item.type === 'link' && item.target) {
      return (
        <a
          key={item.id}
          href={item.target}
          target={item.isExternal ? '_blank' : '_self'}
          rel={item.isExternal ? 'noopener noreferrer' : undefined}
          className="hover:text-[#EA1D2C] transition flex items-center gap-1 cursor-pointer"
        >
          {item.icon && <span>{item.icon}</span>}
          <span>{item.label}</span>
          {item.badgeText && (
            <span className="text-[10px] bg-red-100 text-[#EA1D2C] px-1.5 py-0.5 rounded-full font-bold">
              {item.badgeText}
            </span>
          )}
        </a>
      );
    }

    const handleClick = () => {
      if (item.target === 'home') handleHomeClick();
      else if (item.target === 'courses') handleCoursesClick();
      else if (item.target === 'blogs') setActiveView('blogs');
      else if (item.target === 'reviews') setActiveView('reviews');
      else if (item.target === 'class-hub') setActiveView('class-hub');
      else if (item.target === 'faq') {
        setActiveView('home');
        setTimeout(() => {
          document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else {
        handleHomeClick();
      }
    };

    const isActive = activeView === item.target;

    return (
      <button
        key={item.id}
        onClick={handleClick}
        className={`hover:text-[#EA1D2C] transition cursor-pointer flex items-center gap-1.5 ${isActive ? 'text-[#EA1D2C]' : ''}`}
      >
        {item.icon && <span className="text-sm">{item.icon}</span>}
        <span>{item.label}</span>
        {item.badgeText && (
          <span className="text-[10px] bg-red-100 text-[#EA1D2C] px-1.5 py-0.2 rounded-full font-bold">
            {item.badgeText}
          </span>
        )}
      </button>
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs font-['Hind_Siliguri',sans-serif]">
      {/* Top Banner Notice */}
      {siteSettings.isHeaderNoticeActive && siteSettings.headerNotice && (
        <div className="bg-[#EA1D2C] text-white text-xs sm:text-sm py-1 sm:py-1.5 px-3 sm:px-4 text-center font-medium flex items-center justify-center gap-2">
          <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
          <span className="truncate max-w-4xl">{siteSettings.headerNotice}</span>
          <button 
            onClick={() => openWhatsAppWithCourse(undefined, 'আমি বিশেষ ডিসকাউন্ট কুপন কোড ও অফার লিংক জানতে চাই।')}
            className="hidden sm:inline-flex bg-white/20 hover:bg-white/30 text-white text-xs px-2.5 py-0.5 rounded-full font-bold ml-2 transition border border-white/20 cursor-pointer"
          >
            কুপন কোড নিন →
          </button>
        </div>
      )}

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20 gap-3">
          
          {/* Logo & Brand matching Reference Photo 2 (Triple-click secretly opens admin panel) */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-3 group text-left cursor-pointer transition hover:opacity-95"
              title="10mscourse.shop - Home (Triple click for admin)"
            >
              <BrandLogo />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-bold text-slate-600">
            {navItems && navItems.length > 0 ? (
              [...navItems]
                .filter(item => item.enabled)
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map(item => renderDesktopNavItem(item))
            ) : (
              <>
                <button 
                  onClick={handleHomeClick}
                  className={`hover:text-[#EA1D2C] transition cursor-pointer ${activeView === 'home' ? 'text-[#EA1D2C]' : ''}`}
                >
                  হোম
                </button>
                <button 
                  onClick={handleCoursesClick}
                  className="hover:text-[#EA1D2C] transition cursor-pointer"
                >
                  সকল কোর্স
                </button>
                <button 
                  onClick={() => setActiveView('blogs')}
                  className={`hover:text-[#EA1D2C] transition cursor-pointer ${activeView === 'blogs' ? 'text-[#EA1D2C]' : ''}`}
                >
                  ব্লগ
                </button>
                <button 
                  onClick={() => setActiveView('reviews')}
                  className={`hover:text-[#EA1D2C] transition cursor-pointer ${activeView === 'reviews' ? 'text-[#EA1D2C]' : ''}`}
                >
                  রিভিউ
                </button>
              </>
            )}
          </nav>

          {/* Right Action Widgets (Google Meet + Course Assistant + WhatsApp) */}
          <div className="hidden lg:flex items-center gap-2.5">
            
            {/* Google Meet Live Button */}
            {siteSettings.isMeetLive ? (
              <a
                href={siteSettings.googleMeetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#EA1D2C] hover:bg-[#bd1824] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-md shadow-red-200 transition active:scale-95 flex items-center gap-1.5"
                title="গুগল মিটে সরাসরি কথা বলুন"
              >
                <Video className="w-3.5 h-3.5" />
                <span>মিট লাইভ</span>
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              </a>
            ) : null}

            {/* Course Assistant Button right next to Meet */}
            <button
              onClick={() => setIsAssistantOpen(!isAssistantOpen)}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs"
              title="১০ মিনিট কোর্স সহকারী চালু করুন"
            >
              <Bot className="w-3.5 h-3.5 text-indigo-600" />
              <span>কোর্স সহকারী</span>
              <span className="text-[10px] bg-indigo-200/80 text-indigo-900 px-1.5 py-0.2 rounded-full font-bold">AI</span>
            </button>

            {/* WhatsApp CTA Button */}
            <button
              onClick={() => openWhatsAppWithCourse()}
              className="bg-[#25D366] hover:bg-[#20b859] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-md shadow-emerald-100 transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <OfficialWhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp মেসেজ</span>
            </button>

          </div>

          {/* Mobile Right Controls - Clean Menu Button matching Reference */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F1F3F5] hover:bg-slate-200 border border-slate-200/90 rounded-lg text-slate-800 font-bold text-xs transition cursor-pointer active:scale-95 shadow-2xs select-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-slate-700" /> : <Menu className="w-4 h-4 text-slate-700" />}
              <span className="font-sans font-bold tracking-wider text-xs">MENU</span>
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4 shadow-xl animate-in fade-in max-h-[80vh] overflow-y-auto">
          
          {/* Quick Action Buttons inside drawer */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => {
                openWhatsAppWithCourse();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366] text-white rounded-xl text-xs font-bold shadow-xs active:scale-95"
            >
              <OfficialWhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp সাপোর্ট</span>
            </button>

            <button
              onClick={() => {
                setIsAssistantOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-xl text-xs font-bold active:scale-95"
            >
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>AI সহকারী</span>
            </button>
          </div>
          
          {/* Custom Pages for Mobile */}
          {navCustomPages.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>স্পেশাল অফার পেজ</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {navCustomPages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => {
                      openCustomPage(page);
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-2 bg-amber-50/50 hover:bg-amber-100 text-slate-800 rounded-xl text-left text-xs font-bold transition flex items-center gap-2 border border-amber-100"
                  >
                    <span className="text-base">{page.icon || '✨'}</span>
                    <span className="truncate flex-1">{page.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Classes for Mobile */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-[#EA1D2C]" />
              <span>ক্লাস ভিত্তিক পেজ</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {classes.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => {
                    openClassPortal(cls.id);
                    setMobileMenuOpen(false);
                  }}
                  className="px-2 py-2 bg-slate-50 hover:bg-red-50 text-slate-800 rounded-xl text-center text-xs font-bold transition flex flex-col items-center gap-1 border border-slate-100"
                >
                  <span className="text-base">{cls.icon}</span>
                  <span className="truncate w-full text-[11px]">{cls.shortTitle}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Categories for Mobile */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              কোর্স ক্যাটাগরি
            </div>
            <div className="grid grid-cols-2 gap-2">
              {activeCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`text-left px-3 py-2 text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer ${
                    selectedCategory === cat.id ? 'bg-[#EA1D2C] text-white font-bold' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span className="truncate">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => { setActiveView('blogs'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#EA1D2C]" />
              <span>গাইড ও ব্লগ আর্টিকেল</span>
            </button>
            <button
              onClick={() => { setActiveView('reviews'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 cursor-pointer"
            >
              <Star className="w-4 h-4 text-amber-500" />
              <span>শিক্ষার্থী রিভিউ ও অভিজ্ঞতা</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


