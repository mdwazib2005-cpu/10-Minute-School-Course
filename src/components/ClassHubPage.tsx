import React, { useState, useMemo } from 'react';
import { useCourse } from '../context/CourseContext';
import { 
  GraduationCap, 
  BookOpen, 
  ArrowLeft, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  MessageCircle, 
  ExternalLink, 
  Search, 
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';
import { Course } from '../types';
import { formatBDT, isOfferActive, getCurrentPrice } from '../utils/courseUtils';

export const ClassHubPage: React.FC = () => {
  const { 
    classes, 
    selectedClass, 
    setSelectedClass, 
    courses, 
    openCoursePage, 
    openWhatsAppWithCourse,
    setActiveView,
    siteSettings
  } = useCourse();

  // Find the currently selected class, or default to first
  const currentClassInfo = useMemo(() => {
    return classes.find(c => c.id === selectedClass) || classes[0] || null;
  }, [classes, selectedClass]);

  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [classSearch, setClassSearch] = useState<string>('');

  // Filter courses matching this class
  const classCourses = useMemo(() => {
    if (!currentClassInfo) return [];
    
    return courses.filter(course => {
      // Check tags
      const matchTag = currentClassInfo.targetTags.some(t => 
        course.tags.some(ct => ct.toLowerCase().includes(t.toLowerCase())) ||
        course.category.toLowerCase().includes(t.toLowerCase())
      );

      // Check category fallback
      const matchCat = currentClassInfo.categoryMatch ? course.category === currentClassInfo.categoryMatch : false;

      // Check title contains class
      const matchTitle = 
        course.title.toLowerCase().includes(currentClassInfo.id.toLowerCase()) ||
        course.title.includes(currentClassInfo.shortTitle) ||
        (currentClassInfo.id === 'class-6' && (course.title.includes('৬') || course.title.includes('6'))) ||
        (currentClassInfo.id === 'class-7' && (course.title.includes('৭') || course.title.includes('7'))) ||
        (currentClassInfo.id === 'class-8' && (course.title.includes('৮') || course.title.includes('8'))) ||
        (currentClassInfo.id === 'class-9' && (course.title.includes('৯') || course.title.includes('9') || course.title.includes('SSC'))) ||
        (currentClassInfo.id === 'class-10' && (course.title.includes('১০') || course.title.includes('10') || course.title.includes('SSC'))) ||
        (currentClassInfo.id === 'hsc' && (course.title.includes('HSC') || course.title.includes('এইচএসসি'))) ||
        (currentClassInfo.id === 'admission' && (course.title.includes('এডমিশন') || course.title.includes('মেডিকেল') || course.title.includes('ভার্সিটি')));

      const isMatch = matchTag || matchCat || matchTitle;
      if (!isMatch) return false;

      // Subject Filter
      if (selectedSubject !== 'all') {
        const subMatch = 
          course.title.includes(selectedSubject) || 
          course.tags.some(t => t.includes(selectedSubject)) ||
          course.shortDescription.includes(selectedSubject);
        if (!subMatch) return false;
      }

      // Search Query
      if (classSearch.trim()) {
        const q = classSearch.toLowerCase();
        const searchMatch = 
          course.title.toLowerCase().includes(q) ||
          course.instructor.toLowerCase().includes(q) ||
          course.shortDescription.toLowerCase().includes(q);
        if (!searchMatch) return false;
      }

      return true;
    });
  }, [currentClassInfo, courses, selectedSubject, classSearch]);

  if (!currentClassInfo) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="text-slate-600">কোনো ক্লাস নির্বাচিত করা হয়নি।</p>
        <button
          onClick={() => setActiveView('home')}
          className="mt-4 px-5 py-2.5 bg-[#EA1D2C] text-white font-bold rounded-xl"
        >
          হোমে ফিরে যান
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Top Breadcrumb & Quick Switch Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Back Button & Current Class */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveView('home');
                  window.location.hash = '';
                }}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>সব ক্লাস ও কোর্স</span>
              </button>

              <span className="text-slate-300">|</span>

              <div className="flex items-center gap-2">
                <span className="text-lg">{currentClassInfo.icon}</span>
                <span className="font-bold text-slate-900 text-sm">{currentClassInfo.shortTitle} পোর্টাল</span>
                <span className="text-[10px] bg-red-50 text-[#EA1D2C] border border-red-200 px-2 py-0.5 rounded-full font-bold">
                  {currentClassInfo.gradeBadge}
                </span>
              </div>
            </div>

            {/* Quick Switch Class Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {classes.map((cls) => {
                const isActive = cls.id === currentClassInfo.id;
                return (
                  <button
                    key={cls.id}
                    onClick={() => {
                      setSelectedClass(cls.id);
                      setSelectedSubject('all');
                      setClassSearch('');
                      window.location.hash = `class-${cls.id}`;
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      isActive 
                        ? 'bg-[#EA1D2C] text-white shadow-xs' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{cls.icon}</span>
                    <span>{cls.shortTitle}</span>
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </div>

      {/* Class Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#1a202c] to-[#0f172a] text-white py-10 sm:py-14">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-8 space-y-4">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-red-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>১০ মিনিট স্কুল অনলাইন ব্যাচ ২০২৬</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                {currentClassInfo.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
                {currentClassInfo.tagline}
              </p>

              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                {currentClassInfo.description}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    openWhatsAppWithCourse(
                      undefined,
                      `আসসালামু আলাইকুম! আমি "${currentClassInfo.title}" এর জন্য ভর্তি তথ্য ও স্পেশাল ছাড় লিংক জানতে চাই।`
                    );
                  }}
                  className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>ক্লাস অ্যাডভাইজরের সাথে কথা বলুন</span>
                </button>

                <a
                  href="#courses-section"
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>সকল কোর্স ও ব্যাচ দেখুন ({classCourses.length})</span>
                </a>
              </div>

            </div>

            {/* Right Card / Highlights */}
            <div className="lg:col-span-4 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl space-y-4">
              
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-red-400" />
                <span>এই ক্লাসের বিশেষ সুবিধাসমূহ</span>
              </h3>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>বুয়েট, ডিএমসি ও শীর্ষ বিশ্ববিদ্যালয়ের অভিজ্ঞ শিক্ষকদের ক্লাস</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>অধ্যায়ভিত্তিক লাইভ ক্লাস ও আনলিমিটেড রেকর্ডেড ব্যাকআপ</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>অধ্যায়ভিত্তিক লেকচার শিট, প্র্যাকটিস প্রশ্ন ও মডেল টেস্ট</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>সরাসরি প্রশ্ন করার জন্য ডাউট সলভিং সেশন ও টেলিগ্রাম গ্রুপ</span>
                </li>
              </ul>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>ব্যাচ: জানুয়ারি - ডিসেম্বর</span>
                </span>
                <span className="text-emerald-400 font-bold">ভর্তি চলছে</span>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Main Content & Subject Filter */}
      <div id="courses-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#EA1D2C]" />
              <h2 className="font-bold text-base text-slate-900">
                {currentClassInfo.shortTitle} এর বিষয়ভিত্তিক কোর্স ও ব্যাচ
              </h2>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                {classCourses.length} টি
              </span>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={classSearch}
                onChange={(e) => setClassSearch(e.target.value)}
                placeholder="কোর্স বা বিষয়ের নাম খুঁজুন..."
                className="w-full text-xs p-2.5 pl-8 bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#EA1D2C] focus:bg-white"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
            </div>

          </div>

          {/* Subject Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedSubject('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedSubject === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              সকল বিষয়
            </button>

            {currentClassInfo.subjects.map((sub) => {
              const isSelected = selectedSubject === sub;
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#EA1D2C] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>

        </div>

        {/* Courses Grid */}
        {classCourses.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-2xs space-y-4">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-base">কোনো কোর্স পাওয়া যায়নি</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                এই বিষয়ের জন্য কোর্স দেখতে সার্চ ক্লিয়ার করুন অথবা সরাসরি হোয়াটসঅ্যাপে জেনে নিন।
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedSubject('all');
                setClassSearch('');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
            >
              ফিল্টার রিসেট করুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6">
            {classCourses.map((course) => {
              const hasOffer = isOfferActive(course);
              const currentPrice = getCurrentPrice(course);

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col group"
                >
                  {/* Thumbnail & Badges */}
                  <div className="relative aspect-video bg-slate-100 overflow-hidden cursor-pointer" onClick={() => openCoursePage(course)}>
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Badge */}
                    {course.badge && (
                      <div className="absolute top-2.5 left-2.5 bg-[#EA1D2C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        {course.badge}
                      </div>
                    )}

                    {hasOffer && (
                      <div className="absolute top-2.5 right-2.5 bg-amber-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                        স্পেশাল অফার
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>{course.categoryName}</span>
                        <span className="font-bold text-amber-600">⭐ {course.rating}</span>
                      </div>

                      <h3 
                        onClick={() => openCoursePage(course)}
                        className="font-bold text-sm text-slate-900 hover:text-[#EA1D2C] transition line-clamp-2 cursor-pointer"
                        title={course.title}
                      >
                        {course.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2">
                        {course.shortDescription}
                      </p>

                      <p className="text-[11px] text-slate-600 font-medium">
                        ইন্সট্রাক্টর: <span className="font-bold text-slate-800">{course.instructor}</span>
                      </p>
                    </div>

                    {/* Pricing and Action */}
                    <div className="pt-3 border-t border-slate-100 space-y-2.5">
                      
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-black text-[#EA1D2C]">
                            {formatBDT(currentPrice)}
                          </span>
                          {hasOffer && (
                            <span className="text-xs text-slate-400 line-through">
                              {formatBDT(course.regularPrice)}
                            </span>
                          )}
                        </div>

                        {course.couponCode && (
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-mono font-bold">
                            কুপন: {course.couponCode}
                          </span>
                        )}
                      </div>

                      {/* CTA Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => openCoursePage(course)}
                          className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition text-center cursor-pointer"
                        >
                          বিস্তারিত
                        </button>

                        <a
                          href={course.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 px-3 bg-[#EA1D2C] hover:bg-[#bd1824] text-white text-xs font-bold rounded-xl shadow-xs transition text-center flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>ভর্তি হোন</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      {/* WhatsApp Fast Ask */}
                      <button
                        onClick={() => openWhatsAppWithCourse(course)}
                        className="w-full py-1.5 text-[11px] text-[#075E54] hover:bg-emerald-50 font-bold rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>হোয়াটসঅ্যাপে ডিসকাউন্ট চান</span>
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Class FAQs & Consultation Banner */}
        <div className="bg-gradient-to-r from-red-50 via-slate-50 to-amber-50 p-6 sm:p-8 rounded-3xl border border-red-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-black text-slate-900 text-lg sm:text-xl flex items-center justify-center md:justify-start gap-2">
              <HelpCircle className="w-5 h-5 text-[#EA1D2C]" />
              <span>{currentClassInfo.shortTitle} এ ভর্তির বিষয়ে কোনো প্রশ্ন আছে?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              সঠিক ব্যাচ নির্বাচন, সিলেবাস ও অতিরিক্ত ডিসকাউন্ট কুপন পেতে আমাদের সার্বক্ষণিক হোয়াটসঅ্যাপ অ্যাডভাইজরের সহায়তা নিন।
            </p>
          </div>

          <button
            onClick={() => {
              openWhatsAppWithCourse(
                undefined,
                `আসসালামু আলাইকুম! আমি "${currentClassInfo.title}" সম্পর্কে সরাসরি পরামর্শ নিতে চাই।`
              );
            }}
            className="px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer shrink-0 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>সরাসরি হোয়াটসঅ্যাপে কথা বলুন</span>
          </button>
        </div>

      </div>

    </div>
  );
};
