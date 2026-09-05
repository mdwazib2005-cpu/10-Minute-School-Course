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
  X, 
  Star, 
  Users, 
  Clock, 
  CheckCircle2, 
  Copy, 
  Check, 
  MessageCircle, 
  ArrowUpRight, 
  BookOpen, 
  Flame, 
  HelpCircle, 
  Share2,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course, onClose }) => {
  const { openWhatsAppWithCourse } = useCourse();
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Time remaining ticker
  const [timeRemaining, setTimeRemaining] = useState(() => 
    getTimeRemaining(course?.offerExpiryDate)
  );

  useEffect(() => {
    if (!course?.offerExpiryDate) return;
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(course.offerExpiryDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [course?.offerExpiryDate]);

  if (!course) return null;

  const offerActive = isOfferActive(course);
  const currentPrice = getCurrentPrice(course);
  const discountPercent = getDiscountPercentage(course);

  const copyCouponCode = () => {
    if (course.couponCode) {
      navigator.clipboard.writeText(course.couponCode);
      setCopiedCoupon(true);
      setTimeout(() => setCopiedCoupon(false), 2500);
    }
  };

  const copyCourseLink = () => {
    const url = `${window.location.origin}/#course-${course.slug || course.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative my-6 max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="bg-[#D62B3B] text-white text-xs font-bold px-3 py-1 rounded-full">
              {course.categoryName}
            </span>
            <span className="text-xs text-slate-300 hidden sm:inline">১০ মিনিট স্কুল অফিসিয়াল অ্যাফিলিয়েট</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyCourseLink}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition"
              title="এই কোর্সের সরাসরি লিংক কপি করুন"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'কপি হয়েছে' : 'লিংক শেয়ার'}</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-1.5 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          
          {/* Top Banner & Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Thumbnail preview */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-slate-100 aspect-16/9 lg:aspect-auto border border-slate-100">
              <img
                src={course.thumbnail}
                alt={course.imageAlt || `${course.title} - ${course.instructor}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {offerActive && discountPercent > 0 && (
                <div className="absolute top-3 left-3 bg-[#D62B3B] text-white text-xs font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-300" />
                  <span>{toBengaliNumber(discountPercent)}% মেগা ছাড়!</span>
                </div>
              )}
            </div>

            {/* Title & Core Details */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {course.title}
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  {course.subtitle || course.shortDescription}
                </p>

                {/* Instructor Card */}
                <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  {course.instructorImage ? (
                    <img
                      src={course.instructorImage}
                      alt={`${course.instructor} - কোর্স শিক্ষক`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-red-100 text-[#D62B3B] font-bold flex items-center justify-center text-lg">
                      {course.instructor[0]}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{course.instructor}</h4>
                    <p className="text-xs text-slate-500">{course.instructorTitle}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-amber-500 font-bold text-sm flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{toBengaliNumber(course.reviewCount)} রিভিউ</div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-slate-800 font-bold text-sm flex items-center justify-center gap-1">
                      <Users className="w-4 h-4 text-[#D62B3B]" />
                      <span>{toBengaliNumber(course.enrolledCount)}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">শিক্ষার্থী এনরোল্ড</div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-slate-800 font-bold text-sm flex items-center justify-center gap-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{course.totalHours || 'লাইফটাইম'}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{course.totalVideos ? `${toBengaliNumber(course.totalVideos)} ভিডিও` : 'ফুল অ্যাক্সেস'}</div>
                  </div>
                </div>

              </div>

              {/* Price & Checkout Box */}
              <div className="p-4 bg-red-50/60 border border-red-100 rounded-2xl space-y-3">
                
                {/* Countdown banner if active */}
                {offerActive && course.offerExpiryDate && !timeRemaining.isExpired && (
                  <div className="bg-[#D62B3B] text-white text-xs font-bold py-1.5 px-3 rounded-xl flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-300 animate-spin" />
                      <span>অফারের সময়সীমা:</span>
                    </span>
                    <span className="text-amber-200 font-mono">{timeRemaining.formattedBengali}</span>
                  </div>
                )}

                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">কোর্স ফি:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-[#D62B3B]">
                        {formatBDT(currentPrice)}
                      </span>
                      {offerActive && course.offerPrice && (
                        <span className="text-sm text-slate-400 line-through">
                          {formatBDT(course.regularPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {course.couponCode && (
                    <div className="text-right">
                      <span className="text-[11px] text-slate-500 block mb-0.5">স্পেশাল প্রোমোকোড:</span>
                      <button
                        onClick={copyCouponCode}
                        className="inline-flex items-center gap-1 bg-white border border-red-200 hover:border-red-400 text-[#D62B3B] text-xs font-mono font-bold px-2.5 py-1 rounded-xl shadow-2xs transition"
                        title="ক্লিক করে কোড কপি করুন"
                      >
                        {copiedCoupon ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{course.couponCode}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <a
                    href={course.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#D62B3B] hover:bg-[#bd2332] text-white font-bold py-2.5 px-4 rounded-xl text-center shadow-xs transition flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <span>কোর্স কিনুন</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => openWhatsAppWithCourse(course)}
                    className="bg-[#25D366] hover:bg-[#20b859] text-white font-bold py-2.5 px-4 rounded-xl text-center shadow-xs transition flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>হোয়াটসঅ্যাপে ছাড়ের লিংক</span>
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* Key Course Features */}
          {course.features && course.features.length > 0 && (
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D62B3B]" />
                <span>এই কোর্সে যা যা পাচ্ছেন:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {course.features.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-base">কোর্স সম্পর্কে বিস্তারিত:</h3>
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
              {course.fullDescription}
            </div>
          </div>

          {/* Syllabus Modules (if available) */}
          {course.syllabus && course.syllabus.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#D62B3B]" />
                <span>কোর্স কারিকুলাম ও সিলেবাস:</span>
              </h3>
              <div className="space-y-2">
                {course.syllabus.map((mod, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between font-bold text-sm text-slate-800">
                      <span>{mod.moduleTitle}</span>
                      <span className="text-xs text-[#D62B3B] bg-red-50 px-2 py-0.5 rounded-full font-medium">
                        {toBengaliNumber(mod.lessonsCount)}টি পাঠ
                      </span>
                    </div>
                    {mod.topics && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {mod.topics.map((t, tidx) => (
                          <span key={tidx} className="text-xs bg-white text-slate-600 px-2 py-1 rounded-lg border border-slate-200/60">
                            • {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {course.faqs && course.faqs.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#D62B3B]" />
                <span>সাধারণ কিছু প্রশ্নোত্তর (FAQ):</span>
              </h3>
              <div className="space-y-2">
                {course.faqs.map((faq, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50/70 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-sm text-slate-900">প্রশ্ন: {faq.question}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">উত্তর: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
