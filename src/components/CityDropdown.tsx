'use client'

import { useState, useEffect } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Button } from '@/shared/Button'
import clsx from 'clsx'
import { useLocale } from 'next-intl'

type City = {
  id: string
  name: string
}

export default function CityDropdown() {
  const [cities, setCities] = useState<City[]>([])
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const locale = useLocale()

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
        if (mapped.length > 0) setSelectedCity(mapped[0])
      } catch (err) {
        console.error(err)
      }
    }
    fetchCities()
  }, [locale])

  if (!selectedCity) return null

  return (
    <div className="flex flex-wrap md:gap-x-4 md:gap-y-2">
      <Popover className="relative">
        <PopoverButton
          as={Button}
          outline
          className={clsx(
            'md:px-4',
            'border-black! ring-1 ring-black ring-inset dark:border-neutral-200! dark:ring-neutral-200'
          )}
        >
          <span>{selectedCity.name}</span>
          <ChevronDownIcon className="size-4" />
        </PopoverButton>

        <PopoverPanel
          transition
          className="absolute -start-5 top-full z-10 mt-3 w-56 rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
        >
          <div className="hidden-scrollbar max-h-64 overflow-y-auto px-4 py-3">
            {cities.map((city) => (
              <div
                key={city.id}
                onClick={() => setSelectedCity(city)}
                className={clsx(
                  'cursor-pointer rounded-lg px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800',
                  selectedCity.id === city.id && 'bg-neutral-200 dark:bg-neutral-700'
                )}
              >
                {city.name}
              </div>
            ))}
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  )
}
