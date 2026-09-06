export interface CategoryConfig {
  id: string; // unique slug e.g. 'all', 'language', 'hsc', 'admission', 'skill', etc.
  label: string; // Bengali title e.g. 'স্পোকেন ও ইংলিশ'
  icon: string; // Emoji e.g. '🗣️'
  order: number; // For sorting & moving up/down
  enabled: boolean; // Toggle visible on homepage filter
}

export type CourseCategory = string;

export interface ClassPortalInfo {
  id: string; // e.g. 'class-6', 'class-7', 'class-8', 'class-9', 'class-10', 'hsc', 'admission'
  title: string; // e.g. 'ষষ্ঠ শ্রেণি (Class 6)'
  shortTitle: string; // e.g. 'ক্লাস ৬'
  gradeBadge: string; // e.g. 'নতুন শিক্ষাক্রম ২০২৬'
  icon: string; // e.g. '🎒'
  tagline: string;
  description: string;
  subjects: string[]; // e.g. ['গণিত', 'বিজ্ঞান', 'ইংরেজি', 'বাংলা', 'আইসিটি']
  targetTags: string[]; // tags to match courses e.g. ['class-6', 'junior', 'curriculum']
  categoryMatch?: string; // fallback category
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: CourseCategory;
  categoryName: string;
  instructor: string;
  instructorTitle: string;
  instructorImage?: string;
  thumbnail: string;
  regularPrice: number; // Regular BDT price (e.g. 2500)
  offerPrice?: number | null; // Promo/Offer BDT price (e.g. 1500)
  offerExpiryDate?: string | null; // ISO string e.g. "2026-12-31T23:59:59"
  courseExpiryDate?: string | null; // ISO string e.g. "2026-12-31T23:59:59" or null if lifetime
  isLifetime: boolean;
  affiliateUrl: string; // 10 Minute School affiliate redirect link
  couponCode?: string; // Optional coupon code
  discountPercentage?: number; // Calculated or manually specified
  features: string[]; // Key course perks
  rating: number; // e.g. 4.9
  reviewCount: number; // e.g. 1420
  enrolledCount: number; // e.g. 25000
  totalVideos?: number;
  totalHours?: string;
  badge?: string; // e.g. "বেস্টসেলার", "হট ডিল", "নতুন ব্যাচ"
  featured?: boolean;
  shortDescription: string;
  fullDescription: string;
  syllabus?: { moduleTitle: string; lessonsCount: number; topics: string[] }[];
  faqs?: { question: string; answer: string }[];
  tags: string[]; // for flexible search and custom embed queries
  imageAlt?: string; // SEO alt text for images
  metaDescription?: string; // SEO meta description
  metaKeywords?: string[]; // SEO meta keywords
}

export interface CustomPage {
  id: string; // e.g. "page_1"
  slug: string; // e.g. "spoken-special-offer"
  title: string; // e.g. "স্পোকেন ইংলিশ স্পেশাল অফার পেজ"
  subtitle?: string; // e.g. "১০ মিনিট স্কুলের সেরা সকল স্পোকেন ও আইইএলটিএস কোর্স এক সাথে"
  heroBgGradient?: string; // e.g. "from-red-600 to-rose-800"
  icon?: string; // e.g. "🗣️"
  bannerBadge?: string; // e.g. "এক্সক্লুসিভ অফার পেজ"
  description?: string; // custom markdown or text content
  selectedCourseIds: string[]; // array of selected course IDs!
  showInNavbar?: boolean; // toggle in top navbar
  showInFooter?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
}

export interface NavItemConfig {
  id: string;
  label: string;
  type: 'view' | 'category' | 'class_hub' | 'custom_page' | 'dropdown' | 'link';
  target?: string;
  icon?: string;
  enabled: boolean;
  order: number;
  isExternal?: boolean;
  badgeText?: string;
  dropdownType?: 'classes' | 'categories' | 'custom_pages';
}

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  
  // SEO & Metadata
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  metaAuthor: string;
  canonicalUrl: string;
  faviconUrl?: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;

  // Header Navigation Menu
  navItems?: NavItemConfig[];
  
  // Custom Logo & Branding
  logoType?: 'text_badge' | 'custom_image';
  customLogoUrl?: string;
  logoBadgeNumber: string; // e.g. "10"
  logoMainText: string; // e.g. "MINUTE"
  logoSubText: string; // e.g. "COURSE"
  logoBottomText: string; // e.g. "10MinCourse.com"
  logoTextPrefix: string; // e.g. "10Min"
  logoTextSuffix: string; // e.g. "Course.com"
  logoBadgeText: string; // legacy support
  logoBadgeSub: string; // legacy support
  
  // Announcement / Notice
  headerNotice: string;
  isHeaderNoticeActive: boolean;

  // Countdown Offer Banner Settings
  showCountdownBanner: boolean;
  countdownBannerText: string;
  countdownBannerSubtext?: string;
  countdownTargetDate: string;
  countdownThemeColor: 'crimson' | 'emerald' | 'indigo' | 'amber' | 'dark';

  // Hero Section Texts
  heroBadgeText: string;
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroExtraBadgeText?: string; // e.g. "১১০+ ভেরিফায়েড কোর্স"

  // Best Selling Section
  bestSellingTitle: string;
  bestSellingSubtitle?: string;
  bestSellingButtonText?: string;

  // 4 Feature Pillars (Trust section)
  pillar1Title: string;
  pillar1Sub: string;
  pillar2Title: string;
  pillar2Sub: string;
  pillar3Title: string;
  pillar3Sub: string;
  pillar4Title: string;
  pillar4Sub: string;

  // Main Catalog Section Texts
  catalogTitle: string;
  catalogSubtitle: string;

  // "Why Buy From Us" Section
  whyTitle: string;
  whySubtitle: string;
  whyBenefit1Title: string;
  whyBenefit1Text: string;
  whyBenefit2Title: string;
  whyBenefit2Text: string;
  whyBenefit3Title: string;
  whyBenefit3Text: string;

  // WhatsApp
  whatsappNumber: string; // international format e.g. 8801700000000
  whatsappDisplayNumber: string; // formatted e.g. +880 1700-000000
  whatsappAdvisorName: string; // e.g. "10 Minute Course"
  whatsappWelcomeMessage: string;
  whatsappButtonText?: string;
  autoOpenWhatsApp: boolean;
  autoOpenWhatsAppDelay: number; // seconds

  // Google Meet
  googleMeetLink: string;
  googleMeetUrl?: string; // alias for googleMeetLink
  isMeetLive: boolean; // toggle live meet status
  meetTopic: string;
  meetBannerText?: string; // alias for meetTopic
  meetHostName: string;

  // Footer & Contact
  footerAboutText: string;
  footerDisclaimerText: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  footerCopyrightText: string;

  facebookPageUrl?: string;
  youtubeUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  relatedCourseIds: string[];
}

export interface Review {
  id: string;
  studentName: string;
  institution: string;
  courseId: string;
  courseTitle: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}
