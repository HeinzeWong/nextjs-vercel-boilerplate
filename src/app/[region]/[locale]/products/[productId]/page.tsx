import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./index.module.scss";

// 使用动态导入，但不设置ssr:false（在服务端组件中）
const ClientPriceWrapper = dynamic(
  () => import("@/src/components/product/ClientPriceWrapper").then(mod => ({ default: mod.ClientPriceWrapper })),
  {
    loading: () => (
      <div className={styles.loading}>
        <div className={styles.loadingHeader}>
          <div className={styles.loadingTitle}></div>
          <div className={styles.loadingStatus}></div>
        </div>
        <div className={styles.loadingSubtitle}></div>
      </div>
    ),
  }
);

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
  return [];
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { region, locale, productId } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ProductDetail");

  return (
    <div className={styles.container}>
      <Link
        href="/products"
        className={styles.backLink}
      >
         {t("backToProducts")}
      </Link>

      <h1 className={styles.title}>
        {t("title", { id: productId })}
      </h1>
      
      {/* ISR缓存指示器 - 这个时间会每30秒更新一次 */}
      <div className={styles.cacheBanner}>
        <div className={styles.cacheBannerHeader}>
          <span className={styles.cacheBannerTitle}>🏗️ ISR缓存状态:</span>
        </div>
        <p className={styles.cacheBannerSubtitle}>
          这个时间每30秒更新一次，而下方价格是实时获取的
          <span className={styles.cacheBannerTimestamp}>页面生成时间: {new Date().toLocaleString()}</span>
        </p>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <div className={styles.imageBadge}>
              <span className={styles.imageBadgeText}>🔥 Hot Item</span>
            </div>
            <Image
              src="https://static.mercdn.net/item/detail/orig/photos/m44137797237_1.jpg?1750099402"
              alt="Product Image"
              width={600}
              height={600}
              priority
            />
            <div className={styles.imageOverlay}>
              <div className={styles.imageActions}>
                <button className={styles.actionButton}>
                  <span>❤️</span>
                </button>
                <button className={styles.actionButton}>
                  <span>🔍</span>
                </button>
                <button className={styles.actionButton}>
                  <span>📤</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className={styles.imageThumbnails}>
            <div className={styles.thumbnail}>
              <Image
                src="https://static.mercdn.net/item/detail/orig/photos/m44137797237_1.jpg?1750099402"
                alt="Product Image 1"
                width={80}
                height={80}
              />
            </div>
            <div className={styles.thumbnail}>
              <div className={styles.thumbnailPlaceholder}>+3</div>
            </div>
          </div>
        </div>

        <div className={styles.detailsSection}>
          
          <h2 className={styles.detailsTitle}>{t("details")}</h2>
          
          <div className={styles.ratingSection}>
            <div className={styles.stars}>
              ⭐⭐⭐⭐⭐
            </div>
            <span className={styles.ratingText}>4.8 (124 reviews)</span>
          </div>
          
          <p className={styles.detailsDescription}>
            {t("description", { region, locale, id: productId })}
          </p>
          
          <ClientPriceWrapper productId={productId} />
          
          <div className={styles.actionButtons}>
            <button className={styles.primaryActionButton}>
              💰 Buy Now
            </button>
            <button className={styles.secondaryActionButton}>
              🛒 Add to Cart
            </button>
          </div>

          <div className={styles.detailsList}>
            <div className={styles.detailItem}>
              <strong>{t("region")}:</strong>
              <span className={styles.detailValue}>{region.toUpperCase()}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>{t("language")}:</strong>
              <span className={styles.detailValue}>{locale.toUpperCase()}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>{t("productId")}:</strong>
              <span className={styles.detailValue}>#{productId}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Category:</strong>
              <span className={styles.detailValue}>Trading Cards</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Condition:</strong>
              <span className={styles.detailValue}>Near Mint</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
