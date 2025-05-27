import HomeHero from "@/components/home/home-hero";
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('test');
  return (
    <div className="flex flex-col items-center justify-center">
      <HomeHero />
      <h1>{t('title')}</h1>
    </div>
  );
}
