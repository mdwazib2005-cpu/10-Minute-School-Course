import { Course, SiteSettings, BlogPost, Review, CategoryConfig, ClassPortalInfo, CustomPage } from '../types';

export const INITIAL_CATEGORIES: CategoryConfig[] = [
  { id: 'all', label: 'সকল কোর্স', icon: '⚡', order: 1, enabled: true },
  { id: 'language', label: 'স্পোকেন ও ইংলিশ', icon: '🗣️', order: 2, enabled: true },
  { id: 'hsc', label: 'এইচএসসি (HSC)', icon: '🏆', order: 3, enabled: true },
  { id: 'admission', label: 'এডমিশন ও মেডিকেল', icon: '🏛️', order: 4, enabled: true },
  { id: 'skill', label: 'স্কিল ও ফ্রিল্যান্সিং', icon: '💻', order: 5, enabled: true },
  { id: 'class-9-10', label: 'ক্লাস ৯-১০ (SSC)', icon: '📚', order: 6, enabled: true },
  { id: 'class-6-8', label: 'ক্লাস ৬-৮', icon: '🎒', order: 7, enabled: true },
  { id: 'job-prep', label: 'বিসিএস ও চাকরি', icon: '👔', order: 8, enabled: true },
  { id: 'kids', label: 'কিডস কোর্স', icon: '👶', order: 9, enabled: true },
];

export const INITIAL_CLASSES: ClassPortalInfo[] = [
  {
    id: 'class-6',
    title: 'ষষ্ঠ শ্রেণি (Class 6) অনলাইন ব্যাচ',
    shortTitle: 'ক্লাস ৬',
    gradeBadge: 'নতুন কারিকুলাম ২০২৬',
    icon: '🎒',
    tagline: 'নতুন শিক্ষাক্রমের সকল বিষয়ের লাইভ ও রেকর্ডেড ক্লাস, কুইজ ও হোমওয়ার্ক সলিউশন',
    description: 'ষষ্ঠ শ্রেণির শিক্ষার্থীদের নতুন কারিকুলাম অনুযায়ী আনন্দের সাথে পড়ালেখা শেখাতে গণিত, বিজ্ঞান ও ইংরেজি সহ সকল বিষয়ের পূর্ণাঙ্গ প্রস্তুতি।',
    subjects: ['গণিত', 'বিজ্ঞান', 'ইংরেজি', 'বাংলা', 'ডিজিটাল প্রযুক্তি', 'জীবন ও জীবিকা'],
    targetTags: ['class-6', 'junior', 'curriculum'],
    categoryMatch: 'class-6-8'
  },
  {
    id: 'class-7',
    title: 'সপ্তম শ্রেণি (Class 7) অনলাইন ব্যাচ',
    shortTitle: 'ক্লাস ৭',
    gradeBadge: 'নতুন কারিকুলাম ২০২৬',
    icon: '📘',
    tagline: 'সহজ কনসেপ্ট, ভিজুয়াল অ্যানিমেশন ও নিয়মিত পরীক্ষার মাধ্যমে দারুণ ফলাফল',
    description: 'সপ্তম শ্রেণির বিষয়ভিত্তিক জ্ঞান ও বেসিক মজবুত করতে অভিজ্ঞ মেন্টরদের ক্লাস, প্রজেক্ট সলভ ও মূল্যায়ন গাইড।',
    subjects: ['গণিত', 'বিজ্ঞান', 'ইংরেজি', 'বাংলা', 'ইতিহাস ও সামাজিক বিজ্ঞান'],
    targetTags: ['class-7', 'junior', 'curriculum'],
    categoryMatch: 'class-6-8'
  },
  {
    id: 'class-8',
    title: 'অষ্টম শ্রেণি (Class 8) অনলাইন ব্যাচ',
    shortTitle: 'ক্লাস ৮',
    gradeBadge: 'নতুন শিক্ষাক্রম ও ফাউন্ডেশন',
    icon: '📗',
    tagline: 'ক্লাস ৯-১০ এর শক্তিশালী ভিত্তি গড়তে অষ্টম শ্রেণির অল-সাবজেক্ট কমপ্লিট সল্যুশন',
    description: 'অষ্টম শ্রেণির গণিত, বিজ্ঞান এবং ইংরেজির জটিল নিয়মগুলো সহজ ট্রিকসের মাধ্যমে আয়ত্ত করুন।',
    subjects: ['গণিত', 'বিজ্ঞান অনুসন্ধান', 'ইংরেজি গ্রামার ও স্পিকিং', 'বাংলা', 'আইসিটি'],
    targetTags: ['class-8', 'junior', 'curriculum'],
    categoryMatch: 'class-6-8'
  },
  {
    id: 'class-9',
    title: 'নবম শ্রেণি (Class 9) অনলাইন ব্যাচ',
    shortTitle: 'ক্লাস ৯',
    gradeBadge: 'এসএসসি ফাউন্ডেশন ব্যাচ',
    icon: '🔬',
    tagline: 'পদার্থ, রসায়ন, উচ্চতর গণিত ও বায়োলজির কনসেপ্ট ক্ল্যারিটি এবং অধ্যায়ভিত্তিক সলভ',
    description: 'নবম শ্রেণির বিজ্ঞান ও অন্যান্য বিভাগের শিক্ষার্থীদের বোর্ড স্ট্যান্ডার্ড পড়ালেখা ও গাণিতিক সমস্যা সমাধানের সেরা ব্যাচ।',
    subjects: ['পদার্থবিজ্ঞান', 'রসায়ন', 'সাধারণ গণিত', 'উচ্চতর গণিত', 'জীববিজ্ঞান', 'ইংরেজি'],
    targetTags: ['class-9', 'ssc', 'science'],
    categoryMatch: 'class-9-10'
  },
  {
    id: 'class-10',
    title: 'দশম শ্রেণি ও SSC চূড়ান্ত প্রস্তুতি ব্যাচ',
    shortTitle: 'ক্লাস ১০ (SSC)',
    gradeBadge: 'এসএসসি গোল্ডেন এ+ ব্যাচ',
    icon: '🎯',
    tagline: 'বোর্ড প্রশ্ন সমাধান, CQ-MCQ স্পেশাল ক্লাস ও টেস্ট পেপার সলভিং',
    description: 'এসএসসি পরীক্ষায় জিপিএ-৫ নিশ্চিত করতে বিগত ১০ বছরের বোর্ড প্রশ্ন বিশ্লেষণ ও মডেল টেস্ট সিরিজ।',
    subjects: ['পদার্থ', 'রসায়ন', 'উচ্চতর গণিত', 'সাধারণ গণিত', 'জীববিজ্ঞান', 'বাংলা ও ইংলিশ'],
    targetTags: ['class-10', 'ssc', 'board-exam'],
    categoryMatch: 'class-9-10'
  },
  {
    id: 'hsc',
    title: 'HSC ক্র্যাশ কোর্স ও ফুল একাডেমি ব্যাচ',
    shortTitle: 'HSC (এইচএসসি)',
    gradeBadge: 'এইচএসসি ২০২৫-২০২৬ ব্যাচ',
    icon: '🏆',
    tagline: 'বুয়েট-ডিএমসি ভাইয়া-অপুদের সরাসরি ক্লাসে এইচএসসি ও এডমিশনের দ্বৈত প্রস্তুতি',
    description: 'পদার্থ, রসায়ন, উচ্চতর গণিত ও জীববিজ্ঞানের প্রতিটি অধ্যায়ের বেসিক টু প্রো লেভেল প্রস্তুতি।',
    subjects: ['Physics', 'Chemistry', 'Higher Math', 'Biology', 'ICT', 'Bangla & English'],
    targetTags: ['hsc', 'academic', 'science'],
    categoryMatch: 'hsc'
  },
  {
    id: 'admission',
    title: 'মেডিকেল ও বিশ্ববিদ্যালয় ভর্তি (Admission Hub)',
    shortTitle: 'এডমিশন ও মেডিকেল',
    gradeBadge: 'টপ র‍্যাংকার্স ব্যাচ',
    icon: '🏛️',
    tagline: 'ডিএমসি, বুয়েট, ঢাবি ও গুচ্ছভুক্ত পাবলিক বিশ্ববিদ্যালয়ে চান্স নিশ্চিত করার সেরা প্রোগ্রাম',
    description: 'এডমিশন টেস্টের শর্টকাট টেকনিক, প্রশ্নব্যাংক পোস্টমর্টেম ও সেন্ট্রাল মেধা যাচাই পরীক্ষা।',
    subjects: ['মেডিকেল ভর্তি', 'ভার্সিটি ক ইউনিট', 'ইঞ্জিনিয়ারিং', 'গুচ্ছ প্রস্তুতি', 'আইবিএ ও বি ইউনিট'],
    targetTags: ['admission', 'varsity', 'medical', 'du', 'dmc'],
    categoryMatch: 'admission'
  }
];

export const INITIAL_CUSTOM_PAGES: CustomPage[] = [
  {
    id: 'page_spoken_special',
    slug: 'spoken-english-special',
    title: 'স্পোকেন ইংলিশ ও ভাষা শিক্ষা স্পেশাল বান্ডেল',
    subtitle: 'মুনজেরিন শহীদ ও সেরা ইন্সট্রাক্টরদের স্পোকেন ইংলিশ, আইইএলটিএস ও কিডস কোর্স একসাথে',
    heroBgGradient: 'from-red-600 to-rose-800',
    icon: '🗣️',
    bannerBadge: 'ভাষা শিক্ষা স্পেশাল অফার',
    description: 'ইংরেজি ভীতি দূর করে কথা বলা, প্রেজেন্টেশন এবং বিদেশে উচ্চশিক্ষার জন্য সেরা সব কোর্সে সর্বোচ্চ ছাড় উপভোগ করুন।',
    selectedCourseIds: ['spoken-english', 'ielts-course', 'english-grammar-crash', 'kids-english'],
    showInNavbar: true,
    showInFooter: true,
    metaTitle: 'স্পোকেন ইংলিশ কোর্স অফার | ১০ মিনিট স্কুল',
    metaDescription: '১০ মিনিট স্কুলের সেরা স্পোকেন ইংলিশ ও আইইএলটিএস কোর্স স্পেশাল ছাড় সহ।',
    createdAt: '2026-08-18'
  },
  {
    id: 'page_freelancing_mastery',
    slug: 'freelancing-skill-hub',
    title: 'ফ্রিল্যান্সিং ও ক্যারিয়ার স্কিলস হাব',
    subtitle: 'গ্রাফিক্স ডিজাইন, ওয়েব ডেভেলপমেন্ট ও ডিজিটাল মার্কেটিং শিখে ঘরে বসে ইনকাম করুন',
    heroBgGradient: 'from-blue-600 to-indigo-800',
    icon: '💻',
    bannerBadge: 'ইন-ডিমান্ড স্কিলস',
    description: 'ঘরে বসে মার্কেটপ্লেসে আয় করার উপযুক্ত স্কিল ডেভেলপ করতে ১০ মিনিট স্কুলের সেরা টেক ও ক্রিয়েটিভ কোর্সসমূহ।',
    selectedCourseIds: ['graphic-design', 'web-development-bootcamp', 'facebook-marketing'],
    showInNavbar: true,
    showInFooter: true,
    metaTitle: 'ফ্রিল্যান্সিং ও স্কিল কোর্স | ১০ মিনিট স্কুল',
    metaDescription: 'গ্রাফিক্স ডিজাইন, ওয়েব কোডিং ও মার্কেটিং কোর্স।',
    createdAt: '2026-08-18'
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  siteName: '10MsCourse.shop',
  siteTagline: '১০ মিনিট স্কুলের অফিসিয়াল অ্যাফিলিয়েট হাব • সেরা সব কোর্স ও এক্সক্লুসিভ ডিসকাউন্ট',
  
  // SEO & Metadata
  metaTitle: '10MsCourse - ১০ মিনিট স্কুলের সেরা কোর্স, অফার ও ডিসকাউন্ট',
  metaDescription: '১০ মিনিট স্কুলের স্পোকেন ইংলিশ, এইচএসসি, ভর্তি পরীক্ষা, আইইএলটিএস ও স্কিল ডেভেলপমেন্ট কোর্সের সেরা ডিসকাউন্ট, গোপন প্রোমোকোড এবং বিস্তারিত গাইডলাইন এক জায়গায়।',
  metaKeywords: '10 minute school, ১০ মিনিট স্কুল, স্পোকেন ইংলিশ কোর্স, এইচএসসি ক্র্যাশ কোর্স, আইইএলটিএস, ফ্রিল্যান্সিং, কোর্স ডিসকাউন্ট, প্রোমোকোড, 10mscourse, 10mscourse.shop',
  metaAuthor: '10MsCourse',
  canonicalUrl: 'https://10mscourse.shop',
  faviconUrl: '',
  ogTitle: '10MsCourse - ১০ মিনিট স্কুল কোর্স ও স্পেশাল ছাড়',
  ogDescription: '১০ মিনিট স্কুলের সেরা সকল কোর্সে সর্বোচ্চ ডিসকাউন্ট, প্রোমোকোড ও লাইভ সাপোর্ট পান 10MsCourse এ।',
  ogImageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
  twitterTitle: '10MsCourse - ১০ মিনিট স্কুলের সেরা কোর্স ও ডিসকাউন্ট',
  twitterDescription: 'স্পোকেন ইংলিশ, এইচএসসি ও স্কিল কোর্সে এক্সক্লুসিভ প্রোমোকোড ও ছাড় পেতে ভিজিট করুন।',
  twitterImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',

  // Navigation Items (Fully manageable from Admin)
  navItems: [
    { id: 'nav-home', label: 'হোম', type: 'view', target: 'home', icon: '🏠', enabled: true, order: 1 },
    { id: 'nav-academic', label: 'একাডেমিক', type: 'dropdown', dropdownType: 'classes', icon: '📚', enabled: true, order: 2 },
    { id: 'nav-special-pages', label: 'স্পেশাল পেজ', type: 'dropdown', dropdownType: 'custom_pages', icon: '✨', enabled: true, order: 3 },
    { id: 'nav-categories', label: 'ক্যাটাগরি', type: 'dropdown', dropdownType: 'categories', icon: '🗂️', enabled: true, order: 4 },
    { id: 'nav-blogs', label: 'ব্লগ', type: 'view', target: 'blogs', icon: '📝', enabled: true, order: 5 },
    { id: 'nav-reviews', label: 'রিভিউ', type: 'view', target: 'reviews', icon: '⭐', enabled: true, order: 6 }
  ],
  
  // Custom Logo & Branding
  logoType: 'text_badge',
  customLogoUrl: '',
  logoBadgeNumber: '10',
  logoMainText: 'MINUTE',
  logoSubText: 'COURSE',
  logoBottomText: '10MsCourse.shop',
  logoTextPrefix: '10Ms',
  logoTextSuffix: 'Course.shop',
  logoBadgeText: '10',
  logoBadgeSub: 'MS',
  
  // Announcement
  headerNotice: '🔥 সীমিত সময়ের স্পেশাল ডিসকাউন্ট ও কুপন কোড অফার চলছে! যেকোনো কোর্সে সর্বোচ্চ ছাড় পেতে সরাসরি যোগাযোগ করুন।',
  isHeaderNoticeActive: true,

  // Countdown Offer Banner Settings
  showCountdownBanner: true,
  countdownBannerText: 'এইচএসসি ও এডমিশন স্পেশাল অফার চলছে! আর্লি বার্ড স্পেশাল ছাড়ে ভর্তি হতে আর বাকি:',
  countdownBannerSubtext: 'সীমিত আসন সংখ্যা • স্পেশাল গিফট ও ডিসকাউন্ট ভাউচার সুবিধা',
  countdownTargetDate: '2026-09-30T23:59:59',
  countdownThemeColor: 'crimson',

  // Hero Section
  heroBadgeText: '১০ মিনিট স্কুল পার্টনার হাব • ২০২৬ অফার',
  heroTitle: '১০ মিনিট স্কুলের যেকোনো কোর্সে নিন সর্বোচ্চ ছাড় ও স্পেশাল কুপন',
  heroSubtitle: 'সরাসরি ১০ মিনিট স্কুলের অফিসিয়াল ওয়েবসাইটে ভর্তি হওয়ার সেরা ও বিশ্বস্ত মাধ্যম। লাইভ ক্লাস, স্কিল ডেভেলপমেন্ট ও এডমিশন প্রস্তুতি শুরু করুন আজই!',
  heroButtonText: 'কোর্স এক্সপ্লোর করুন',
  heroExtraBadgeText: '১১০+ ভেরিফায়েড কোর্স',

  // Best Selling & Catalog Headings
  bestSellingTitle: 'বেস্ট সেলিং কোর্সসমূহ',
  bestSellingSubtitle: 'সর্বাধিক জনপ্রিয় ও বেস্টরেটেড কোর্সসমূহ',
  bestSellingButtonText: 'ডিসকাউন্ট লিংক ও কুপন নিন',

  // 4 Pillars (Trust section)
  pillar1Title: '১১০+ কোর্স',
  pillar1Sub: 'সব ক্যাটাগরি এক ছাদের নিচে',
  pillar2Title: '২৪/৭ সাপোর্ট',
  pillar2Sub: 'সরাসরি হোয়াটসঅ্যাপ গাইডলাইন',
  pillar3Title: 'সর্বোচ্চ স্পেশাল ছাড়',
  pillar3Sub: 'স্পেশাল প্রোমোকোড ও অফার',
  pillar4Title: 'গুগল মিট কাউন্সেলিং',
  pillar4Sub: 'সরাসরি মেন্টরদের সাথে কথা',

  catalogTitle: 'সকল ১০ মিনিট স্কুল কোর্স',
  catalogSubtitle: 'সব কোর্সের তথ্য, নিয়মিত দাম ও স্পেশাল অফার সেন্ট্রাল ডেটা থেকে স্বয়ংক্রিয়ভাবে আপডেট হয়',

  // Why Buy Section
  whyTitle: 'কেন 10MsCourse এর মাধ্যমে কোর্স কিনবেন?',
  whySubtitle: 'সর্বোচ্চ ডিসকাউন্ট, স্পেশাল প্রোমোকোড ও সরাসরি মেন্টরিং সুবিধা',
  whyBenefit1Title: 'সর্বোচ্চ ক্যাশব্যাক ও প্রমো কোড',
  whyBenefit1Text: '১০ মিনিট স্কুলের সকল গোপন প্রমোশনাল কুপন কোড আমাদের এখানে সবার আগে আপডেট করা হয়।',
  whyBenefit2Title: 'সরাসরি গুগল মিটে ক্যারিয়ার কাউন্সেলিং',
  whyBenefit2Text: 'কোন কোর্সটি আপনার ক্যারিয়ার বা পরীক্ষার জন্য সঠিক হবে তা নিশ্চিত করতে আমাদের মেন্টরের সাথে লাইভ কথা বলুন।',
  whyBenefit3Title: 'অফিসিয়াল সার্টিফিকেট ও সাপোর্ট',
  whyBenefit3Text: 'কোর্সটি সরাসরি ১০ মিনিট স্কুলের আসল পোর্টালে যুক্ত হবে এবং কোর্স শেষে অফিসিয়াল ভেরিফায়েড সার্টিফিকেট পাবেন।',

  // WhatsApp
  whatsappNumber: '8801712345678', // Default WhatsApp number
  whatsappDisplayNumber: '+880 1712-345678',
  whatsappAdvisorName: '10 Minute Course',
  whatsappWelcomeMessage: 'আসসালামু আলাইকুম! ১০ মিনিট স্কুলের কোন কোর্সটি কিনতে চাচ্ছেন বা কোনো ডিসকাউন্ট কুপন কোড প্রয়োজন কি?',
  whatsappButtonText: 'ডিসকাউন্ট লিংক ও কুপন নিন',
  autoOpenWhatsApp: true,
  autoOpenWhatsAppDelay: 3,

  // Google Meet
  googleMeetLink: 'https://meet.google.com/abc-defg-hij',
  isMeetLive: true,
  meetTopic: '১০ মিনিট স্কুল কোর্স গাইডলাইন ও ডিসকাউন্ট হেল্পডেস্ক',
  meetHostName: 'ওয়াজিব রহমান (ক্যারিয়ার ও কোর্স অ্যাডভাইজর)',

  // Footer & Contact
  footerAboutText: '১০ মিনিট স্কুলের বিশ্বস্ত অ্যাফিলিয়েট পার্টনার পোর্টাল। শিক্ষার্থীদের পড়াশোনা, ভর্তি ও ক্যারিয়ার স্কিল ডেভেলপমেন্টে সঠিক কোর্স নির্বাচনে এবং সর্বোচ্চ ডিসকাউন্ট পেতে আমরা সার্বক্ষণিক সহায়তা করে থাকি।',
  footerDisclaimerText: 'দাবিত্যাগ: এই ওয়েবসাইটটি ১০ মিনিট স্কুলের একটি অনুমোদিত অ্যাফিলিয়েট তথ্য প্ল্যাটফর্ম। সকল কোর্স মেটেরিয়াল ও পেমেন্ট সরাসরি ১০ মিনিট স্কুল কর্তৃক পরিচালিত হয়।',
  contactPhone: '+880 1712-345678',
  contactEmail: 'support@10mscourse.shop',
  contactAddress: 'ঢাকা, বাংলাদেশ',
  footerCopyrightText: '© ২০২৬ 10MsCourse.shop - ১০ মিনিট স্কুল অনুমোদিত স্বাধীন অ্যাফিলিয়েট পোর্টাল। সর্বস্বত্ব সংরক্ষিত।',

  facebookPageUrl: 'https://facebook.com',
  youtubeUrl: 'https://youtube.com',
};

// Generates an offer date N days in the future for demo
const getFutureDate = (daysAhead: number) => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  d.setHours(23, 59, 59, 0);
  return d.toISOString();
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'spoken-english',
    slug: 'ghore-boshe-spoken-english',
    title: 'ঘরে বসে Spoken English',
    subtitle: 'দৈনন্দিন জীবনে ফ্লুয়েন্টলি ইংরেজিতে কথা বলার সহজ ও কার্যকর উপায়',
    category: 'language',
    categoryName: 'ভাষা শিক্ষা ও স্পোকেন',
    instructor: 'মুনজেরিন শহীদ',
    instructorTitle: 'অক্সফোর্ড গ্র্যাজুয়েট ও লিড ইন্সট্রাক্টর, ১০ মিনিট স্কুল',
    instructorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80',
    regularPrice: 1500,
    offerPrice: 950,
    offerExpiryDate: getFutureDate(3),
    courseExpiryDate: null,
    isLifetime: true,
    affiliateUrl: 'https://10minuteschool.com/product/ghore-boshe-spoken-english/?aff=10mscourse',
    couponCode: 'PROMO10',
    features: [
      '৮৩টি সহজ ও আকর্ষণীয় ভিডিও লেকচার',
      '৮৩টি রিডিং ম্যাটেরিয়াল ও প্র্যাকটিস টেস্ট',
      'দৈনন্দিন কথোপকথনের জন্য অডিও বুক',
      'কোর্স কমপ্লিশন ভেরিফায়েড সার্টিফিকেট',
      'লাইফটাইম অ্যাক্সেস যেকোনো ডিভাইস থেকে'
    ],
    rating: 4.9,
    reviewCount: 4230,
    enrolledCount: 85200,
    totalVideos: 83,
    totalHours: '১৮+ ঘণ্টা',
    badge: 'সেরা বিক্রিত',
    featured: true,
    shortDescription: 'স্কুল, কলেজ, বিশ্ববিদ্যালয় বা চাকরির ইন্টারভিউতে ইংরেজিতে কথা বলার ভয় কাটান মাত্র ৩ মাসে।',
    fullDescription: `ঘরে বসে Spoken English কোর্সটিতে দৈনন্দিন জীবনের প্রায় সব ধরনের পরিস্থিতি (যেমন: রেস্তোরাঁয় অর্ডার করা, চাকরির ইন্টারভিউ, অফিসে প্রেজেন্টেশন দেওয়া, ভ্রমণের সময় ইংরেজিতে কথা বলা) খুব সহজ ও বাস্তবসম্মত উদাহরণের মাধ্যমে বোঝানো হয়েছে।\n\nকোর্সটি শুরু করতে ইংরেজি ব্যাকরণের জটিল নিয়মের প্রয়োজন নেই। সহজ অডিও-ভিজুয়াল টেকনিকে কথা বলা শুরু করুন আজই!`,
    syllabus: [
      { moduleTitle: 'মডিউল ১: ডেইলি কনভারসেশন ও গ্রিটিংস', lessonsCount: 15, topics: ['আত্মপরিচয় দেওয়া', 'বন্ধুদের সাথে আড্ডা', 'শপিং ও রেস্তোরাঁয় কথা বলা'] },
      { moduleTitle: 'মডিউল ২: অফিস ও একাডেমিক ইংলিশ', lessonsCount: 22, topics: ['ইমেইল রাইটিং', 'প্রেজেন্টেশন স্কিল', 'ইন্টারভিউ টেকনিক'] },
      { moduleTitle: 'মডিউল ৩: ফ্লুয়েন্সি ও প্রোনাউনসিয়েশন', lessonsCount: 20, topics: ['উচ্চারণ শুদ্ধিকরণ', 'ভোকাবুলারি বৃদ্ধির নিয়ম', 'স্পিকিং প্র্যাকটিস'] }
    ],
    faqs: [
      { question: 'কোর্সটি কেনার পর কতদিন পর্যন্ত দেখতে পারব?', answer: 'এটি লাইফটাইম অ্যাক্সেস কোর্স। একবার কিনলে আজীবন দেখতে পারবেন।' },
      { question: 'কোর্স শেষে কি সার্টিফিকেট পাব?', answer: 'হ্যাঁ, সম্পূর্ণ কোর্স এবং কুইজ সম্পন্ন করার পর ১০ মিনিট স্কুল থেকে ভেরিফায়েড সার্টিফিকেট পাবেন।' }
    ],
    tags: ['spoken-english', 'english', 'munzereen', 'language', 'bestseller']
  },
  {
    id: 'ielts-course',
    slug: 'ielts-course-by-munzereen-shahid',
    title: 'IELTS Course by Munzereen Shahid',
    subtitle: 'আইইএলটিএস পরীক্ষায় ব্যান্ড স্কোর ৭.৫+ অর্জনের সম্পূর্ণ কমপ্লিট গাইডলাইন',
    category: 'language',
    categoryName: 'ভাষা শিক্ষা ও আইইএলটিএস',
    instructor: 'মুনজেরিন শহীদ',
    instructorTitle: 'অক্সফোর্ড গ্র্যাজুয়েট (MSc in Applied Linguistics)',
    instructorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    regularPrice: 3500,
    offerPrice: 2250,
    offerExpiryDate: getFutureDate(5),
    courseExpiryDate: null,
    isLifetime: true,
    affiliateUrl: 'https://10minuteschool.com/product/ielts-course/?aff=10mscourse',
    couponCode: 'IELTS500',
    features: [
      'Listening, Reading, Writing & Speaking চারটি মডিউলের বিস্তারিত ব্যাখ্যা',
      '৫০+ ভিডিও লেকচার ও রিডিং ম্যাটেরিয়ালস',
      'প্র্যাকটিস মক টেস্ট এবং ব্যান্ড স্কোর এনালাইসিস',
      'রাইটিং টাস্ক ১ ও ২ এর ফরম্যাট এবং স্যাম্পল অ্যান্সার',
      'স্পিকিং পার্ট ১, ২ ও ৩ এর লাইভ স্যাম্পল'
    ],
    rating: 4.8,
    reviewCount: 1850,
    enrolledCount: 32000,
    totalVideos: 65,
    totalHours: '২২+ ঘণ্টা',
    badge: 'টপ রেটেড',
    featured: true,
    shortDescription: 'বিদেশে উচ্চশিক্ষা কিংবা ইমিগ্রেশনের স্বপ্ন পূরণে IELTS এ কাঙ্ক্ষিত ব্যান্ড স্কোরের জন্য এক কোর্সেই পূর্ণ প্রস্তুতি।',
    fullDescription: 'IELTS পরীক্ষার চারটি প্রধান সেকশন (Reading, Writing, Listening, Speaking) এ ভালো করতে যেসব হ্যাকস, টেকনিক ও টাইম ম্যানেজমেন্ট প্রয়োজন, তা সুন্দরভাবে সাজানো হয়েছে।',
    tags: ['ielts', 'english', 'study-abroad', 'language']
  },
  {
    id: 'hsc-crash-course',
    slug: 'hsc-2025-crash-course',
    title: 'HSC ক্র্যাশ কোর্স (বিজ্ঞান বিভাগ)',
    subtitle: 'এইচএসসি পরীক্ষায় গোল্ডেন এ+ নিশ্চিত করার চূড়ান্ত রিভিশন ও সলভ ব্যাচ',
    category: 'hsc',
    categoryName: 'এইচএসসি (HSC)',
    instructor: '১০ মিনিট স্কুল এক্সপার্ট প্যানেল (বুয়েট ও ডিএমসি)',
    instructorTitle: '১০+ বছরের অভিজ্ঞ শিক্ষকমণ্ডলী',
    instructorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    regularPrice: 4000,
    offerPrice: 2800,
    offerExpiryDate: getFutureDate(7),
    courseExpiryDate: getFutureDate(180),
    isLifetime: false,
    affiliateUrl: 'https://10minuteschool.com/product/hsc-crash-course/?aff=10mscourse',
    couponCode: 'HSCGOLDEN',
    features: [
      'পদার্থ, রসায়ন, উচ্চতর গণিত ও জীববিজ্ঞান সম্পূর্ণ সিলেবাস কভার',
      '১৮০+ লাইভ ও রেকর্ডেড ক্লাস',
      'বোর্ড স্ট্যান্ডার্ড লেকচার শিট ও CQ/MCQ সলভ',
      'অধ্যায়ভিত্তিক মডেল টেস্ট ও সেন্ট্রাল র‍্যাংকিং',
      'টেলিগ্রাম ডাউট সলভিং গ্রুপ সাপোর্ট'
    ],
    rating: 4.9,
    reviewCount: 3400,
    enrolledCount: 45000,
    totalVideos: 180,
    totalHours: '১২০+ ঘণ্টা',
    badge: 'মেগা অফার',
    featured: true,
    shortDescription: 'এইচএসসি পরীক্ষার চূড়ান্ত প্রস্তুতিতে প্রতিটি অধ্যায়ের কনসেপ্ট ক্লিয়ার করুন এবং বোর্ড পরীক্ষার জন্য নিজেকে প্রস্তুত করুন।',
    fullDescription: 'বুয়েট, ঢাকা বিশ্ববিদ্যালয় ও মেডিকেল কলেজের অভিজ্ঞ ভাইয়া-অপুদের সরাসরি তত্ত্বাবধানে প্রতিটি বিষয় বুঝে পড়ার সেরা কোর্স।',
    tags: ['hsc', 'academic', 'science', 'physics', 'math', 'chemistry']
  },
  {
    id: 'varsity-admission-ka',
    slug: 'varsity-ka-admission-course',
    title: "বিশ্ববিদ্যালয় 'ক' ইউনিট এডমিশন কোর্স",
    subtitle: 'ঢাবি, জাবি, রাবি, চবি সহ গুচ্ছভুক্ত বিশ্ববিদ্যালয়ের বিজ্ঞান অনুষদে ভর্তির সেরা প্রস্তুতি',
    category: 'admission',
    categoryName: 'বিশ্ববিদ্যালয় ভর্তি',
    instructor: '১০ মিনিট স্কুল এডমিশন টিম',
    instructorTitle: 'ঢাবি ও বুয়েটের সেরা ইন্সট্রাক্টর প্যানেল',
    instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    regularPrice: 5000,
    offerPrice: 3500,
    offerExpiryDate: getFutureDate(4),
    courseExpiryDate: getFutureDate(120),
    isLifetime: false,
    affiliateUrl: 'https://10minuteschool.com/product/varsity-ka-admission/?aff=10mscourse',
    couponCode: 'VARSITY2025',
    features: [
      'Physics, Chemistry, Math & Biology এর ডেডিকেটেড ক্লাস',
      '১৫০+ এডমিশন স্ট্যান্ডার্ড লাইভ ক্লাস',
      'বিগত ২০ বছরের প্রশ্নব্যাংক এনালাইসিস ও সলিউশন',
      'ডেইলি, উইকলি ও পেপার ফাইনাল এক্সাম',
      'ভার্সিটি স্পেশাল প্র্যাকটিস বুক ও পিডিএফ'
    ],
    rating: 4.9,
    reviewCount: 2900,
    enrolledCount: 38000,
    totalVideos: 160,
    totalHours: '১০০+ ঘণ্টা',
    badge: 'হট এডমিশন',
    featured: true,
    shortDescription: 'ঢাকা বিশ্ববিদ্যালয় সহ সকল পাবলিক বিশ্ববিদ্যালয়ের ক ইউনিটে সেরা ফলাফলের পূর্ণাঙ্গ এডমিশন প্যাকেজ।',
    fullDescription: 'প্রতিযোগিতামূলক ভর্তি পরীক্ষায় সময় বাঁচানোর টেকনিক, শর্টকাট ট্রিকস ও কনসেপচুয়াল ক্ল্যারিটি অর্জনের সবচেয়ে বিশ্বস্ত কোর্স।',
    tags: ['admission', 'varsity', 'du', 'science', 'admission-ka']
  },
  {
    id: 'medical-admission',
    slug: 'medical-admission-course',
    title: 'মেডিকেল এডমিশন কোর্স ২০২৫-২৬',
    subtitle: 'ডিএমসি সহ সরকারি মেডিকেলে চান্স পাওয়ার স্বপ্ন পূরণে সম্পূর্ণ গাইডলাইন',
    category: 'admission',
    categoryName: 'মেডিকেল ভর্তি প্রস্তুতি',
    instructor: 'ডা. সানজিদা ও ডিএমসি শিক্ষক প্যানেল',
    instructorTitle: 'ঢাকা মেডিকেল কলেজের ডাক্তার ও শীর্ষস্থান অধিকারী প্যানেল',
    instructorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    regularPrice: 5500,
    offerPrice: 4000,
    offerExpiryDate: getFutureDate(6),
    courseExpiryDate: getFutureDate(150),
    isLifetime: false,
    affiliateUrl: 'https://10minuteschool.com/product/medical-admission/?aff=10mscourse',
    couponCode: 'MEDICO10',
    features: [
      'বায়োলজি, কেমিস্ট্রি, ফিজিক্স, ইংলিশ ও সাধারণ জ্ঞান পূর্ণাঙ্গ কভারেজ',
      'বইয়ের লাইন টু লাইন দাগানো ক্লাস ও কনসেপ্ট নোটস',
      'দৈনিক ও সাপ্তাহিক ওএমআর ভিত্তিক রিয়েলিস্টিক টেস্ট',
      'মেডিকেল প্রশ্নব্যাংক পোস্টমর্টেম সেশন',
      'টপ র‍্যাঙ্কারদের মেন্টরশিপ ও ট্রিকস'
    ],
    rating: 4.95,
    reviewCount: 3100,
    enrolledCount: 29000,
    totalVideos: 190,
    totalHours: '১৩৫+ ঘণ্টা',
    badge: 'ডিএমসি স্পেশাল',
    featured: true,
    shortDescription: 'সরকারি মেডিকেল কলেজে সাদা এপ্রোনের স্বপ্ন পূরণে প্রতিটি বিষয়ের নিখুঁত ও ট্রিকি প্রস্তুতির এক নম্বর কোর্স।',
    fullDescription: 'মেডিকেল পরীক্ষায় লাখ লাখ শিক্ষার্থীর মধ্যে নিজেকে এগিয়ে রাখতে লাইন বাই লাইন ক্ল্যারিটি এবং অগাধ প্র্যাকটিস নিয়ে সাজানো এই কোর্স।',
    tags: ['medical', 'admission', 'dmc', 'doctor', 'biology']
  },
  {
    id: 'graphic-design',
    slug: 'graphic-design-with-freelancing',
    title: 'Graphic Design ও Freelancing কোর্স',
    subtitle: 'Photoshop, Illustrator ও Canva শিখে ঘরে বসে ফ্রিল্যান্সিং আয় শুরু করুন',
    category: 'skill',
    categoryName: 'স্কিল ও ফ্রিল্যান্সিং',
    instructor: 'আরিফুল ইসলাম',
    instructorTitle: 'টপ রেটেড ফ্রিল্যান্সার (Upwork & Fiverr) ও সিনিয়র ডিজাইনার',
    instructorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80',
    regularPrice: 3000,
    offerPrice: 1750,
    offerExpiryDate: getFutureDate(2),
    courseExpiryDate: null,
    isLifetime: true,
    affiliateUrl: 'https://10minuteschool.com/product/graphic-design/?aff=10mscourse',
    couponCode: 'DESIGN30',
    features: [
      'Adobe Photoshop & Illustrator এর বেসিক থেকে এডভান্সড গাইড',
      'লোগো, ব্যানার, সোশ্যাল মিডিয়া পোস্ট, টি-শার্ট ডিজাইন লাইভ প্রজেক্ট',
      'Fiverr ও Upwork মার্কেটপ্লেসে একাউন্ট খোলা ও গিগ র‍্যাংকিং গাইড',
      'ডিজাইন অ্যাসেট ও প্রিমিয়াম প্রজেক্ট ফাইল ফ্রি ডাউনলোড',
      'পোর্টফোলিও তৈরি ও ক্লায়েন্ট কমিউনিকেশন ট্রেইনিং'
    ],
    rating: 4.85,
    reviewCount: 2200,
    enrolledCount: 41000,
    totalVideos: 72,
    totalHours: '২৫+ ঘণ্টা',
    badge: 'ক্যারিয়ার বুস্টার',
    featured: true,
    shortDescription: 'শূন্য থেকে আন্তর্জাতিক মার্কেটপ্লেসে ডিজাইন সেবা দিয়ে স্বাবলম্বী হওয়ার সম্পূর্ণ প্র্যাকটিক্যাল কোর্স।',
    fullDescription: 'কোন পূর্ব অভিজ্ঞতা ছাড়াই কম্পিউটার ব্যবহার করে কীভাবে আকর্ষণীয় ডিজাইন তৈরি করবেন এবং ফ্রিল্যান্সিং থেকে আয় করবেন তা শিখুন ধাপে ধাপে।',
    tags: ['graphic-design', 'photoshop', 'illustrator', 'freelancing', 'fiverr', 'skill']
  },
  {
    id: 'digital-marketing',
    slug: 'complete-digital-marketing',
    title: 'Facebook Ads & Digital Marketing',
    subtitle: 'সোশ্যাল মিডিয়া মার্কেটিং, গুগল অ্যাডস ও সেলস ফানেল তৈরির মাস্টারক্লাস',
    category: 'skill',
    categoryName: 'স্কিল ও ফ্রিল্যান্সিং',
    instructor: '১০ মিনিট স্কুল গ্রোথ টিম',
    instructorTitle: 'ডিজিটাল মার্কেটিং স্পেশালিস্ট ও পারফরম্যান্স মার্কেটার',
    instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    regularPrice: 3500,
    offerPrice: 2100,
    offerExpiryDate: getFutureDate(8),
    courseExpiryDate: null,
    isLifetime: true,
    affiliateUrl: 'https://10minuteschool.com/product/digital-marketing/?aff=10mscourse',
    couponCode: 'DIGITAL20',
    features: [
      'Facebook ও Instagram টার্গেটেড অ্যাড রান ও বাজেট অপটিমাইজেশন',
      'Google Search, Display ও YouTube Ads ক্যাম্পেইন সেটআপ',
      'SEO (Search Engine Optimization) এর ফান্ডামেন্টালস',
      'ই-কমার্স বিজনেস ও ক্লায়েন্ট হান্টিং স্ট্রেটেজি',
      'প্র্যাকটিক্যাল কেস স্টাডি ও লাইভ ডাটা এনালাইটিক্স'
    ],
    rating: 4.8,
    reviewCount: 1600,
    enrolledCount: 28000,
    totalVideos: 60,
    totalHours: '২০+ ঘণ্টা',
    badge: 'ডিমান্ডিং স্কিল',
    featured: false,
    shortDescription: 'অনলাইন ব্যবসার বিক্রি বাড়ানো কিংবা রিমোট জব ও ফ্রিল্যান্সিংয়ের জন্য প্র্যাকটিক্যাল মার্কেটিং শিখুন।',
    fullDescription: 'ডিজিটাল যুগে যেকোনো ব্র্যান্ডকে মানুষের কাছে পৌঁছানোর জন্য প্রয়োজনীয় ডিজিটাল মার্কেটিং ও অ্যাডভার্টাইজিং টুলসের পূর্ণাঙ্গ কোর্স।',
    tags: ['digital-marketing', 'facebook-ads', 'google-ads', 'marketing', 'skill']
  },
  {
    id: 'class-9-10-batch',
    slug: 'class-9-10-online-batch',
    title: 'ক্লাস ৯-১০ অনলাইন ব্যাচ (বিজ্ঞান)',
    subtitle: 'এসএসসি পরীক্ষার সম্পূর্ণ সিলেবাস বুঝে পড়ার সেরা অনলাইন ব্যাচ',
    category: 'class-9-10',
    categoryName: 'ক্লাস ৯-১০ ও এসএসসি',
    instructor: '১০ মিনিট স্কুল একাডেমি টিম',
    instructorTitle: 'বুয়েট, ঢাকা বিশ্ববিদ্যালয় ও অভিজ্ঞ শিক্ষকবৃন্দ',
    instructorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80',
    regularPrice: 3000,
    offerPrice: 1950,
    offerExpiryDate: getFutureDate(10),
    courseExpiryDate: null,
    isLifetime: true,
    affiliateUrl: 'https://10minuteschool.com/product/class-9-10-batch/?aff=10mscourse',
    couponCode: 'SSC2026',
    features: [
      'গণিত, উচ্চতর গণিত, পদার্থ, রসায়ন ও জীববিজ্ঞান',
      'প্রতিটি অধ্যায়ের বেসিক কনসেপ্ট ও বোর্ড প্রশ্ন সমাধান',
      'অধ্যায়ভিত্তিক লেকচার নোটস ও এমসিকিউ এক্সাম',
      'প্রবলেম সলভিং লাইভ সেশন ও টেলিগ্রাম সাপোর্ট'
    ],
    rating: 4.9,
    reviewCount: 2100,
    enrolledCount: 52000,
    totalVideos: 140,
    totalHours: '৯০+ ঘণ্টা',
    badge: 'একাডেমিক বেস্ট',
    featured: false,
    shortDescription: 'এসএসসি পরীক্ষার ফাউন্ডেশন শক্তিশালী করতে এবং বোর্ড পরীক্ষায় এ+ অর্জন করতে নির্ভরযোগ্য একাডেমিক কোর্স।',
    fullDescription: 'বইয়ের প্রতিটি বিষয় গল্পের মতো সহজে বুঝে পড়ার জন্য প্রস্তুত করা হয়েছে এই কোর্স।',
    tags: ['ssc', 'class-9', 'class-10', 'academic', 'science']
  },
  {
    id: 'class-6-8-all-subjects',
    slug: 'class-6-8-complete-foundation',
    title: 'ক্লাস ৬-৮ অল সাবজেক্ট ফাউন্ডেশন',
    subtitle: 'নতুন শিক্ষাক্রম অনুযায়ী বিষয়ভিত্তিক দক্ষতা ও বেসিক শক্তিশালী করার সহজ কোর্স',
    category: 'class-6-8',
    categoryName: 'ক্লাস ৬-৮',
    instructor: '১০ মিনিট স্কুল জুনিয়র উইং',
    instructorTitle: 'দক্ষ ও শিশুবান্ধব শিক্ষক প্যানেল',
    instructorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
    regularPrice: 2000,
    offerPrice: 1200,
    offerExpiryDate: getFutureDate(5),
    courseExpiryDate: null,
    isLifetime: true,
    affiliateUrl: 'https://10minuteschool.com/product/class-6-8/?aff=10mscourse',
    couponCode: 'JUNIOR10',
    features: [
      'নতুন কারিকুলাম অনুযায়ী গণিত, বিজ্ঞান ও ইংরেজি',
      'ভিজুয়াল এনিমেশনের মাধ্যমে পাঠদান',
      'মজার কুইজ, ওয়ার্কশিট ও প্রজেক্ট বেসড লার্নিং',
      'অভিভাবকদের জন্য প্রগ্রেস ট্র্যাকিং রিপোর্ট'
    ],
    rating: 4.85,
    reviewCount: 950,
    enrolledCount: 19500,
    totalVideos: 95,
    totalHours: '৪৫+ ঘণ্টা',
    badge: 'নতুন কারিকুলাম',
    featured: false,
    shortDescription: 'ষষ্ঠ থেকে অষ্টম শ্রেণির শিক্ষার্থীদের জন্য সহজ ও আনন্দের সাথে নতুন শিক্ষাক্রমের পড়া শেখার কোর্স।',
    fullDescription: 'বইয়ের কঠিন বিষয়গুলো বাস্তব উদাহরণের সাথে অ্যানিমেশনের সাহায্যে শেখানো হয় এই কোর্সে।',
    tags: ['class-6', 'class-7', 'class-8', 'junior', 'curriculum']
  },
  {
    id: 'bcs-preli-course',
    slug: 'bcs-preli-complete-preparation',
    title: 'বিসিএস প্রিলিমিনারি পূর্ণাঙ্গ প্রস্তুতি',
    subtitle: '৪৬তম ও ৪৭তম বিসিএস প্রিলির ২০০ নম্বরের ২০০ নম্বরের সুনির্দিষ্ট প্রস্তুতি',
    category: 'job-prep',
    categoryName: 'চাকরি প্রস্তুতি ও বিসিএস',
    instructor: 'বিসিএস ক্যাডার শিক্ষক প্যানেল',
    instructorTitle: 'সাবেক ও বর্তমান বিসিএস ক্যাডার কর্মকর্তাবৃন্দ',
    instructorImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80',
    regularPrice: 4500,
    offerPrice: 2990,
    offerExpiryDate: getFutureDate(4),
    courseExpiryDate: null,
    isLifetime: true,
    affiliateUrl: 'https://10minuteschool.com/product/bcs-preli/?aff=10mscourse',
    couponCode: 'BCSCADRE',
    features: [
      'বাংলা, ইংরেজি, গণিত, বিজ্ঞান, সাধারণ জ্ঞান ও আইসিটি সম্পূর্ণ কভার',
      '২০০+ বিশদ ক্লাস ও স্পেশাল ট্রিকস',
      'বিগত বছরের প্রশ্ন ও সিলেবাস এনালাইসিস শিট',
      'অধ্যায়ভিত্তিক ও পূর্ণাঙ্গ ২০০ নম্বরের মডেল টেস্ট',
      'টপার্সদের স্ট্র্যাটেজি ও স্টাডি প্ল্যানার'
    ],
    rating: 4.9,
    reviewCount: 1450,
    enrolledCount: 26000,
    totalVideos: 210,
    totalHours: '১৪০+ ঘণ্টা',
    badge: 'সরকারি চাকরি',
    featured: false,
    shortDescription: 'ক্যাডার হওয়ার স্বপ্ন পূরণে বিসিএস প্রিলিমিনারি পরীক্ষার প্রতিটি বিষয়ের নির্ভুল ও সময়োপযোগী প্রস্তুতি।',
    fullDescription: 'বিসিএস পরীক্ষার বিশাল সিলেবাস অল্প সময়ে গুছিয়ে পড়ার কৌশল এবং নিয়মিত পরীক্ষা দিয়ে নিজেকে যাচাই করার কমপ্লিট কোর্স।',
    tags: ['bcs', 'govt-job', 'bank-job', 'job-prep']
  },
  {
    id: 'kids-english-coding',
    slug: 'kids-english-and-coding-starter',
    title: 'Kids English & Phonics Master',
    subtitle: 'ছোটদের জন্য ছবি ও গানের মাধ্যমে সঠিক ইংরেজি উচ্চারণ ও রিডিং শেখার কোর্স',
    category: 'kids',
    categoryName: 'ছোটদের কোর্স',
    instructor: 'মুনজেরিন শহীদ ও কিডস ট্রেইনার',
    instructorTitle: 'ইংলিশ এডুকেটর ও চাইল্ড ডেভেলপমেন্ট ট্রেইনার',
    instructorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop&q=80',
    regularPrice: 1800,
    offerPrice: 1100,
    offerExpiryDate: getFutureDate(9),
    courseExpiryDate: null,
    isLifetime: true,
    affiliateUrl: 'https://10minuteschool.com/product/kids-english/?aff=10mscourse',
    couponCode: 'KIDS50',
    features: [
      'অ্যালফাবেট, ফোনিক্স ও ওয়ার্ড মেকিং এনিমেশন',
      '৫০+ মজার ছড়া ও স্টোরিটেলিং ক্লাস',
      'কালারফুল প্র্যাকটিস শিট ও ড্রয়িং এক্টিভিটি',
      'শিশুর জন্য কোনো বিরক্তি ছাড়া আনন্দময় শিখন'
    ],
    rating: 4.95,
    reviewCount: 780,
    enrolledCount: 14000,
    totalVideos: 55,
    totalHours: '১৫+ ঘণ্টা',
    badge: 'বাচ্চাদের স্পেশাল',
    featured: false,
    shortDescription: '৪ থেকে ১০ বছর বয়সী শিশুদের জন্য ইংরেজি ভীতি দূর করে সঠিক উচ্চারণ ও কথা বলা শেখার আনন্দময় কোর্স।',
    fullDescription: 'কার্টুন, অ্যানিমেশন ও গানের সাহায্যে বাচ্চারা যাতে আনন্দের সাথে ইংরেজি বর্ণমালা ও ফোনিক্স শিখতে পারে তার সেরা কোর্স।',
    tags: ['kids', 'phonics', 'children', 'english']
  },
  {
    id: 'web-development-bootcamp',
    slug: 'web-development-fundamentals',
    title: 'Web Development ও প্রোগ্রামিং ফাউন্ডেশন',
    subtitle: 'HTML, CSS, JavaScript ও React শিখে ফ্রন্টএন্ড ডেভেলপার হয়ে উঠুন',
    category: 'skill',
    categoryName: 'স্কিল ও ফ্রিল্যান্সিং',
    instructor: 'তানভীর হোসাইন',
    instructorTitle: 'সফটওয়্যার ইঞ্জিনিয়ার ও টেক ইন্সট্রাক্টর',
    instructorImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    regularPrice: 4000,
    offerPrice: 2450,
    offerExpiryDate: getFutureDate(12),
    courseExpiryDate: null,
    isLifetime: true,
    affiliateUrl: 'https://10minuteschool.com/product/web-development/?aff=10mscourse',
    couponCode: 'CODE10',
    features: [
      'HTML5, CSS3, Tailwind CSS ও Responsive Design',
      'JavaScript ES6+ এবং আধুনিক প্রোগ্রামিং বেসিক',
      '৫টি রিয়েল ওয়ার্ল্ড লাইভ প্রজেক্ট তৈরি',
      'গিটহাব ও লাইভ হোস্টিং পোর্টফোলিও সেটআপ',
      'ইন্টারভিউ প্রশ্নোত্তর ও প্রবলেম সলভিং'
    ],
    rating: 4.88,
    reviewCount: 1100,
    enrolledCount: 19800,
    totalVideos: 85,
    totalHours: '৩৫+ ঘণ্টা',
    badge: 'টেক স্কিল',
    featured: false,
    shortDescription: 'আইটি সেক্টরে ক্যারিয়ার গড়তে বা ফ্রিল্যান্সিং করতে প্র্যাকটিক্যাল কোডিং শেখার সবচেয়ে সহজ বাংলা কোর্স।',
    fullDescription: 'কোডিং কখনো না করা থাকলেও শুরু থেকে ধাপে ধাপে ওয়েবসাইট বানানো ও কোডিং কনসেপ্ট ক্লিয়ার করার জন্য এই কোর্সটি প্রস্তুত করা হয়েছে।',
    tags: ['coding', 'web-dev', 'programming', 'javascript', 'skill']
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'how-to-choose-course',
    slug: 'best-10-minute-school-courses-guide',
    title: '১০ মিনিট স্কুলের সেরা ৫টি কোর্স: আপনার জন্য কোনটি সবচেয়ে উপযোগী?',
    excerpt: 'স্পোকেন ইংলিশ, আইইএলটিএস নাকি স্কিল ডেভেলপমেন্ট? আপনার বর্তমান লক্ষ্য অনুযায়ী সঠিক কোর্স বেছে নিন সহজে।',
    content: `বর্তমানে অনলাইন এডুকেশনে বাংলাদেশের সবচেয়ে বড় এবং বিশ্বস্ত প্ল্যাটফর্ম হচ্ছে **১০ মিনিট স্কুল**। এখানে প্রায় ১১০+ এর বেশি একাডেমিক এবং স্কিল ডেভেলপমেন্ট কোর্স রয়েছে।

### ১. যদি ক্যারিয়ার বা চাকরির জন্য প্রস্তুতি নেন:
* **ঘরে বসে Spoken English**: ইংরেজির ভয় দূর করতে এবং অফিসে কনফিডেন্টলি কথা বলতে এই কোর্সটি অপরিহার্য।
* **Graphic Design ও Freelancing**: অল্প সময়ে ফ্রিল্যান্সিং মার্কেটপ্লেসে কাজ শুরু করার জন্য সেরা।

### ২. যদি বিদেশে উচ্চশিক্ষা আপনার স্বপ্ন হয়:
* **IELTS Course by Munzereen Shahid**: লিসেনিং, রিডিং, রাইটিং এবং স্পিকিং-এ ব্যান্ড স্কোর ৭.৫+ তোলার সম্পূর্ণ রুটিন ও মেটেরিয়াল রয়েছে এখানে।

### ৩. একাডেমিক শিক্ষার্থী (এসএসসি ও এইচএসসি):
* প্রতিটি বিষয়ের কনসেপ্ট ক্লিয়ার রাখতে ক্র্যাশ কোর্স এবং অনলাইন ব্যাচগুলো সবচেয়ে বেশি ফলপ্রসূ।

আমাদের ওয়েবসাইটের মাধ্যমে কোর্সগুলো কিনলে আপনারা পাচ্ছেন বিশেষ **ডিসকাউন্ট ও প্রমো অফার**। যেকোনো তথ্যে আমাদের হোয়াটসঅ্যাপে নক করুন!`,
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    author: 'ওয়াজিব রহমান (কোর্স স্পেশালিস্ট)',
    date: '১৭ আগস্ট, ২০২৬',
    readTime: '৪ মিনিট',
    category: 'গাইড ও টিপস',
    relatedCourseIds: ['spoken-english', 'ielts-course', 'graphic-design']
  },
  {
    id: 'spoken-english-tips',
    slug: 'spoken-english-daily-tips',
    title: 'প্রতিদিন মাত্র ১৫ মিনিট দিয়ে কীভাবে ফ্লুয়েন্ট স্পোকেন ইংলিশ শিখবেন?',
    excerpt: 'ইংরেজি নিয়ে ভয় আর না! সহজ ৩টি দৈনন্দিন অভ্যাসের মাধ্যমে খুব দ্রুত ইংরেজিতে কথা বলা শুরু করুন।',
    content: `অনেকেই মনে করেন ইংরেজিতে অনর্গল কথা বলার জন্য বিশাল বড় বড় গ্রামার বই মুখস্থ করতে হয়। বাস্তবে কথা বলার জন্য গ্রামারের চেয়ে **লিসেনিং ও প্র্যাকটিস** বেশি দরকার।

### কার্যকর ৩টি কৌশল:
1. **শ্যাডোয়িং টেকনিক (Shadowing Technique)**: মুনজেরিন শহীদের ভিডিও লেকচারগুলো শুনে শুনে উচ্চারণ হুবহু পুনরাবৃত্তি করুন।
2. **প্রতিদিন ৩টি নতুন বাক্য তৈরি করা**: মুখস্থ না করে নিজের দৈনন্দিন কাজের সাথে বাক্যগুলো মেলান।
3. **নিজের সাথে কথা বলা**: আয়নার সামনে দাঁড়িয়ে নিজের সারাদিনের কাজ নিয়ে ৩ মিনিট ইংরেজিতে বলুন।

ঘরে বসে Spoken English কোর্সে এই প্রতিটি টেকনিক ভিডিও আকারে সহজভাবে প্র্যাকটিস করানো হয়েছে।`,
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
    author: 'মুনজেরিন শহীদ ফ্যান ক্লাব টিম',
    date: '১৫ আগস্ট, ২০২৬',
    readTime: '৩ মিনিট',
    category: 'ভাষা শিক্ষা',
    relatedCourseIds: ['spoken-english']
  },
  {
    id: 'hsc-exam-prep-hacks',
    slug: 'hsc-golden-a-plus-study-routine',
    title: 'এইচএসসি পরীক্ষায় ফিজিক্স ও ম্যাথে গোল্ডেন এ+ নিশ্চিত করার টপার হ্যাকস',
    excerpt: 'বোর্ড পরীক্ষায় কম সময়ে শতভাগ নম্বর তোলার ম্যাথমেটিকাল ক্যালকুলেশন ও টাইম ম্যানেজমেন্ট ট্রিকস।',
    content: `এইচএসসি পরীক্ষায় বিজ্ঞান বিভাগের অন্যতম দুটি গুরুত্বপূর্ণ বিষয় হলো পদার্থবিজ্ঞান এবং উচ্চতর গণিত। এখানে এ+ তুলতে হলে শুধু বই পড়লে হবে না, প্রয়োজন সময় বাঁচিয়ে সিকিউ (CQ) ও এমসিকিউ (MCQ) সমাধানের বিশেষ কৌশল।

* **বিগত ১০ বছরের বোর্ড প্রশ্ন**: প্রতিটি অধ্যায় শেষ করার সাথে সাথে টেস্ট পেপারের প্রশ্নগুলো সমাধান করুন।
* **ক্যালকুলেটর ট্রিকস**: এমসিকিউ পরীক্ষায় অন্তত ১০টি ম্যাথ সরাসরি ক্যালকুলেটর শর্টকাটের মাধ্যমে ৫ সেকেন্ডে সমাধান করা যায়।
* **লেকচার শিটের রিভিশন**: শেষ মুহূর্তে পুরো বই না পড়ে ১০ মিনিট স্কুলের কনসাইজ লেকচার নোটস রিভাইস দিন।`,
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    author: 'ইঞ্জি. রাগিব হাসান (বুয়েট)',
    date: '১২ আগস্ট, ২০২৬',
    readTime: '৫ মিনিট',
    category: 'একাডেমিক টিপস',
    relatedCourseIds: ['hsc-crash-course']
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    studentName: 'রাফসান আহমেদ',
    institution: 'নটর ডেম কলেজ, ঢাকা',
    courseId: 'spoken-english',
    courseTitle: 'ঘরে বসে Spoken English',
    rating: 5,
    comment: 'মুনজেরিন আপুর স্পোকেন ইংলিশ কোর্সটি করে আমার ইংরেজিতে কথা বলার জড়তা পুরোপুরি কেটে গেছে। বিশেষ করে এই ওয়েবসাইট থেকে নেওয়া কুপন দিয়ে ডিসকাউন্টে কিনতে পেরে আরও ভালো লেগেছে!',
    date: 'আগস্ট ২০২৬',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-2',
    studentName: 'সুমাইয়া তাসনিম',
    institution: 'ঢাকা বিশ্ববিদ্যালয় শিক্ষার্থী',
    courseId: 'ielts-course',
    courseTitle: 'IELTS Course by Munzereen Shahid',
    rating: 5,
    comment: 'আইইএলটিএস রিডিং ও রাইটিং নিয়ে অনেক দুশ্চিন্তায় ছিলাম। এই কোর্সের প্রতিটি ট্রিকস আমার প্রস্তুতিতে অসাধারণ সাহায্য করেছে। আমার ব্যান্ড স্কোর এসেছে ৮.০!',
    date: 'জুলাই ২০২৬',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-3',
    studentName: 'তানভীর হাসান মাহিম',
    institution: 'এইচএসসি ২০২৫ পরীক্ষার্থী',
    courseId: 'hsc-crash-course',
    courseTitle: 'HSC ক্র্যাশ কোর্স',
    rating: 5,
    comment: 'বুয়েটের ভাইয়াদের ক্লাসগুলো অসাধারণ। ফিজিক্স ও কেমিস্ট্রির কনসেপ্টগুলো এতো সহজে আগে বুঝতে পারিনি। পরীক্ষার আগে এই কোর্সটি আশীর্বাদ!',
    date: 'আগস্ট ২০২৬',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'rev-4',
    studentName: 'সাদিয়া জাহান নিহা',
    institution: 'ফ্রিল্যান্সার ও গ্রাফিক ডিজাইনার',
    courseId: 'graphic-design',
    courseTitle: 'Graphic Design ও Freelancing',
    rating: 5,
    comment: 'কোর্সটি শেষ করার পর আমি ফাইভার-এ আমার প্রথম অর্ডার সম্পন্ন করেছি। কোনো কোডিং ছাড়া শুধু ডিজাইন দিয়ে ঘরে বসে ইনকাম করার সেরা কোর্স।',
    date: 'জুন ২০২৬',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  }
];
