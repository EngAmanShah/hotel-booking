'use client'

import { TStayListing } from '@/data/listings'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { FC, ReactNode, useEffect, useState } from 'react'
import SectionTabHeader from './SectionTabHeader'
import StayCard from './StayCard'
import StayCard2 from './StayCard2'
import { useTranslations, useLocale } from 'next-intl'

interface SectionGridFeaturePlacesProps {
  stayListings: TStayListing[]
  gridClass?: string
  headingKey?: string
  subHeadingKey?: string
  cardType?: 'card1' | 'card2'
  locale?: string
}

type City = {
  id: string
  name: string
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = [],
  gridClass = '',
  headingKey = 'SectionGrid.featuredHotels',
  subHeadingKey = 'SectionGrid.subHeading',
  cardType = 'card2',
}) => {
  const [cities, setCities] = useState<City[]>([])
  const t = useTranslations() // next-intl translation hook
    const locale=useLocale()

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch('/api/fetch-table', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tableName: 'cities' }),
        })
        if (!res.ok) throw new Error('Failed to fetch cities')
        const data = await res.json()
        const mapped = data.map((city: any) => ({
          id: city.id,
          name: city.title[locale] || city.title.en,
        }))
        setCities(mapped)
      } catch (err) {
        console.error(err)
      }
    }
    fetchCities()
  }, [locale])

  let CardName = cardType === 'card2' ? StayCard2 : StayCard

  if (cities.length === 0) return null

  return (
    <div className="relative">
      <SectionTabHeader
        tabActive={cities[0].name}
        subHeading={t(subHeadingKey)}
        tabs={cities.map((c) => c.name)}
        heading={t(headingKey)}
      />
      <div
        className={`mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {stayListings.map((stay) => (
          <CardName key={stay.id} data={stay} />
        ))}
      </div>
      <div className="mt-16 flex items-center justify-center">
        <ButtonPrimary href={'/stay-categories/all'} className="!text-white dark:!text-white">
          {t('SectionGrid.showMore')}
          <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
        </ButtonPrimary>
      </div>
    </div>
  )
}

export default SectionGridFeaturePlaces
