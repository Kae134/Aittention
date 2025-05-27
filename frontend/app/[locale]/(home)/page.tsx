import HomeHero from "@/components/home/home-hero";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function page() {
  const t = useTranslations('test');
  return (
    <div className="flex flex-col items-center justify-center">
      <HomeHero />
      <h1>{t('title')}</h1>
      <Link href="/about">{t('about')}</Link>
    </div>
  );
}
