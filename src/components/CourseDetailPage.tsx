import React, { useState, useEffect } from 'react';
import { useCourse } from '../context/CourseContext';
import { Course } from '../types';
import { 
  Check, 
  Copy, 
  ExternalLink, 
  MessageCircle, 
  Star, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ArrowLeft, 
  Share2, 
  Tag, 
  ShieldCheck, 
  Users, 
  Video, 
  FileText, 
  HelpCircle,
  Award,
  Calendar,
  Sparkles,
  Zap,
  Flame,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { formatBDT, isOfferActive, isCourseExpired, getCurrentPrice, toBengaliNumber } from '../utils/courseUtils';
import { CourseCard } from './CourseCard';

interface Props {
  course: Course;
  onBack: () => void;
}

export const CourseDetailPage: React.FC<Props> = ({ course, onBack }) => {
  const { 
    openWhatsAppWithCourse, 
    courses, 
    openCoursePage, 
    setActiveView, 
    setSelectedCategory 
  } = useCourse();

  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  const offerActive = isOfferActive(course);
  const currentPrice = getCurrentPrice(course);

  // SEO: Update page title and description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${course.title} - ১০ মিনিট স্কুল ডিসকাউন্ট ফি ও সিলেবাস | 10MinCourse`;
    
    // Inject or update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    const previousDesc = metaDesc.getAttribute('content') || '';
    const descContent = course.metaDescription || `${course.title} - ইন্সট্রাক্টর ${course.instructor}। বিশেষ ছাড়ের মূল্য ${formatBDT(currentPrice)}। প্রোমোকোড ${course.couponCode || 'PROMO10'} দিয়ে অতিরিক্ত ছাড় পান।`;
    metaDesc.setAttribute('content', descContent);

    // Add structured schema data for SEO
    const scriptId = 'course-seo-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": course.title,
      "description": course.metaDescription || course.shortDescription || course.fullDescription,
      "provider": {
        "@type": "Organization",
        "name": "10 Minute School",
        "sameAs": "https://10minuteschool.com"
      },
      "instructor": {
        "@type": "Person",
        "name": course.instructor,
        "jobTitle": course.instructorTitle
      },
      "offers": {
        "@type": "Offer",
        "price": currentPrice,
        "priceCurrency": "BDT",
        "category": course.categoryName,
        "availability": "https://schema.org/InStock",
        "url": course.affiliateUrl
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": course.rating,
        "reviewCount": course.reviewCount
      }
    };
    script.textContent = JSON.stringify(schemaData);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.title = originalTitle;
      if (metaDesc) metaDesc.setAttribute('content', previousDesc);
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();
    };
  }, [course, currentPrice]);

  // Offer Countdown Timer
  useEffect(() => {
    if (!course.offerExpiryDate) return;

    const calculateTime = () => {
      const diff = new Date(course.offerExpiryDate!).getTime() - new Date().getTime();
      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [course.offerExpiryDate]);

  const handleCopyCoupon = () => {
    if (!course.couponCode) return;
    navigator.clipboard.writeText(course.couponCode);
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: `${course.title} - ১০ মিনিট স্কুলের সেরা কোর্স ও সর্বোচ্চ স্পেশাল ছাড়ের লিংক!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  // Related courses in the same category
  const relatedCourses = courses
    .filter(c => c.id !== course.id && (c.category === course.category || c.tags.some(t => course.tags.includes(t))))
    .slice(0, 3);

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Top Breadcrumbs & Back Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          
          <div className="flex items-center gap-2 text-slate-500">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-1.5 font-bold text-slate-700 hover:text-[#D62B3B] transition px-2.5 py-1 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>সকল কোর্সে ফিরে যান</span>
            </button>
            <span>/</span>
            <button 
              onClick={() => {
                setSelectedCategory(course.category);
                onBack();
              }}
              className="hover:text-[#D62B3B] transition font-medium truncate max-w-[120px] sm:max-w-none"
            >
              {course.categoryName}
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[150px] sm:max-w-xs">{course.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl transition text-xs"
              title="এই কোর্সের লিংক শেয়ার করুন"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-600" />
              <span>{shareSuccess ? 'লিংক কপি হয়েছে!' : 'শেয়ার করুন'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8">
        
        {/* Top Hero Overview Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (8 cols): Title, Instructor, Video/Thumbnail, Key Highlights */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Title & Metadata Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-red-50 text-[#D62B3B] border border-red-200 text-xs font-black px-3 py-1 rounded-full uppercase">
                  {course.categoryName}
                </span>
                {course.badge && (
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>{course.badge}</span>
                  </span>
                )}
                {offerActive && (
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black px-3 py-1 rounded-full animate-pulse">
                    ⚡ বিশেষ ছাড় চলছে
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                {course.title}
              </h1>

              {course.subtitle && (
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {course.subtitle}
                </p>
              )}

              {/* Instructor & Rating Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100 text-xs sm:text-sm">
                
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-black flex items-center justify-center text-sm ring-2 ring-red-100">
                    {course.instructor.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{course.instructor}</div>
                    <div className="text-slate-500 text-[11px]">{course.instructorTitle}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-amber-500 font-bold bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{course.rating}</span>
                  <span className="text-slate-400 text-xs font-normal">({course.reviewCount.toLocaleString()} রিভিউ)</span>
                </div>

                <div className="flex items-center gap-1 text-slate-600 font-medium">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{course.enrolledCount.toLocaleString()}+ শিক্ষার্থী যুক্ত</span>
                </div>

              </div>

            </div>

            {/* Course Thumbnail / Video Banner */}
            <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-md relative group">
              <img
                src={course.thumbnail}
                alt={course.imageAlt || `${course.title} - ${course.instructor} | ১০ মিনিট স্কুল কোর্স সিলেবাস ও ভর্তি`}
                className="w-full h-64 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <div className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-lg">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>১০ মিনিট স্কুল অফিসিয়াল ভেরিফায়েড কোর্স</span>
                  </div>
                  <p className="text-xs text-slate-200">কোর্স শেষ করলে ভেরিফায়েড সার্টিফিকেট প্রদান করা হবে</p>
                </div>
              </div>
            </div>

            {/* Course Highlights & Features Pill Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D62B3B]" />
                <span>কোর্সের মূল সুবিধাসমূহ (What You'll Get)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {course.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">{feat}</span>
                  </div>
                ))}
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <Video className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {course.totalVideos ? `${toBengaliNumber(course.totalVideos)}টি রেকর্ডেড ভিডিও লেকচার` : 'পূর্ণাঙ্গ ভিডিও লেকচার'}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <Clock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {course.isLifetime ? 'আজীবন অ্যাক্সেস (Lifetime Access)' : 'পূর্ণাঙ্গ মেয়াদের অ্যাক্সেস'}
                  </span>
                </div>
              </div>
            </div>

            {/* Full Detailed Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#D62B3B]" />
                <span>কোর্সের পূর্ণাঙ্গ বিবরণ ও গাইড</span>
              </h2>
              
              <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 space-y-3 whitespace-pre-line">
                {course.fullDescription || course.shortDescription}
              </div>
            </div>

            {/* Syllabus & Course Curriculum Accordion */}
            {course.syllabus && course.syllabus.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>কোর্স সিলেবাস ও মডিউল তালিকা</span>
                  </h2>
                  <span className="text-xs text-slate-500 font-semibold">{course.syllabus.length}টি মডিউল</span>
                </div>

                <div className="space-y-2.5 pt-2">
                  {course.syllabus.map((mod, idx) => {
                    const isOpen = openModuleIndex === idx;
                    return (
                      <div 
                        key={idx}
                        className="border border-slate-200 rounded-2xl overflow-hidden transition"
                      >
                        <button
                          onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                          className="w-full p-4 text-left flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-black flex items-center justify-center">
                              {toBengaliNumber(idx + 1)}
                            </span>
                            <span className="font-bold text-xs sm:text-sm text-slate-900">{mod.moduleTitle}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <span>{toBengaliNumber(mod.lessonsCount)}টি লেসন</span>
                            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </button>

                        {isOpen && mod.topics && (
                          <div className="p-4 bg-white border-t border-slate-100 space-y-2 text-xs text-slate-600">
                            {mod.topics.map((top, tIdx) => (
                              <div key={tIdx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D62B3B]"></span>
                                <span>{top}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Course FAQ Section */}
            {course.faqs && course.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-500" />
                  <span>কোর্স সম্পর্কিত সাধারণ প্রশ্নোত্তর (FAQ)</span>
                </h2>

                <div className="space-y-3 pt-2">
                  {course.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                        <span className="text-[#D62B3B]">প্রশ্ন:</span>
                        <span>{faq.question}</span>
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed pl-8">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column (4 cols): Sticky Checkout & Affiliate Box */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Main Buy & Discount Widget Box */}
            <div className="bg-white rounded-3xl p-6 border-2 border-red-500/20 shadow-xl space-y-5">
              
              {/* Offer Timer Banner if Active */}
              {offerActive && timeLeft && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-black text-[#D62B3B]">
                    <Flame className="w-4 h-4 animate-bounce" />
                    <span>বিশেষ অফার শেষ হতে বাকি</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm font-black font-mono text-slate-900">
                    <span className="bg-white px-2 py-1 rounded-lg border shadow-xs">{timeLeft.hours} ঘণ্টা</span>
                    <span>:</span>
                    <span className="bg-white px-2 py-1 rounded-lg border shadow-xs">{timeLeft.minutes} মিনিট</span>
                    <span>:</span>
                    <span className="bg-white px-2 py-1 rounded-lg border shadow-xs text-red-600">{timeLeft.seconds} সেকেন্ড</span>
                  </div>
                </div>
              )}

              {/* Price Details */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase">কোর্স ফি ও স্পেশাল অফার</div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {formatBDT(currentPrice)}
                  </span>
                  {course.offerPrice && course.offerPrice < course.regularPrice && (
                    <span className="text-base text-slate-400 line-through font-semibold">
                      {formatBDT(course.regularPrice)}
                    </span>
                  )}
                  {course.discountPercentage && (
                    <span className="text-xs bg-green-100 text-green-700 font-black px-2.5 py-0.5 rounded-full">
                      {course.discountPercentage}% ছাড়
                    </span>
                  )}
                </div>
              </div>

              {/* Coupon Code Copy Box */}
              {course.couponCode && (
                <div className="bg-slate-50 border border-dashed border-red-300 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-[#D62B3B]" />
                      <span>প্রমো কুপন কোড:</span>
                    </span>
                    <span className="text-[11px] text-green-600 font-bold">স্পেশাল এক্সট্রা ছাড়</span>
                  </div>

                  <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-2">
                    <span className="font-mono font-black text-sm text-[#D62B3B] tracking-wider pl-2">
                      {course.couponCode}
                    </span>
                    <button
                      onClick={handleCopyCoupon}
                      className="flex items-center gap-1 text-xs font-bold bg-slate-900 hover:bg-black text-white px-3 py-1.5 rounded-lg transition active:scale-95"
                    >
                      {copiedCoupon ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-400" />
                          <span>কপি হয়েছে</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>কপি করুন</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Main Primary Buy Affiliate Button */}
              <div className="space-y-2.5 pt-1">
                <a
                  href={course.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#D62B3B] hover:bg-[#bd2332] text-white py-3.5 px-6 rounded-2xl font-black text-base shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition transform active:scale-98 text-center cursor-pointer"
                >
                  <span>কোর্স কিনুন</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => openWhatsAppWithCourse(course, `আমি "${course.title}" কোর্সটিতে অতিরিক্ত ছাড়ের লিংক এবং সহায়তা চাই।`)}
                  className="w-full bg-[#25D366] hover:bg-[#20b859] text-white py-3 px-4 rounded-2xl font-bold text-sm shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition transform active:scale-98 text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp এ স্পেশাল ডিসকাউন্ট লিংক নিন</span>
                </button>
              </div>

              {/* Guarantee & Trust Badges */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>১০০% অফিসিয়াল ১০ মিনিট স্কুল পেমেন্ট ও এনরোলমেন্ট</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>পেমেন্টের সাথে সাথে ইনস্ট্যান্ট অ্যাক্সেস</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>কোর্স শেষে অফিসিয়াল ভেরিফায়েড সার্টিফিকেট</span>
                </div>
              </div>

            </div>

            {/* Direct Mentor Contact Assistance Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-3">
              <h4 className="font-bold text-sm flex items-center gap-2 text-amber-300">
                <Sparkles className="w-4 h-4" />
                <span>কোর্স নিয়ে দ্বিধাদ্বন্দ্বে আছেন?</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                আপনার ক্যারিয়ার লক্ষ্য অনুযায়ী কোন কোর্সটি সেরা হবে তা জানতে সরাসরি আমাদের কোর্স অ্যাডভাইজরকে হোয়াটসঅ্যাপে মেসেজ দিন।
              </p>
              <button
                onClick={() => openWhatsAppWithCourse(course, `আমি "${course.title}" কোর্সটি সম্পর্কে ফ্রি কাউন্সেলিং চাই।`)}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-2.5 rounded-xl font-bold text-xs transition"
              >
                ফ্রি কাউন্সেলিং চ্যাট শুরু করুন →
              </button>
            </div>

          </div>

        </div>

        {/* Related Courses Section */}
        {relatedCourses.length > 0 && (
          <section className="pt-10 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  একই ক্যাটাগরির অন্যান্য জনপ্রিয় কোর্স
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  শিক্ষার্থীদের আরও বেশি পছন্দের কোর্স তালিকা
                </p>
              </div>

              <button
                onClick={onBack}
                className="text-xs font-bold text-[#D62B3B] hover:underline"
              >
                সকল কোর্স দেখুন →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((relCourse) => (
                <CourseCard
                  key={relCourse.id}
                  course={relCourse}
                  onSelect={(c) => openCoursePage(c)}
                />
              ))}
            </div>
          </section>
        )}

      </div>

    </article>
  );
};
