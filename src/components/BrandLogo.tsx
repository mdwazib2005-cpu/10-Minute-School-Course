import React from 'react';
import { useCourse } from '../context/CourseContext';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', size = 'md' }) => {
  const { siteSettings } = useCourse();
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  // If custom logo image URL is provided by admin
  if (siteSettings?.logoType === 'custom_image' && siteSettings?.customLogoUrl) {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img 
          src={siteSettings.customLogoUrl} 
          alt={siteSettings.siteName || 'Logo'} 
          className={`object-contain ${
            isSm ? 'h-7' : isLg ? 'h-12' : 'h-9 sm:h-10'
          }`}
        />
      </div>
    );
  }

  const badgeNumber = siteSettings?.logoBadgeNumber || '10';
  const mainText = siteSettings?.logoMainText || 'MINUTE';
  const subText = siteSettings?.logoSubText || 'SCHOOL';
  const bottomText = siteSettings?.logoBottomText || siteSettings?.siteName || '10mscourse.shop';

  return (
    <div className={`inline-flex flex-col items-stretch select-none group ${className}`}>
      <div className="flex items-center gap-1.5 leading-none">
        
        {/* The 10 Graphic with the Red 10MS Polygon Accent */}
        <div className="flex items-center tracking-tight">
          {/* First digit or custom badge number */}
          {badgeNumber === '10' ? (
            <>
              {/* '1' */}
              <span className={`font-black text-slate-900 font-sans tracking-tighter leading-none ${
                isSm ? 'text-2xl' : isLg ? 'text-4xl' : 'text-3xl sm:text-[34px]'
              }`}>
                1
              </span>

              {/* '0' with red accent */}
              <div className={`relative ${isSm ? 'w-5 h-5 ml-0.5' : isLg ? 'w-8 h-8 ml-1' : 'w-7 h-7 ml-0.5'}`}>
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Black Outer Ring of 0 */}
                  <path
                    d="M 50 4 C 24.5 4 4 24.5 4 50 C 4 75.5 24.5 96 50 96 C 75.5 96 96 75.5 96 50 C 96 41 93.5 32.5 89 25.5 L 72 38 C 74.5 41.5 76 45.5 76 50 C 76 64.3 64.3 76 50 76 C 35.7 76 24 64.3 24 50 C 24 35.7 35.7 24 50 24 C 54.5 24 58.5 25.5 62 28 L 74 11 C 67 6.5 58.8 4 50 4 Z"
                    fill="#1E1E1E"
                  />
                  {/* Red Chevron Polygon inside 0 */}
                  <path
                    d="M 52 8 L 94 48 L 62 80 L 44 62 L 64 48 L 44 28 Z"
                    fill="#EA1D2C"
                  />
                </svg>
              </div>
            </>
          ) : (
            <span className={`font-black text-[#EA1D2C] font-sans tracking-tighter leading-none mr-1 ${
              isSm ? 'text-2xl' : isLg ? 'text-4xl' : 'text-3xl sm:text-[34px]'
            }`}>
              {badgeNumber}
            </span>
          )}
        </div>

        {/* Right stacked text: MINUTE / COURSE */}
        <div className="flex flex-col justify-center leading-none font-sans font-black tracking-tight text-slate-900 ml-0.5">
          <span className={`font-black tracking-wider uppercase leading-none ${
            isSm ? 'text-[11px]' : isLg ? 'text-base' : 'text-[13px] sm:text-[14px]'
          }`}>
            {mainText}
          </span>
          <span className={`font-black tracking-wider uppercase leading-none mt-0.5 ${
            isSm ? 'text-[11px]' : isLg ? 'text-base' : 'text-[13px] sm:text-[14px]'
          }`}>
            {subText}
          </span>
        </div>

      </div>

      {/* Solid Red Rectangle Bar with bottom text */}
      {bottomText && (
        <div className="w-full bg-[#EA1D2C] text-white text-[9px] sm:text-[10px] font-mono font-bold text-center py-0.5 px-2 rounded-xs mt-1 tracking-wider shadow-xs uppercase truncate">
          {bottomText}
        </div>
      )}
    </div>
  );
};

