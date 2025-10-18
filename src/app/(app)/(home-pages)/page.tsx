import BgGlassmorphism from '@/components/BgGlassmorphism'
import HeroSectionWithSearchForm1 from '@/components/hero-sections/HeroSectionWithSearchForm1'
import HeroSearchForm from '@/components/HeroSearchForm/HeroSearchForm'
import SectionGridFeaturePlaces from '@/components/SectionGridFeaturePlaces'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import heroImage from '@/images/hero-right.png'
import ButtonPrimary from '@/shared/ButtonPrimary'
import HeadingWithSub from '@/shared/Heading'
import { getTranslations } from 'next-intl/server'
import { cookies } from 'next/headers'

import { getAuthors } from '@/data/authors'
import { getStayListings } from '@/data/listings'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page of the Stay application',
}

export default async function Page() {
  const t = await getTranslations('HomePage') // ✅ server-safe version
  // const categories = await getStayCategories()
  const stayListings = await getStayListings()
  const authors = await getAuthors()
  const store = await cookies()
  const locale = store.get('locale')?.value || 'en'

  let categories: any[] = []

  try {
    const res = await fetch('http://localhost:3000/api/fetch-table', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tableName: 'cities' }),
    })

    if (res.ok) {
      categories = await res.json()
    } else {
      console.error('Failed to fetch articles', res.status)
    }
  } catch (err) {
    console.error('Fetch error:', err)
  }

  const localizedCategories = categories.map((category: any) => ({
    ...category,
    title: category.title[locale] || category.title.en,
  }))

  return (
    <main className="relative overflow-hidden">
      <BgGlassmorphism />

      <div className="relative container mb-24 flex flex-col gap-y-24 lg:mb-28 lg:gap-y-32">
        {/* Hero Section */}
        <HeroSectionWithSearchForm1
          heading={t('HeroHeading')}
          image={heroImage}
          imageAlt="hero"
          searchForm={<HeroSearchForm initTab="Stays" />}
          description={
            <>
              <p className="white:text-neutral-400 max-w-xl text-base text-neutral-500 sm:text-xl">
                {t('HeroDescription')}
              </p>
              <ButtonPrimary href={'/stay-categories/all'} className="!text-white sm:text-base/normal dark:!text-white">
                {t('HeroButton')}
              </ButtonPrimary>
            </>
          }
        />

        {/* Categories Section */}
        <div>
          <HeadingWithSub subheading={t('SectionSubheading')}>{t('SectionHeading')}</HeadingWithSub>
          <SectionSliderNewCategories categoryCardType="card3" categories={localizedCategories} />
        </div>

        {/* Featured Places */}
        <SectionGridFeaturePlaces stayListings={stayListings} cardType="card2" />
      </div>
    </main>
  )
}
