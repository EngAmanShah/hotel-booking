import { getStayCategories } from '@/data/categories'
import { getLanguages } from '@/data/navigation'
import Logo from '@/shared/Logo'
import clsx from 'clsx'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { FC } from 'react'
import CurrLangDropdown from './CurrLangDropdown'
import HamburgerBtnMenu from './HamburgerBtnMenu'

interface HeaderProps {
  hasBorderBottom?: boolean
  className?: string
}

const Header: FC<HeaderProps> = async ({ hasBorderBottom = true, className }) => {
  const languages = await getLanguages()
  const categories = await getStayCategories()
  const featuredCategory = categories[7]
  const t = await getTranslations('Header')

  const pages = [
    { name: t('Home'), href: '/' },
    { name: t('Hotels'), href: '/stay-categories/all' },
    { name: t('AboutUs'), href: '/about' },
    { name: t('Blog'), href: '/blog' },
    { name: t('Contact'), href: '/contact' },
  ]

  return (
    <div className={clsx('z-50 bg-white dark:bg-neutral-900', className)}>
      <div className="container">
        <div
          className={clsx(
            'flex h-20 justify-between gap-x-2.5 border-neutral-200 dark:border-neutral-700',
            hasBorderBottom && 'border-b',
            !hasBorderBottom && 'has-[.header-popover-full-panel]:border-b'
          )}
        >
          <div className="flex items-center justify-center gap-x-3 sm:gap-x-8">
            <Logo />

            <div className="hidden items-center gap-x-6 md:flex">
              {pages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="text-sm font-medium text-neutral-700 transition hover:text-primary-600 dark:text-neutral-300 dark:hover:text-white"
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-2.5 sm:gap-x-6">
            <div className="block lg:hidden">
              <HamburgerBtnMenu />
            </div>
            {/*<SwitchDarkMode2 />*/}
            <CurrLangDropdown languages={languages} className="hidden md:block" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
