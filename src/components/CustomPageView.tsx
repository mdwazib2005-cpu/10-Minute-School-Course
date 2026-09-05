import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { CustomPage } from '../types';
import { CourseCard } from './CourseCard';
import { 
  ArrowLeft, 
  Sparkles, 
  MessageCircle, 
  Share2, 
  Check, 
  ExternalLink,
  BookOpen,
  Filter,
  Layers,
  Edit3
} from 'lucide-react';
import { OfficialWhatsAppIcon } from './FakeWhatsAppWidget';

interface CustomPageViewProps {
  page: CustomPage;
}

export const CustomPageView: React.FC<CustomPageViewProps> = ({ page }) => {
  const { 
    courses, 
    activeCourses, 
    setActiveView, 
    openWhatsAppWithCourse,
    isAdminAuthenticated,
    setAdminModalOpen
  } = useCourse();

  const [copied, setCopied] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  // Find all matching courses for this custom page
  const pageCourses = activeCourses.filter(c => 
    page.selectedCourseIds.includes(c.id) || page.selectedCourseIds.includes(c.slug)
  );

  const displayedCourses = pageCourses.filter(c => 
    !filterQuery.trim() || 
    c.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.instructor.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 font-['Hind_Siliguri',sans-serif]">
      
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('home')}
            className="flex items-center gap-1.5 font-bold text-slate-700 hover:text-[#EA1D2C] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>মূল পাতায় ফিরুন</span>
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-md">
            {page.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isAdminAuthenticated && (
            <button
              onClick={() => setAdminModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-xl font-bold hover:bg-amber-100 transition text-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>পেজটি এডিট করুন</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl font-semibold hover:bg-slate-50 transition shadow-2xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">লিংক কপি হয়েছে</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>শেয়ার করুন</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Custom Hero Banner */}
      <div className={`rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-lg bg-gradient-to-r ${
        page.heroBgGradient || 'from-red-600 to-rose-800'
      }`}>
        
        {/* Background Decorative Element */}
        <div className="absolute -right-8 -bottom-10 text-8xl sm:text-9xl opacity-10 select-none pointer-events-none font-black">
          {page.icon || '🎓'}
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          
          <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold">
            <span>{page.icon || '✨'}</span>
            <span>{page.bannerBadge || 'কাস্টম স্পেশাল অফার পেজ'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight">
            {page.title}
          </h1>

          {page.subtitle && (
            <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed">
              {page.subtitle}
            </p>
          )}

          {page.description && (
            <div className="pt-2 text-xs sm:text-sm text-white/80 leading-relaxed border-t border-white/10">
              {page.description}
            </div>
          )}

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => openWhatsAppWithCourse(undefined, `আসসালামু আলাইকুম! আমি "${page.title}" পেজের কোর্সগুলোতে স্পেশাল ডিসকাউন্ট লিংক পেতে চাই।`)}
              className="bg-white hover:bg-slate-100 text-[#D62B3B] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <OfficialWhatsAppIcon className="w-4 h-4" />
              <span>এই পেজের জন্য ডিসকাউন্ট কোড নিন</span>
            </button>

            <span className="text-xs text-white/80 font-medium">
              মোট {pageCourses.length}টি নির্বাচিত কোর্স
            </span>
          </div>

        </div>
      </div>

      {/* Course List Section Header */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#EA1D2C]" />
              <span>এই পেজে অন্তর্ভুক্ত কোর্সসমূহ</span>
              <span className="text-xs bg-red-100 text-[#D62B3B] font-bold px-2.5 py-0.5 rounded-full">
                {displayedCourses.length}টি
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              এডমিন কর্তৃক বিশেষভাবে সাজানো সেরা কোর্স ও অফার সমূহ
            </p>
          </div>

          {pageCourses.length > 3 && (
            <input
              type="text"
              placeholder="এই পেজের কোর্স খুঁজুন..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full sm:w-64 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:border-[#EA1D2C]"
            />
          )}
        </div>

        {/* Display Course Grid - 2 columns on mobile */}
        {displayedCourses.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6 pt-2">
            {displayedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-8 space-y-4 shadow-2xs">
            <div className="text-4xl">📚</div>
            <h3 className="font-bold text-base text-slate-800">
              {pageCourses.length === 0 
                ? 'এই পেজে এখনো কোনো কোর্স যুক্ত করা হয়নি' 
                : 'কোনো কোর্স খুঁজে পাওয়া যায়নি'}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {pageCourses.length === 0
                ? 'এডমিন প্যানেলে গিয়ে "কাস্টম পেজ" ট্যাব থেকে আপনার পছন্দের যেকোনো কোর্স এই পেজে এক ক্লিকে যুক্ত করুন।'
                : 'সার্চ ফিল্টারে অন্য কিছু লিখে চেষ্টা করুন।'}
            </p>
            {isAdminAuthenticated && pageCourses.length === 0 && (
              <button
                onClick={() => setAdminModalOpen(true)}
                className="bg-[#EA1D2C] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs"
              >
                এডমিন প্যানেলে এডিট করুন
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
