import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { CourseCategory } from '../types';
import { CourseCard } from './CourseCard';
import { 
  Sparkles, 
  Flame, 
  Search, 
  Video, 
  ShieldCheck, 
  Award, 
  Zap, 
  HelpCircle, 
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Percent,
  CheckCircle2,
  BookOpen,
  Filter,
  Star,
  Send,
  FileText,
  Clock,
  ChevronRight,
  Tag
} from 'lucide-react';
import { OfficialWhatsAppIcon } from './FakeWhatsAppWidget';
import { BrandLogo } from './BrandLogo';
import { CountdownBanner } from './CountdownBanner';
import { isOfferActive, getCurrentPrice, formatBDT, toBengaliNumber } from '../utils/courseUtils';
import { FAQSection } from './FAQSection';

export const HomeLanding: React.FC = () => {
  const { 
    courses, 
    activeCourses, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery, 
    siteSettings, 
    openWhatsAppWithCourse,
    setActiveView,
    openCoursePage,
    blogPosts,
    blogs,
    reviews,
    setTargetAudienceModalOpen,
    activeCategories,
    customPages,
    openCustomPage
  } = useCourse();

  const handleCategorySelect = (catId: CourseCategory) => {
    setSelectedCategory(catId);
    setTimeout(() => {
      const el = document.getElementById('all-courses-catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Filter courses based on Category and Search Query
  const filteredCourses = activeCourses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Best-selling / Featured courses (3 to 5 courses)
  const bestSellingCourses = courses.filter(c => c.featured).length >= 3 
    ? courses.filter(c => c.featured).slice(0, 5) 
    : courses.slice(0, 5);

  return (
    <div className="space-y-10 pb-16">
      
      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 text-center space-y-3.5">
        
        {/* Trust badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200/60 text-[#D62B3B] text-[11px] sm:text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>১০ মিনিট স্কুল অফিশিয়াল কোর্স ও ভেরিফায়েড ডিসকাউন্ট হাব</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#D62B3B] tracking-tight leading-tight">
          ১০ মিনিট স্কুল কোর্স ডিসকাউন্ট
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 text-xs sm:text-base max-w-xl mx-auto leading-relaxed">
          অনলাইন ব্যাচ, একাডেমি ও এডমিশন সহ সকল কোর্সের অফিশিয়াল ভেরিফায়েড প্রমো কোড ও সর্বোচ্চ ছাড় পেতে আপনার পছন্দের কোর্সটি বেছে নিন।
        </p>

        {/* Offer Countdown Banner */}
        <CountdownBanner />

        {/* Clean Search Bar */}
        <div className="max-w-xl mx-auto pt-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="কোর্স বা বিষয় খুঁজুন (যেমন: HSC 26, এসএসসি, এডমিশন, Spoken)..."
              className="w-full pl-11 pr-24 py-3 bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-2xl text-xs sm:text-sm font-medium focus:outline-hidden focus:border-[#D62B3B] focus:ring-2 focus:ring-red-100 shadow-xs transition"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            {searchQuery ? (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg px-2.5 py-1 font-semibold cursor-pointer"
              >
                মুছুন ✕
              </button>
            ) : (
              <button 
                onClick={() => setTargetAudienceModalOpen(true)}
                className="absolute right-2 top-2 bg-red-50 hover:bg-red-100 text-[#CE1222] text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer active:scale-95"
              >
                ক্লাস সিলেক্টর
              </button>
            )}
          </div>

          {/* Quick Search Chips */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap pt-2.5 text-xs">
            <span className="text-slate-600 text-[11px] font-medium">জনপ্রিয়:</span>
            {['HSC 26', 'ভার্সিটি এডমিশন', 'এসএসসি', 'Spoken English', 'আইইএলটিএস'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                  const el = document.getElementById('all-courses-catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                  searchQuery === term 
                    ? 'bg-[#D62B3B] text-white' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {term}
              </button>
            ))}
          </div>
        </div>

      </section>

      {/* Trust & Metrics 4-Pillars Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              
              <div className="flex items-center gap-3.5 pt-2 md:pt-0">
                <div className="w-11 h-11 rounded-2xl bg-red-50 text-[#D62B3B] flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-black text-slate-900 text-base sm:text-lg">
                    {siteSettings.pillar1Title || '১১০+ কোর্স'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {siteSettings.pillar1Sub || 'সব ক্যাটাগরি এক ছাদের নিচে'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-3 md:pt-0 md:pl-6">
                <div className="w-11 h-11 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <OfficialWhatsAppIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-black text-slate-900 text-base sm:text-lg">
                    {siteSettings.pillar2Title || '২৪/৭ সাপোর্ট'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {siteSettings.pillar2Sub || 'সরাসরি হোয়াটসঅ্যাপ গাইডলাইন'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-3 md:pt-0 md:pl-6">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-black text-slate-900 text-base sm:text-lg">
                    {siteSettings.pillar3Title || 'সর্বোচ্চ স্পেশাল ছাড়'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {siteSettings.pillar3Sub || 'স্পেশাল প্রোমোকোড ও অফার'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-3 md:pt-0 md:pl-6">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-black text-slate-900 text-base sm:text-lg">
                    {siteSettings.pillar4Title || 'গুগল মিট কাউন্সেলিং'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {siteSettings.pillar4Sub || 'সরাসরি মেন্টরদের সাথে কথা'}
                  </div>
                </div>
              </div>

            </div>
          </div>
      </section>

      {/* MAIN COURSE CATALOG & GRID */}
      <section id="all-courses-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6 scroll-mt-20">
        
        {/* Results Header & Quick Category Pills */}
        <div className="space-y-4 pb-3 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <span>
                  {selectedCategory === 'all' 
                    ? (siteSettings.catalogTitle || 'সকল ১০ মিনিট স্কুল কোর্স') 
                    : activeCategories.find(c => c.id === selectedCategory)?.label || 'কোর্স তালিকা'}
                </span>
                <span className="text-xs bg-red-100 text-[#D62B3B] font-bold px-2.5 py-0.5 rounded-full">
                  {filteredCourses.length}টি কোর্স
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {siteSettings.catalogSubtitle || 'সব কোর্সের তথ্য, নিয়মিত দাম ও স্পেশাল অফার সেন্ট্রাল ডেটা থেকে স্বয়ংক্রিয়ভাবে আপডেট হয়'}
              </p>
            </div>

            {/* Reset Filters if Applied */}
            {(selectedCategory !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-[#D62B3B] hover:text-[#bd2332] bg-red-50 px-3.5 py-1.5 rounded-xl transition cursor-pointer"
              >
                ফিল্টার ক্লিয়ার করুন ✕
              </button>
            )}
          </div>

          {/* Quick Category Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {activeCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#D62B3B] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid - 2 columns on mobile matching reference image */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 space-y-4 shadow-2xs">
            <div className="w-14 h-14 rounded-full bg-red-50 text-[#D62B3B] flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="font-bold text-lg text-slate-900">কোনো কোর্স পাওয়া যায়নি</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              "{searchQuery}" এর সাথে মিল রেখে কোনো কোর্স পাওয়া যায়নি। আপনি কি অন্য কোনো কোর্স খুঁজছেন?
            </p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="bg-[#D62B3B] text-white text-xs font-bold px-4 py-2.5 rounded-xl"
              >
                সব কোর্স দেখুন
              </button>
              <button
                onClick={() => openWhatsAppWithCourse(undefined, `আমি "${searchQuery}" কোর্সটি খুঁজছিলাম, এটি কি পাওয়া যাবে?`)}
                className="bg-[#25D366] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <OfficialWhatsAppIcon className="w-3.5 h-3.5" />
                <span>হোয়াটসঅ্যাপে জানান</span>
              </button>
            </div>
          </div>
        )}

      </section>

      {/* WHY BUY FROM 10MINCOURSE TRUST SECTION */}
      <section className="bg-slate-900 text-white py-14 my-10 rounded-3xl max-w-7xl mx-auto px-6 sm:px-8">
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest">
              অফিসিয়াল অ্যাফিলিয়েট বেনিফিট
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {siteSettings.whyTitle || 'কেন 10MinCourse এর মাধ্যমে কোর্স কিনবেন?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {siteSettings.whySubtitle || 'সর্বোচ্চ ডিসকাউন্ট, স্পেশাল প্রোমোকোড ও সরাসরি মেন্টরিং সুবিধা'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">
                {siteSettings.whyBenefit1Title || 'সর্বোচ্চ ক্যাশব্যাক ও প্রমো কোড'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {siteSettings.whyBenefit1Text || '১০ মিনিট স্কুলের সকল গোপন প্রমোশনাল কুপন কোড আমাদের এখানে সবার আগে আপডেট করা হয়।'}
              </p>
            </div>

            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">
                {siteSettings.whyBenefit2Title || 'সরাসরি গুগল মিটে ক্যারিয়ার কাউন্সেলিং'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {siteSettings.whyBenefit2Text || 'কোন কোর্সটি আপনার ক্যারিয়ার বা পরীক্ষার জন্য সঠিক হবে তা নিশ্চিত করতে আমাদের মেন্টরের সাথে লাইভ কথা বলুন।'}
              </p>
            </div>

            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">
                {siteSettings.whyBenefit3Title || 'অফিসিয়াল সার্টিফিকেট ও সাপোর্ট'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {siteSettings.whyBenefit3Text || 'কোর্সটি সরাসরি ১০ মিনিট স্কুলের আসল পোর্টালে যুক্ত হবে এবং কোর্স শেষে অফিসিয়াল ভেরিফায়েড সার্টিফিকেট পাবেন।'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection />

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 pt-12 pb-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="space-y-3 md:col-span-2">
              <BrandLogo />
              <p className="text-slate-600 max-w-sm leading-relaxed pt-2">
                {siteSettings.footerAboutText || '১০ মিনিট স্কুলের বিশ্বস্ত অ্যাফিলিয়েট পার্টনার পোর্টাল। শিক্ষার্থীদের পড়াশোনা, ভর্তি ও ক্যারিয়ার স্কিল ডেভেলপমেন্টে সঠিক কোর্স নির্বাচনে এবং সর্বোচ্চ ডিসকাউন্ট পেতে আমরা সার্বক্ষণিক সহায়তা করে থাকি।'}
              </p>
              <p className="text-[11px] text-slate-400">
                {siteSettings.footerDisclaimerText || 'দাবিত্যাগ: এই ওয়েবসাইটটি ১০ মিনিট স্কুলের একটি অনুমোদিত অ্যাফিলিয়েট তথ্য প্ল্যাটফর্ম। সকল কোর্স মেটেরিয়াল ও পেমেন্ট সরাসরি ১০ মিনিট স্কুল কর্তৃক পরিচালিত হয়।'}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">গুরুত্বপূর্ণ লিংক ও পেজ</h4>
              <ul className="space-y-1.5">
                <li><button onClick={() => { setActiveView('courses'); setSelectedCategory('all'); }} className="hover:text-[#D62B3B] cursor-pointer">সকল কোর্স</button></li>
                <li><button onClick={() => { setActiveView('courses'); setSelectedCategory('language'); }} className="hover:text-[#D62B3B] cursor-pointer">স্পোকেন ইংলিশ কোর্স</button></li>
                <li><button onClick={() => { setActiveView('courses'); setSelectedCategory('hsc'); }} className="hover:text-[#D62B3B] cursor-pointer">এইচএসসি ক্র্যাশ কোর্স</button></li>
                <li><button onClick={() => { setActiveView('courses'); setSelectedCategory('admission'); }} className="hover:text-[#D62B3B] cursor-pointer">এডমিশন ও মেডিকেল</button></li>
                {customPages && customPages.filter(p => p.showInFooter).map(p => (
                  <li key={p.id}>
                    <button 
                      onClick={() => openCustomPage(p)} 
                      className="hover:text-[#D62B3B] font-medium text-slate-700 cursor-pointer flex items-center gap-1"
                    >
                      <span>{p.icon || '📄'}</span>
                      <span>{p.title}</span>
                    </button>
                  </li>
                ))}
                <li><button onClick={() => setActiveView('blogs')} className="hover:text-[#D62B3B] cursor-pointer">গাইড ও ব্লগ</button></li>
                <li><button onClick={() => setActiveView('reviews')} className="hover:text-[#D62B3B] cursor-pointer">শিক্ষার্থী রিভিউ</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">যোগাযোগ ও হেল্প</h4>
              <p className="text-slate-600">যেকোনো প্রশ্ন বা স্পেশাল ডিসকাউন্ট লিংকের জন্য সরাসরি যোগাযোগ করুন:</p>
              <div className="pt-1 space-y-2">
                <button
                  onClick={() => openWhatsAppWithCourse()}
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-xl font-bold shadow-xs hover:bg-[#20b859] transition cursor-pointer"
                >
                  <OfficialWhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp চ্যাট</span>
                </button>
                {siteSettings.contactPhone && (
                  <div className="text-[11px] text-slate-500 pt-1">
                    📞 হটলাইন: <span className="font-bold text-slate-700">{siteSettings.contactPhone}</span>
                  </div>
                )}
                {siteSettings.contactEmail && (
                  <div className="text-[11px] text-slate-500">
                    ✉️ ইমেইল: <span className="font-bold text-slate-700">{siteSettings.contactEmail}</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <p className="flex items-center gap-1">
              <span>{siteSettings.footerCopyrightText || `© ${new Date().getFullYear()} 10MinCourse.com - ১০ মিনিট স্কুল অনুমোদিত স্বাধীন অ্যাফিলিয়েট পোর্টাল। সর্বস্বত্ব সংরক্ষিত।`}</span>
              {/* Ultra discreet lock indicator for site owner */}
              <button 
                onClick={() => { window.location.hash = '#admin-portal'; }} 
                className="opacity-20 hover:opacity-100 transition p-0.5 ml-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                title="Admin Gateway (Ctrl+Shift+A)"
              >
                •
              </button>
            </p>
            <div className="flex items-center gap-4">
              <span>10 Minute School Affiliate Program Partner</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
