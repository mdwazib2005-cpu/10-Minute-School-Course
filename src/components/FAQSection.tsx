import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { OfficialWhatsAppIcon } from './FakeWhatsAppWidget';
import { useCourse } from '../context/CourseContext';

export const FAQSection: React.FC = () => {
  const { openWhatsAppWithCourse } = useCourse();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '১। 10MinCourse.com থেকে কোর্স কিনলে কি অতিরিক্ত ডিসকাউন্ট পাওয়া যায়?',
      a: 'হ্যাঁ! আমাদের প্ল্যাটফর্মে ১০ মিনিট স্কুলের স্পেশাল প্রমোশনাল অফার এবং ক্যাশব্যাক বা প্রোমোকোড নিয়মিত আপডেট করা হয়। আমাদের দেওয়া লিংক বা কুপন দিয়ে কিনলে আপনি সর্বোচ্চ ডিসকাউন্ট উপভোগ করতে পারবেন।'
    },
    {
      q: '২। কোর্স কেনার পর ক্লাস কীভাবে করব? সার্টিফিকেট কি পাওয়া যাবে?',
      a: 'আমাদের দেওয়া লিংকে ক্লিক করে আপনি সরাসরি ১০ মিনিট স্কুলের অফিসিয়াল অ্যাপ বা ওয়েবসাইটে নিজের অ্যাকাউন্ট দিয়ে এনরোল করবেন। কোর্স কমপ্লিট করার পর ১০ মিনিট স্কুলের অথরাইজড সার্টিফিকেট সরাসরি আপনার প্রোফাইলে যোগ হবে।'
    },
    {
      q: '৩। কোর্সের দাম বা অফারের মেয়াদ কীভাবে নির্ধারিত হয়?',
      a: '১০ মিনিট স্কুল যখনই কোনো কোর্সে বিশেষ ছাড় বা ক্যাম্পেইন চালু করে, তা আমাদের সেন্ট্রাল ডেটাবেজে সাথে সাথে রিয়েল-টাইমে আপডেট হয়ে যায়। অফারের সময় শেষ হয়ে গেলে কোর্সটি আবার নিয়মিত মূল্যে ফিরে আসে।'
    },
    {
      q: '৪। বিকাশ বা নগদে কীভাবে পেমেন্ট করব?',
      a: '১০ মিনিট স্কুলের অফিশিয়াল পেমেন্ট গেটওয়েতে বিকাশ, নগদ, রকেট, উপায় সহ যেকোনো ভিসা ও মাস্টারকার্ড দিয়ে এক মিনিটে কোর্স কেনা যায়।'
    },
    {
      q: '৫। আমি যদি বুঝতে না পারি কোন কোর্সটি আমার জন্য উপযুক্ত, তবে কী করব?',
      a: 'আমাদের ওয়েবসাইটে সরাসরি গুগল মিটে লাইভ কথা বলতে পারেন অথবা নিচে থাকা হোয়াটসঅ্যাপ বাটনে ক্লিক করে সরাসরি আমাদের মেন্টরের সাথে কথা বলে আপনার ক্লাসের সেরা কোর্স বেছে নিতে পারেন।'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1 bg-red-50 text-[#D62B3B] text-xs font-bold px-3 py-1 rounded-full border border-red-100">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>সাধারণ প্রশ্নোত্তর</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          সচরাচর জিজ্ঞাসিত কিছু প্রশ্ন (FAQ)
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          ১০ মিনিট স্কুল কোর্স এবং এনরোলমেন্ট সম্পর্কিত যেকোনো দ্বিধা দূর করতে জেনে নিন
        </p>
      </div>

      <div className="space-y-3 pt-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-2xs transition"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#D62B3B] transition"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#D62B3B]' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* WhatsApp Help banner */}
      <div className="text-center pt-4">
        <p className="text-xs sm:text-sm text-slate-600 mb-3">
          আপনার অন্য কোনো প্রশ্ন আছে? আমাদের সরাসরি জিজ্ঞেস করুন:
        </p>
        <button
          onClick={() => openWhatsAppWithCourse(undefined, 'আমার কোর্স সম্পর্কিত কিছু প্রশ্ন ছিল।')}
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b859] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-2xl shadow-xs transition cursor-pointer"
        >
          <OfficialWhatsAppIcon className="w-4 h-4" />
          <span>হোয়াটসঅ্যাপে প্রশ্ন করুন</span>
        </button>
      </div>
    </div>
  );
};
