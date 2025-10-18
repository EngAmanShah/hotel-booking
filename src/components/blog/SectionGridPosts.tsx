'use client'

import usePagination from '@/hooks/UsePagination'
import { Heading } from '@/shared/Heading'
import Pagination from '@mui/material/Pagination'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { useLocale, useTranslations } from 'next-intl'

export interface Article {
  id: string | number
  slug: string
  title: string
  image: string
  timestamp: string | number | Date
}

interface SectionLatestPostsProps {
  className?: string
  heading?: string
  articles: Article[]
}

const SectionGridPosts: FC<SectionLatestPostsProps> = ({
  className = '',
  articles,
}) => {
  const locale = useLocale()
  const t = useTranslations('Blog') // assumes you have Blog.json with translations for searchPlaceholder, readMore, noResults, noArticles
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResult, setSearchResult] = useState<Article[]>([])

  const articlesToDisplay = searchResult.length > 0 ? searchResult : articles

  const { totalPages, startPageIndex, endPageIndex, currentPageIndex, setcurrentPageIndex, displayPage } =
    usePagination(12, articlesToDisplay.length)

  const currentArticles = articlesToDisplay.slice(startPageIndex, endPageIndex)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim() === '') return setSearchResult([])

    const result = articles.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (result.length > 0) {
      setcurrentPageIndex(1)
      setSearchResult(result)
    } else {
      alert(t('noArticles'))
    }
  }

  // Reset search when locale changes
  useEffect(() => {
    setSearchResult([])
    setSearchQuery('')
  }, [locale])

  return (
    <div className={`relative ${className}`}>
      {articles.length > 0 ? (
        <>
          {/* Heading + Search */}
          <div className="mb-8 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Heading>{t('title')}</Heading>

            <form className="relative w-full sm:w-auto" onSubmit={handleSearch}>
              <input
                type="search"
                className="h-12 w-full rounded-full border border-gray-300 px-4 pr-16 focus:ring-2 focus:ring-yellow-600 focus:outline-none sm:w-64"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  paddingRight: locale === 'en' ? '4rem' : undefined,
                  paddingLeft: locale === 'ar' ? '4rem' : undefined,
                }}
                required
              />
              <button
                type="submit"
                className="absolute top-1/2 -translate-y-1/2 transform rounded-full bg-yellow-600 p-2 text-black transition-colors duration-200 hover:bg-yellow-700"
                style={{
                  left: locale === 'ar' ? '0.5rem' : undefined,
                  right: locale === 'en' ? '0.5rem' : undefined,
                }}
              >
                <IoSearch className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Articles */}
          <div className="container mx-auto py-12">
            <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentArticles.map((article) => (
                <div key={article.id} className="flex h-full flex-col rounded-2xl border border-gray-200 p-2">
                  <div className="relative mb-2 w-full overflow-hidden rounded-xl bg-gray-100 pb-[56.25%]">
                    <Link href={`/blog/${encodeURIComponent(article.slug.replace(/\s+/g, '_'))}`}>
                      <img
                        src={article.image}
                        alt={article.title}
                        className="absolute top-0 left-0 h-full w-full rounded-xl object-cover"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-grow flex-col">
                    <Link
                      href={`/blog/${encodeURIComponent(article.slug.replace(/\s+/g, '_'))}`}
                      className="mb-2 flex-grow text-gray-900 no-underline"
                    >
                      <div className="line-clamp-3 flex items-start font-semibold">{article.title}</div>
                    </Link>
                    <div className="mt-auto flex items-end justify-between">
                      <Link
                        href={`/blog/${encodeURIComponent(article.slug.replace(/\s+/g, '_'))}`}
                        className="text-primary font-medium"
                      >
                        {t('readMore')}
                      </Link>
                      <div className="text-sm text-gray-500">
                        {new Date(article.timestamp).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {articlesToDisplay.length > 12 && (
              <div className="flex justify-center">
                <Pagination
                  count={totalPages}
                  page={currentPageIndex}
                  onChange={(e, page) => displayPage(page)}
                  className="custom-pagination"
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <h5 className="my-12 text-center text-gray-500">{t('noArticles')}</h5>
      )}
    </div>
  )
}

export default SectionGridPosts
