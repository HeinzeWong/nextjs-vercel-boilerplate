import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";

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
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/products"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← {t("backToProducts")}
      </Link>

      <h1 className="text-3xl font-bold mb-6">
        {t("title", { id: productId })} - 静态测试版
      </h1>
      
      {/* ISR缓存指示器 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 font-medium">🏗️ ISR缓存状态:</span>
          <span className="text-blue-800">页面生成时间: {staticTimestamp}</span>
        </div>
        <p className="text-blue-600 text-sm mt-1">
          这个时间每30秒更新一次（完全静态版本）
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
          <Image
            src="https://static.mercdn.net/item/detail/orig/photos/m44137797237_1.jpg?1750099402"
            alt="Product Image"
            width={300}
            height={300}
            className="h-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">{t("details")}</h2>
          <p className="text-gray-600 mb-4">
            {t("description", { region, locale, id: productId })}
          </p>
          
          {/* 静态价格信息 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="text-lg font-medium text-gray-600">
              静态价格信息（用于测试ISR）
            </div>
            <div className="text-sm text-gray-500 mt-1">
              这是静态生成的内容，会随ISR一起更新
            </div>
          </div>

          <div className="space-y-2 mt-4">
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