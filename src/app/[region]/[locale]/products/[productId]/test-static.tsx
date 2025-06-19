import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.scss";

interface PageProps {
  params: Promise<{
    region: string;
    locale: string;
    productId: string;
  }>;
}

// SSG缓存时间
export const revalidate = 30;

// 预生成静态路径
export async function generateStaticParams() {
  const regions = ['cn', 'jp', 'us'];
  const locales = ['zh', 'ja', 'en'];
  const productIds = ['1', '2', '3', '4', '5'];

  const params = [];
  for (const region of regions) {
    for (const locale of locales) {
      for (const productId of productIds) {
        params.push({
          region,
          locale,
          productId,
        });
      }
    }
  }

  return params;
}

export default async function TestStaticPage({ params }: PageProps) {
  const { region, locale, productId } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ProductDetail");

  // 静态生成的时间戳，用于验证ISR
  const staticTimestamp = new Date().toISOString();

  return (
    <div className={styles.container}>
      <Link
        href="/products"
        className={styles.backLink}
      >
        ← {t("backToProducts")}
      </Link>

      <h1 className={styles.title}>
        {t("title", { id: productId })} - 静态测试版
      </h1>
      
      {/* ISR缓存指示器 */}
      <div className={styles.cacheBanner}>
        <div className={styles.cacheBannerHeader}>
          <span className={styles.cacheBannerTitle}>🏗️ ISR缓存状态:</span>
          <span className={styles.cacheBannerTimestamp}>页面生成时间: {staticTimestamp}</span>
        </div>
        <p className={styles.cacheBannerSubtitle}>
          这个时间每30秒更新一次（完全静态版本）
        </p>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.imageContainer}>
          <Image
            src="https://static.mercdn.net/item/detail/orig/photos/m44137797237_1.jpg?1750099402"
            alt="Product Image"
            width={300}
            height={300}
          />
        </div>

        <div className={styles.detailsSection}>
          <h2 className={styles.detailsTitle}>{t("details")}</h2>
          <p className={styles.detailsDescription}>
            {t("description", { region, locale, id: productId })}
          </p>
          
          {/* 静态价格信息 */}
          <div className={styles.priceSection}>
            <div className={styles.priceSectionLabel}>
              静态价格信息（用于测试ISR）
            </div>
            <div className={styles.priceSectionSubtitle}>
              这是静态生成的内容，会随ISR一起更新
            </div>
          </div>

          <div className={styles.detailsList}>
            <p>
              <strong>{t("region")}:</strong> {region}
            </p>
            <p>
              <strong>{t("language")}:</strong> {locale}
            </p>
            <p>
              <strong>{t("productId")}:</strong> {productId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 