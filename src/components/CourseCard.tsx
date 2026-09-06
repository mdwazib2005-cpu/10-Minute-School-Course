import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { useCourse } from '../context/CourseContext';
import { 
  isOfferActive, 
  getCurrentPrice, 
  getDiscountPercentage, 
  formatBDT, 
  toBengaliNumber, 
  getTimeRemaining 
} from '../utils/courseUtils';
import { 
  Star, 
  Clock, 
  ArrowUpRight, 
  Flame, 
  Tag, 
  Check
} from 'lucide-react';
import { OfficialWhatsAppIcon } from './FakeWhatsAppWidget';

interface CourseCardProps {
  course: Course;
  compact?: boolean;
  onSelect?: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, compact = false, onSelect }) => {
  const { openWhatsAppWithCourse, openCoursePage } = useCourse();
  
  const handleOpenDetail = () => {
    if (onSelect) {
      onSelect(course);
    } else {
      openCoursePage(course);
    }
  };
  
  const [timeRemaining, setTimeRemaining] = useState(() => 
    getTimeRemaining(course.offerExpiryDate)
  );

  const offerActive = isOfferActive(course);
  const currentPrice = getCurrentPrice(course);
  const discountPercent = getDiscountPercentage(course);

  useEffect(() => {
    if (!course.offerExpiryDate || !offerActive) return;

    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(course.offerExpiryDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [course.offerExpiryDate, offerActive]);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full group overflow-hidden relative select-none">
      
      {/* Top Media & Badges */}
      <div 
        onClick={handleOpenDetail}
        className="relative aspect-video bg-slate-100 overflow-hidden cursor-pointer shrink-0"
      >
        <img
          src={course.thumbnail}
          alt={course.imageAlt || `${course.title} - ${course.instructor} | ১০ মিনিট স্কুল কোর্স`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
          {course.badge && (
            <span className="inline-flex items-center gap-0.5 bg-[#D62B3B] text-white text-[9px] sm:text-[11px] font-bold px-1.5 sm:px-2.5 py-0.5 rounded-full shadow-xs">
              <Flame className="w-2.5 h-2.5 text-amber-300" />
              <span>{course.badge}</span>
            </span>
          )}
          {offerActive && discountPercent > 0 && (
            <span className="bg-amber-400 text-slate-950 text-[9px] sm:text-[11px] font-black px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs">
              {toBengaliNumber(discountPercent)}% ছাড়
            </span>
          )}
        </div>

        {/* Category Pill in top right */}
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[9px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full">
            {course.categoryName}
          </span>
        </div>

        {/* Countdown Ribbon if limited offer */}
        {offerActive && course.offerExpiryDate && !timeRemaining.isExpired && (
          <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-[#D62B3B]/95 backdrop-blur-xs text-white text-[9px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-lg flex items-center justify-between shadow-xs">
            <span className="flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 animate-spin" />
              <span className="hidden sm:inline">অফার বাকি:</span>
            </span>
            <span className="font-bold text-amber-300">
              {timeRemaining.formattedBengali}
            </span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          
          {/* Instructor & Rating on desktop / tablet */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 mb-1 gap-1">
            <span className="font-medium text-slate-700 truncate max-w-[65%]">
              {course.instructor}
            </span>
            <div className="flex items-center gap-0.5 text-amber-500 font-bold shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{course.rating}</span>
            </div>
          </div>

          {/* Title matching Reference: 2-line clamp, aligned min-height */}
          <h3 
            onClick={handleOpenDetail}
            className="font-bold text-xs sm:text-sm lg:text-[15px] text-slate-900 group-hover:text-[#D62B3B] transition-colors line-clamp-2 cursor-pointer leading-snug min-h-[2.3rem] sm:min-h-[2.6rem] mb-1"
          >
            {course.title}
          </h3>

          {/* Subtitle / Description with aligned min-height */}
          <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-1 sm:line-clamp-2 min-h-[1.1rem] sm:min-h-[1.9rem] mb-2 leading-relaxed">
            {course.subtitle || course.shortDescription}
          </p>

          {/* Key Feature Perks (only on larger screens if not compact) */}
          {!compact && course.features && course.features.length > 0 && (
            <div className="hidden sm:block space-y-1 mb-2.5 pt-1.5 border-t border-slate-100">
              {course.features.slice(0, 1).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-1 text-xs text-slate-600">
                  <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Call-to-Actions */}
        <div className="pt-2 border-t border-slate-100 mt-auto">
          
          {/* Price Row: Green current price and strikethrough regular price */}
          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-sm sm:text-lg font-black text-emerald-600 tracking-tight">
                {formatBDT(currentPrice)}
              </span>
              {offerActive && course.offerPrice && (
                <span className="text-[10px] sm:text-xs text-slate-400 line-through font-normal">
                  {formatBDT(course.regularPrice)}
                </span>
              )}
            </div>

            <button
              onClick={handleOpenDetail}
              className="text-[10px] sm:text-xs text-slate-400 hover:text-slate-800 font-semibold cursor-pointer underline-offset-2 hover:underline"
            >
              বিস্তারিত
            </button>
          </div>

          {/* Action Buttons: Unified responsive design */}
          <div className="flex items-center gap-1.5">
            
            {/* Direct Affiliate Buy CTA */}
            <a
              href={course.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#1877F2] hover:bg-[#166fe5] active:bg-[#0d59b8] text-white text-xs sm:text-sm font-bold py-2 sm:py-2.5 px-2 rounded-xl shadow-xs transition flex items-center justify-center gap-1 cursor-pointer active:scale-95 text-center whitespace-nowrap"
              title="কোর্সটিতে সরাসরি ভর্তি হোন"
            >
              <span>ভর্তি হোন</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </a>

            {/* WhatsApp Question / Discount Help */}
            <button
              type="button"
              onClick={() => openWhatsAppWithCourse(course)}
              className="p-2 sm:p-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 active:bg-[#25D366]/30 text-[#128C7E] hover:text-[#075E54] border border-[#25D366]/30 rounded-xl transition flex items-center justify-center shrink-0 cursor-pointer active:scale-95 shadow-2xs"
              title="হোয়াটসঅ্যাপে ডিসকাউন্ট কুপন ও হেল্প নিন"
              aria-label="WhatsApp Discount Support"
            >
              <OfficialWhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

