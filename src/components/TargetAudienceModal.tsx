import React from 'react';
import { useCourse } from '../context/CourseContext';
import { CourseCategory } from '../types';
import { Sparkles, GraduationCap, X, CheckCircle2, ArrowRight } from 'lucide-react';

export const TargetAudienceModal: React.FC = () => {
  const { 
    targetAudienceModalOpen, 
    setTargetAudienceModalOpen, 
    setSelectedCategory, 
    setActiveView 
  } = useCourse();

  if (!targetAudienceModalOpen) return null;

  const targetOptions: { 
    id: CourseCategory; 
    title: string; 
    subtitle: string; 
    icon: string; 
    bgAccent: string;
    borderAccent: string;
  }[] = [
    {
      id: 'language',
      title: 'স্পোকেন ইংলিশ ও ভাষা শিক্ষা',
      subtitle: 'দৈনন্দিন ইংরেজিতে ফ্লুয়েন্ট কথা বলা ও IELTS প্রস্তুতি',
      icon: '🗣️',
      bgAccent: 'hover:bg-red-50/70',
      borderAccent: 'hover:border-red-200'
    },
    {
      id: 'hsc',
      title: 'এইচএসসি (HSC 2025 / 2026)',
      subtitle: 'বিজ্ঞান, মানবিক ও বাণিজ্য বিভাগের ক্র্যাশ কোর্স ও রিভিশন',
      icon: '🏆',
      bgAccent: 'hover:bg-amber-50/70',
      borderAccent: 'hover:border-amber-200'
    },
    {
      id: 'admission',
      title: 'বিশ্ববিদ্যালয় ও মেডিকেল ভর্তি',
      subtitle: 'ঢাবি, বুয়েট, মেডিকেল ও গুচ্ছ এডমিশনের চূড়ান্ত প্রস্তুতি',
      icon: '🏛️',
      bgAccent: 'hover:bg-emerald-50/70',
      borderAccent: 'hover:border-emerald-200'
    },
    {
      id: 'skill',
      title: 'স্কিল ডেভেলপমেন্ট ও ফ্রিল্যান্সিং',
      subtitle: 'গ্রাফিক ডিজাইন, ডিজিটাল মার্কেটিং, ওয়েব ডেভেলপমেন্ট',
      icon: '💻',
      bgAccent: 'hover:bg-blue-50/70',
      borderAccent: 'hover:border-blue-200'
    },
    {
      id: 'class-9-10',
      title: 'ক্লাস ৯-১০ ও এসএসসি (SSC)',
      subtitle: 'এসএসসি পরীক্ষার সম্পূর্ণ সিলেবাস ও বোর্ড প্রশ্ন সমাধান',
      icon: '📚',
      bgAccent: 'hover:bg-indigo-50/70',
      borderAccent: 'hover:border-indigo-200'
    },
    {
      id: 'class-6-8',
      title: 'ক্লাস ৬ থেকে ৮ (নতুন কারিকুলাম)',
      subtitle: 'মজার অ্যানিমেশন ও সহজ কনসেপ্টে প্রতিটি বইয়ের পড়া',
      icon: '🎒',
      bgAccent: 'hover:bg-purple-50/70',
      borderAccent: 'hover:border-purple-200'
    },
    {
      id: 'job-prep',
      title: 'বিসিএস ও সরকারি চাকরি প্রস্তুতি',
      subtitle: 'প্রিলি ও রিটেনের ক্যাডারভিত্তিক পুর্নাঙ্গ প্রস্তুতি',
      icon: '👔',
      bgAccent: 'hover:bg-teal-50/70',
      borderAccent: 'hover:border-teal-200'
    },
    {
      id: 'kids',
      title: 'ছোটদের কোর্স (Kids Phonics)',
      subtitle: 'ছবি, গান ও খেলার ছলে সঠিক উচ্চারণ ও ইংরেজি শেখা',
      icon: '👶',
      bgAccent: 'hover:bg-pink-50/70',
      borderAccent: 'hover:border-pink-200'
    }
  ];

  const handleSelect = (category: CourseCategory) => {
    setSelectedCategory(category);
    setTargetAudienceModalOpen(false);
    setActiveView('courses');
  };

  const handleExploreAll = () => {
    setSelectedCategory('all');
    setTargetAudienceModalOpen(false);
    setActiveView('courses');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleExploreAll}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full p-1.5 transition z-10"
          title="সব কোর্স দেখুন"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-[#D62B3B] p-6 text-white text-center relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>স্মার্ট কোর্স রিকমেন্ডেশন</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            স্বাগতম! আপনি কোন কোর্স বা ক্লাসের পড়া খুঁজছেন?
          </h2>
          <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-md mx-auto">
            আপনার পছন্দের বিভাগটি নির্বাচন করুন, যাতে শুধুমাত্র আপনার প্রয়োজনীয় কোর্সগুলো দ্রুত দেখতে পারেন।
          </p>
        </div>

        {/* Options Grid */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {targetOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`text-left p-3.5 rounded-2xl border border-slate-100 flex items-start gap-3 transition group ${option.bgAccent} ${option.borderAccent} hover:shadow-2xs`}
              >
                <div className="text-2xl p-2 bg-slate-50 rounded-xl group-hover:scale-110 transition shrink-0">
                  {option.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#D62B3B] transition truncate">
                    {option.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                    {option.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>কোনো রিলোড ছাড়াই সাথে সাথে ফিল্টার হবে</span>
          </span>

          <button
            onClick={handleExploreAll}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#D62B3B] hover:text-[#bd2332] bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl transition"
          >
            <span>সকল ১১০+ কোর্স একসাথে দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
