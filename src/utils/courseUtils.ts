import { Course } from '../types';

export const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '';
  return num
    .toString()
    .replace(/\d/g, (digit) => BENGALI_DIGITS[parseInt(digit, 10)]);
}

export function formatBDT(amount: number, banglaDigits = true): string {
  const formatted = new Intl.NumberFormat('en-IN').format(amount);
  if (banglaDigits) {
    return `৳ ${toBengaliNumber(formatted)}`;
  }
  return `৳ ${formatted}`;
}

export function isOfferActive(course: Course): boolean {
  if (!course.offerPrice || course.offerPrice >= course.regularPrice) {
    return false;
  }
  if (!course.offerExpiryDate) {
    return true; // Ongoing offer without specific expiry
  }
  const expiry = new Date(course.offerExpiryDate).getTime();
  const now = Date.now();
  return expiry > now;
}

export function isCourseExpired(course: Course): boolean {
  if (course.isLifetime) {
    return false;
  }
  if (!course.courseExpiryDate) {
    return false;
  }
  const expiry = new Date(course.courseExpiryDate).getTime();
  const now = Date.now();
  return expiry <= now;
}

export function getCurrentPrice(course: Course): number {
  if (isOfferActive(course) && course.offerPrice) {
    return course.offerPrice;
  }
  return course.regularPrice;
}

export function getDiscountPercentage(course: Course): number {
  if (!isOfferActive(course) || !course.offerPrice) {
    return 0;
  }
  const diff = course.regularPrice - course.offerPrice;
  return Math.round((diff / course.regularPrice) * 100);
}

export function getTimeRemaining(expiryDateStr: string | null | undefined): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  formattedBengali: string;
} {
  if (!expiryDateStr) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, formattedBengali: 'মেয়াদ শেষ' };
  }

  const total = new Date(expiryDateStr).getTime() - Date.now();
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, formattedBengali: 'মেয়াদ শেষ' };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  let formattedBengali = '';
  if (days > 0) {
    formattedBengali = `${toBengaliNumber(days)} দিন ${toBengaliNumber(hours)} ঘণ্টা বাকি`;
  } else if (hours > 0) {
    formattedBengali = `${toBengaliNumber(hours)} ঘণ্টা ${toBengaliNumber(minutes)} মিনিট বাকি`;
  } else {
    formattedBengali = `${toBengaliNumber(minutes)} মিনিট ${toBengaliNumber(seconds)} সেকেন্ড বাকি`;
  }

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
    formattedBengali,
  };
}

/**
 * Formats WhatsApp contact (phone number or @username or wa.me link) into a valid URL
 */
export function formatWhatsAppUrl(contactInput: string | undefined | null, message?: string): string {
  if (!contactInput || !contactInput.trim()) {
    contactInput = '8801712345678';
  }
  let input = contactInput.trim();
  const encodedText = message ? encodeURIComponent(message) : '';
  const textQuery = encodedText ? `?text=${encodedText}` : '';

  // 1. If it's already a full URL (https://wa.me/... or http://...)
  if (/^https?:\/\//i.test(input)) {
    const separator = input.includes('?') ? '&' : '?';
    return encodedText ? `${input}${separator}text=${encodedText}` : input;
  }

  // 2. If it starts with wa.me/
  if (/^wa\.me\//i.test(input)) {
    const withoutPrefix = input.replace(/^wa\.me\//i, '');
    return `https://wa.me/${withoutPrefix}${textQuery}`;
  }

  // 3. If it starts with @ (e.g. "@md.me" or "@username")
  if (input.startsWith('@')) {
    return `https://wa.me/${input}${textQuery}`;
  }

  // 4. If it contains alphabetical characters, treat as a WhatsApp username
  const hasLetters = /[a-zA-Z]/.test(input);
  if (hasLetters) {
    const username = input.startsWith('@') ? input : `@${input}`;
    return `https://wa.me/${username}${textQuery}`;
  }

  // 5. Otherwise, treat as a standard phone number
  let cleanNumber = input.replace(/[^0-9]/g, '');
  // Auto-prefix Bangladesh country code if local 11-digit number
  if (cleanNumber.length === 11 && cleanNumber.startsWith('01')) {
    cleanNumber = `88${cleanNumber}`;
  }
  return `https://wa.me/${cleanNumber}${textQuery}`;
}
