import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    region: string;
    locale: string;
  }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { region, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">
          ← {t("backToHome")}
        </Link>
      </nav>

      <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>

      <div className="prose max-w-none">
        <p className="text-lg mb-4">{t("introduction")}</p>

        <h2 className="text-2xl font-semibold mb-4">{t("features.title")}</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>{t("features.multiRegion")}</li>
          <li>{t("features.multiLanguage")}</li>
          <li>{t("features.userPreferences")}</li>
          <li>{t("features.responsive")}</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">{t("currentSettings")}</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p>
            <strong>{t("region")}:</strong> {region}
          </p>
          <p>
            <strong>{t("language")}:</strong> {locale}
          </p>
        </div>
      </div>
    </div>
  );
}
