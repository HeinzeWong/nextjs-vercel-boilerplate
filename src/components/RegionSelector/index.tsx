"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { COOKIE_CONFIG, COOKIE_KEYS, LOCALE_CONFIG, REGIONS, type Locale, type Region } from "../../libs";
import styles from "./index.module.scss";

interface RegionSelectorProps {
  currentRegion: Region;
  currentLocale: Locale;
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

  const handleRegionChange = async (regionCode: Region) => {
    Cookies.set(COOKIE_KEYS.USER_REGION, regionCode, {
      expires: COOKIE_CONFIG.EXPIRES_DAYS,
    });

    // 检测pathname是否包含region，如果包含，需要清掉region，不然地区设置不生效
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

  };

  const handleLocaleChange = async (localeCode: string) => {
    // 检查当前地区是否支持选择的语言
    const supportedLocales = LOCALE_CONFIG[currentRegion as Region].supportedLocales || [];
    if (!supportedLocales.includes(localeCode as Locale)) {
      return;
    }

    Cookies.set(COOKIE_KEYS.USER_LOCALE, localeCode, {
      expires: COOKIE_CONFIG.EXPIRES_DAYS,
    });
    window.location.reload();

   
  };

  const currentRegionInfo = regionDisplayInfo.find(
    (r) => r.code === currentRegion
  );
  const currentLocaleInfo = localeDisplayInfo.find(
    (l) => l.code === currentLocale
  );
  const availableLocales = localeDisplayInfo.filter((l) =>
    LOCALE_CONFIG[currentRegion as Region]?.supportedLocales.includes(l.code)
  );

  return (
    <div className={styles.regionSelector}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.trigger}
      >
        <span>{currentRegionInfo?.flag}</span>
        <span>{currentRegionInfo?.name}</span>
        <span className={styles.localeName}>({currentLocaleInfo?.name})</span>
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
        <div className={styles.dropdown}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              选择地区
            </h3>
            <div className={styles.sectionOptions}>
              {regionDisplayInfo.map((region) => (
                <button
                  key={region.code}
                  onClick={() => handleRegionChange(region.code)}
                  className={`${styles.option} ${
                    currentRegion === region.code ? styles.optionActive : ""
                  }`}
                >
                  <span>{region.flag}</span>
                  <span>{region.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`${styles.section} ${styles.sectionBordered}`}>
            <h3 className={styles.sectionTitle}>
              选择语言
            </h3>
            <div className={styles.sectionOptions}>
              {availableLocales.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => handleLocaleChange(locale.code)}
                  className={`${styles.option} ${
                    currentLocale === locale.code ? styles.optionActive : ""
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
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
} 