import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import styles from "./index.module.scss";

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
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          ← {t("backToHome")}
        </Link>
      </nav>

      <h1 className={styles.title}>{t("title")}</h1>

      <div className={styles.prose}>
        <p>{t("introduction")}</p>

        <h2>{t("features.title")}</h2>
        <ul>
          <li>{t("features.multiRegion")}</li>
          <li>{t("features.multiLanguage")}</li>
          <li>{t("features.userPreferences")}</li>
          <li>{t("features.responsive")}</li>
        </ul>

        <h2>{t("currentSettings")}</h2>
        <div className={styles.settingsSection}>
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
