import React from 'react';
import { useCourse } from '../context/CourseContext';
import { Star, Quote, CheckCircle2, MessageCircle, Sparkles, Award } from 'lucide-react';

export const ReviewSection: React.FC = () => {
  const { reviews, openWhatsAppWithCourse, courses } = useCourse();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>সফল শিক্ষার্থীদের অভিজ্ঞতা</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          ১০ মিনিট স্কুল কোর্স শিক্ষার্থীদের বাস্তব রিভিউ
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          আমাদের ওয়েবসাইট থেকে ডিসকাউন্টে কোর্স নিয়ে হাজারো শিক্ষার্থী তাদের ক্যারিয়ার ও পড়াশোনায় এগিয়ে গেছে
        </p>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between space-y-4 relative"
          >
            <div>
              {/* Rating stars */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400">{rev.date}</span>
              </div>

              {/* Comment */}
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            {/* Student Info */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
              {rev.avatar ? (
                <img
                  src={rev.avatar}
                  alt={rev.studentName}
                  className="w-9 h-9 rounded-full object-cover border border-slate-100"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-red-100 text-[#D62B3B] font-bold flex items-center justify-center text-xs">
                  {rev.studentName[0]}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-xs text-slate-900 truncate flex items-center gap-1">
                  <span>{rev.studentName}</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                </h4>
                <p className="text-[10px] text-slate-500 truncate">{rev.institution}</p>
                <span className="text-[10px] text-[#D62B3B] font-medium block truncate">
                  কোর্স: {rev.courseTitle}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Review CTA Banner */}
      <div className="bg-[#D62B3B] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-black">
            আপনিও কি কোর্স নিয়ে আপনার ক্যারিয়ার গড়তে চান?
          </h3>
          <p className="text-white/80 text-xs sm:text-sm">
            সেরা অফার ও গাইডলাইন পেতে আমাদের সাথে সরাসরি যোগাযোগ করুন।
          </p>
        </div>

        <button
          onClick={() => openWhatsAppWithCourse(undefined, 'আমি কোন কোর্সটি নেব সে বিষয়ে পরামর্শ চাই।')}
          className="bg-white hover:bg-slate-100 text-[#D62B3B] font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-xs transition flex items-center gap-2 shrink-0"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
          <span>ফ্রি পরামর্শ নিন</span>
        </button>
      </div>

    </div>
  );
};
