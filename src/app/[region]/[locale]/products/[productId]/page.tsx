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

export default async function ProductDetailPage({ params }: PageProps) {
  const { region, locale, productId } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ProductDetail");

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/products"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← {t("backToProducts")}
      </Link>

      <h1 className="text-3xl font-bold mb-6">
        {t("title", { id: productId })}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
          <Image
            src="https://static.mercdn.net/item/detail/orig/photos/m44137797237_1.jpg?1750099402"
            alt="Product Image"
            width={300}
            height={300}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">{t("details")}</h2>
          <p className="text-gray-600 mb-4">
            {t("description", { region, locale, id: productId })}
          </p>

          <div className="space-y-2">
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
