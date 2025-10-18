'use client'

import { ThemeContext } from '@/app/theme-provider'
import { getLanguages } from '@/data/navigation'
import { Link } from '@/shared/link'
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverPanelProps,
  TabGroup,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { FC, useContext } from 'react'

const Languages = ({ languages }: { languages: Awaited<ReturnType<typeof getLanguages>> }) => {
  const locale = useLocale()
  const router = useRouter()
  const theme = useContext(ThemeContext)

  const changeLanguage = (newLocale: string) => {
    document.cookie = `locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 30}`

    // Set theme direction based on language
    const newDir = newLocale === 'ar' ? 'rtl' : 'ltr'
    theme?.setThemeDir(newDir)

    // Refresh the page to apply language changes
    router.refresh()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {languages.map((item, index) => {
        // Determine if this language is currently active
        const isActive = (item.name === 'English' && locale === 'en') || (item.name === 'Arabic' && locale === 'ar')

        return (
          <CloseButton
            as={Link}
            href={item.href}
            key={index}
            className={clsx(
              '-m-2.5 flex items-center rounded-lg p-2.5 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-hidden dark:hover:bg-neutral-700',
              isActive ? 'bg-neutral-100 dark:bg-neutral-700' : 'opacity-80'
            )}
            onClick={(e) => {
              e.preventDefault()
              const newLocale = item.name === 'English' ? 'en' : 'ar'
              changeLanguage(newLocale)
            }}
          >
            <div>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.description}</p>
            </div>
          </CloseButton>
        )
      })}
    </div>
  )
}

interface Props {
  panelAnchor?: PopoverPanelProps['anchor']
  panelClassName?: PopoverPanelProps['className']
  className?: string
  languages: Awaited<ReturnType<typeof getLanguages>>
}

const CurrLangDropdown: FC<Props> = ({
  panelAnchor = {
    to: 'bottom end',
    gap: 16,
  },
  className,
  languages,
  panelClassName = 'w-sm',
}) => {
  const t = useTranslations('Header')

  return (
    <Popover className={clsx('group', className)}>
      <PopoverButton className="-m-2.5 flex items-center p-2.5 text-sm font-medium text-neutral-600 group-hover:text-neutral-950 focus:outline-hidden focus-visible:outline-hidden dark:text-neutral-200 dark:group-hover:text-neutral-100">
        <GlobeAltIcon className="size-5" style={{ cursor: 'pointer' }} />
      </PopoverButton>

      <PopoverPanel
        anchor={panelAnchor}
        transition
        className={clsx(
          'z-40 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-black/5 transition duration-200 ease-in-out data-closed:translate-y-1 data-closed:opacity-0 dark:bg-neutral-800',
          panelClassName
        )}
      >
        <TabGroup>
          <TabPanels>
            <TabPanel className="rounded-xl p-3 focus:ring-0 focus:outline-hidden">
              <Languages languages={languages} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </PopoverPanel>
    </Popover>
  )
}

export default CurrLangDropdown
