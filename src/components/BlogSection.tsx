import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { BlogPost, Course } from '../types';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  BookOpen, 
  Share2, 
  Check, 
  Tag, 
  Sparkles,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { CourseCard } from './CourseCard';

export const BlogSection: React.FC = () => {
  const { 
    blogPosts, 
    activeBlogForDetail, 
    setActiveBlogForDetail, 
    courses, 
    openWhatsAppWithCourse,
    setActiveCourseForDetail
  } = useCourse();

  const [copiedLink, setCopiedLink] = useState(false);

  // Single Blog Post Full View
  if (activeBlogForDetail) {
    const relatedCourses = courses.filter(c => 
      activeBlogForDetail.relatedCourseIds.includes(c.id)
    );

    const handleCopy = () => {
      const url = `${window.location.origin}/#blog-${activeBlogForDetail.slug || activeBlogForDetail.id}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    };

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in">
        
        {/* Back button & Action */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveBlogForDetail(null)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#D62B3B] bg-white hover:bg-red-50 px-4 py-2 rounded-2xl border border-slate-100 transition shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>সকল ব্লগ আর্টিকেলে ফিরে যান</span>
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 transition shadow-2xs"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'কপি হয়েছে' : 'শেয়ার'}</span>
          </button>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-red-50 text-[#D62B3B] text-xs font-bold px-3 py-1 rounded-full border border-red-100">
              {activeBlogForDetail.category}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeBlogForDetail.readTime} পড়ার সময়</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            {activeBlogForDetail.title}
          </h1>

          <div className="flex items-center gap-3 pt-2 text-xs sm:text-sm text-slate-500 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <User className="w-4 h-4 text-[#D62B3B]" />
              <span>{activeBlogForDetail.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{activeBlogForDetail.date}</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="aspect-16/9 rounded-3xl overflow-hidden bg-slate-100 shadow-sm border border-slate-100">
          <img
            src={activeBlogForDetail.coverImage}
            alt={`${activeBlogForDetail.title} - ১০ মিনিট স্কুল গাইড ও আর্টিকেল`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed space-y-4 text-slate-700 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-2xs">
          <div className="whitespace-pre-line leading-loose font-normal">
            {activeBlogForDetail.content}
          </div>
        </div>

        {/* Related Embedded Courses (Requirement #2 Demonstration) */}
        {relatedCourses.length > 0 && (
          <div className="bg-red-50/50 p-6 rounded-3xl border border-red-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D62B3B]" />
                <span>এই আর্টিকেলের সাথে সম্পর্কিত ১০ মিনিট স্কুলের কোর্সসমূহ:</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedCourses.map(course => (
                <CourseCard key={course.id} course={course} compact />
              ))}
            </div>
          </div>
        )}

      </div>
    );
  }

  // Blog Posts List View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-red-50 text-[#D62B3B] text-xs font-bold px-3 py-1 rounded-full border border-red-100">
          <BookOpen className="w-3.5 h-3.5" />
          <span>কোর্স গাইড ও ক্যারিয়ার টিপস</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          ১০ মিনিট স্কুল কোর্স নির্দেশিকা ও এসইও ব্লগ
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          সঠিক কোর্স নির্বাচন, পরীক্ষার প্রস্তুতি এবং স্কিল ডেভেলপমেন্টের সেরা কৌশল জানুন
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => setActiveBlogForDetail(post)}
            className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col group cursor-pointer"
          >
            <div className="aspect-16/10 bg-slate-100 overflow-hidden relative">
              <img
                src={post.coverImage}
                alt={`${post.title} | 10MinCourse ব্লগ`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                {post.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-[#D62B3B] transition leading-snug line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#D62B3B] group-hover:text-[#bd2332]">
                <span>পুরো আর্টিকেল পড়ুন</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
