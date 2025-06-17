"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import {
  REGIONS,
  LOCALES,
  REGION_LOCALE_MAP,
  COOKIE_KEYS,
  COOKIE_CONFIG,
  type Region,
  type Locale,
} from "@/src/constants/cookies";

interface RegionSelectorProps {
  currentRegion: string;
  currentLocale: string;
}

const regionDisplayInfo = [
  { code: "cn" as const, name: "中国", flag: "🇨🇳" },
  { code: "jp" as const, name: "日本", flag: "🇯🇵" },
  { code: "us" as const, name: "United States", flag: "🇺🇸" },
];

const localeDisplayInfo = [
  { code: "zh" as const, name: "中文" },
  { code: "ja" as const, name: "日本語" },
  { code: "en" as const, name: "English" },
];

export default function RegionSelector({
  currentRegion,
  currentLocale,
}: RegionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleRegionChange = async (regionCode: string) => {
    // const defaultLocale = REGION_LOCALE_MAP[regionCode as Region]?.[0] || "en";

    // 检测pathname是否包含region，如果包含，需要清掉region，不然地区设置不生效
    
    // 直接setCookie就好了，不走api
    Cookies.set(COOKIE_KEYS.USER_SELECTED_REGION, regionCode, {
      expires: COOKIE_CONFIG.EXPIRES_DAYS,
    });
    // Cookies.set(COOKIE_KEYS.USER_SELECTED_LOCALE, defaultLocale, {
    //   expires: COOKIE_CONFIG.EXPIRES_DAYS,
    // });

    const pathname = window.location.pathname
    const pathSegments = pathname.split('/').filter(Boolean)
    const isRegionPath = REGIONS.includes(pathSegments[0] as Region)
    if (isRegionPath) {
      pathSegments.shift()
      console.log(pathSegments.join('/'))
      window.location.replace(`/${pathSegments.join('/')}`)
    } else {
      window.location.reload();
    }

    // try {
    //   const response = await fetch('/api/preferences', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       region: regionCode,
    //       locale: defaultLocale
    //     }),
    //   })

    //   if (response.ok) {
    //     window.location.reload()
    //   }
    // } catch (error) {
    //   console.error('Failed to update preferences:', error)
    //   // 回退到原来的方法
    //   Cookies.set(COOKIE_KEYS.USER_SELECTED_REGION, regionCode, { expires: COOKIE_CONFIG.EXPIRES_DAYS })
    //   Cookies.set(COOKIE_KEYS.USER_SELECTED_LOCALE, defaultLocale, { expires: COOKIE_CONFIG.EXPIRES_DAYS })
    //   window.location.reload()
    // }
  };

  const handleLocaleChange = async (localeCode: string) => {
    // 检查当前地区是否支持选择的语言
    const supportedLocales = REGION_LOCALE_MAP[currentRegion as Region] || [];
    if (!supportedLocales.includes(localeCode as Locale)) {
      return;
    }

    Cookies.set(COOKIE_KEYS.USER_SELECTED_LOCALE, localeCode, {
      expires: COOKIE_CONFIG.EXPIRES_DAYS,
    });
    window.location.reload();

    // try {
    //   const response = await fetch("/api/preferences", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       region: currentRegion,
    //       locale: localeCode,
    //     }),
    //   });

    //   if (response.ok) {
    //     window.location.reload();
    //   }
    // } catch (error) {
    //   console.error("Failed to update preferences:", error);
    //   // 回退到原来的方法
    //   Cookies.set(COOKIE_KEYS.USER_SELECTED_LOCALE, localeCode, {
    //     expires: COOKIE_CONFIG.EXPIRES_DAYS,
    //   });
    //   window.location.reload();
    // }
  };

  const currentRegionInfo = regionDisplayInfo.find(
    (r) => r.code === currentRegion
  );
  const currentLocaleInfo = localeDisplayInfo.find(
    (l) => l.code === currentLocale
  );
  const availableLocales = localeDisplayInfo.filter((l) =>
    REGION_LOCALE_MAP[currentRegion as Region]?.includes(l.code)
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span>{currentRegionInfo?.flag}</span>
        <span>{currentRegionInfo?.name}</span>
        <span className="text-gray-500">({currentLocaleInfo?.name})</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <div className="p-2">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              选择地区
            </h3>
            <div className="space-y-1">
              {regionDisplayInfo.map((region) => (
                <button
                  key={region.code}
                  onClick={() => handleRegionChange(region.code)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100 rounded transition-colors ${
                    currentRegion === region.code
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }`}
                >
                  <span>{region.flag}</span>
                  <span>{region.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t p-2">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              选择语言
            </h3>
            <div className="space-y-1">
              {availableLocales.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => handleLocaleChange(locale.code)}
                  className={`w-full px-3 py-2 text-left hover:bg-gray-100 rounded transition-colors ${
                    currentLocale === locale.code
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }`}
                >
                  {locale.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
