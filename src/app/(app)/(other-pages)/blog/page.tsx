import SectionGridPosts from '@/components/blog/SectionGridPosts'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import React from 'react'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Explore our blog for the latest news, articles, and insights on various topics.',
}

const BlogPage: React.FC = async () => {
  const store = await cookies()
  const locale = store.get('locale')?.value || 'en'

  let articles: any[] = []
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/fetch-table`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tableName: 'articles' }),
    })

    if (res.ok) {
      articles = await res.json()
    } else {
      console.error('Failed to fetch articles', res.status)
    }
  } catch (err) {
    console.error('Fetch error:', err)
  }

  // Map articles to selected locale
  const localizedArticles = articles.map((article: any) => ({
    ...article,
    title: article.title[locale] || article.title.en,
    slug: article.title.en, // keep slug in English
    description: article.description[locale] || article.description.en,
  }))

  return (
    <div>
      <div className="relative container">
        <div className="pb-16 lg:pb-20">
          <SectionGridPosts articles={localizedArticles} className="pt-8 lg:pt-16" />
        </div>
      </div>
    </div>
  )
}

export default BlogPage
