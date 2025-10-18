// app/(other-pages)/about/page.tsx
import { getTranslations } from 'next-intl/server'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import SectionFounder from './SectionFounder'
import SectionHero from './SectionHero'
import rightImg from '@/images/about-hero-right.png'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Bedinroom',
  description:
    'Bedinroom is a leading website offering hotel booking services in Mecca and Medina, affiliated with Atrujah Al-Hijaz Company in Saudi Arabia.',
  openGraph: {
    title: 'About Us - Bedinroom',
    description:
      'Discover more about Bedinroom, a trusted leader in hotel booking services in Mecca and Medina.',
    url: 'https://your-domain.com/about',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'Bedinroom About Us',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Bedinroom',
    description:
      'Reliable and secure hotel booking services in Mecca and Medina.',
    images: ['/og-about.jpg'],
  },
}

const PageAbout = async () => {
  const t = await getTranslations('AboutPage')

  return (
    <div className="relative overflow-hidden">
      <BgGlassmorphism />

      <div className="container flex flex-col gap-y-20 py-16 lg:gap-y-32 lg:py-32">
        {/* Hero Section */}
        <SectionHero
          rightImg={rightImg}
          heading={t('HeroHeading')}
          subHeading={t('HeroSubHeading')}
        />

        {/* Founder / Story Section */}
        <SectionFounder
          heading={t('FounderHeading')}
          paragraphs={[
            t('FounderParagraph1'),
            t('FounderParagraph2'),
            t('FounderParagraph3'),
          ]}
        />
      </div>
    </div>
  )
}

export default PageAbout
