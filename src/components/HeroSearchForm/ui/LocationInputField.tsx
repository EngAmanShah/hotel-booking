'use client'

import { Listbox } from '@headlessui/react'
import { MapPinIcon, ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import { useLocale } from 'next-intl'


type Suggest = {
  id: string
  name: string
}

interface Props {
  className?: string
  inputName?: string
  fieldStyle?: 'default' | 'small'
  locale?: string // optional locale prop
}

const styles = {
  button: {
    base: 'relative z-10 cursor-pointer flex items-center justify-between gap-x-3 border rounded-full bg-white w-134 mx-auto',
    default: 'px-5 py-3',
    small: 'px-4 py-2 text-sm',
  },
  panel: {
    base: 'absolute mt-2 max-h-60 w-64 mx-auto overflow-y-auto rounded-xl bg-white shadow-lg ring-1 ring-black/5 z-40',
  },
}

export const LocationInputField: FC<Props> = ({
  className = 'flex-1 px-6',
  inputName = 'location',
  fieldStyle = 'default',
}) => {
  const [suggests, setSuggests] = useState<Suggest[]>([])
  const [selected, setSelected] = useState<Suggest | null>(null)
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

        // Map cities with correct locale
        const mapped: Suggest[] = data.map((city: any) => ({
          id: city.id,
          name: city.title[locale] || city.title.en, // <-- pick locale first, fallback to English
        }))

        setSuggests(mapped)
        if (mapped.length > 0) setSelected(mapped[0])
      } catch (err) {
        console.error(err)
      }
    }

    fetchCities()
  }, [locale])

  if (!selected) return null // or a loading state

  return (
    <div className={clsx('relative mt-6', className)}>
      <Listbox value={selected} onChange={setSelected}>
        <Listbox.Button className={clsx(styles.button.base, styles.button[fieldStyle])}>
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-neutral-400" />
            <span className="font-medium text-neutral-700">{selected.name}</span>
          </div>
          <ChevronUpDownIcon className="h-5 w-5 text-neutral-500" />
        </Listbox.Button>

        <Listbox.Options className={clsx(styles.panel.base)}>
          {suggests.map((item) => (
            <Listbox.Option
              key={item.id}
              value={item}
              className={({ active }) =>
                `flex items-center gap-2 px-4 py-2 cursor-pointer ${active ? 'bg-neutral-100' : ''}`
              }
            >
              {({ selected }) => (
                <>
                  <MapPinIcon className="h-5 w-5 text-neutral-400" />
                  <span className="text-neutral-700 flex-1">{item.name}</span>
                  {selected && <CheckIcon className="h-5 w-5 text-primary-500" />}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>

      <input type="hidden" name={inputName} value={selected.id} />
    </div>
  )
}
