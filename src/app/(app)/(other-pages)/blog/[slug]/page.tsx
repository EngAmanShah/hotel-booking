import { notFound } from 'next/navigation'
import {cookies} from 'next/headers';

const translations = {
  en: {
    noArticle: 'Article not found',
  },
  ar: {
    noArticle: 'المقال غير موجود',
  },
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const store = await cookies();
      const locale = store.get('locale')?.value || 'en';

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

  const article = articles.find((a: any) => a.title.en === slug.replace(/_/g, ' '))

  if (!article) {
    notFound()
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Title */}
      <h1 className="mb-4 text-center text-3xl sm:text-4xl font-semibold">
        {article.title[locale]}
      </h1>

      {/* Date */}
      <div className="text-center text-gray-500 font-bold mb-8 text-lg">
        {new Date(article.timestamp).toLocaleDateString(locale==="en"?'en-US':"ar-SA", {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </div>

      {/* Image */}
      <div className="relative w-full mb-8 overflow-hidden rounded-3xl">
        <div className="pt-[56.25%] bg-gray-200 w-full" />
        <img
          src={article.image}
          alt={article.title.en}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
          loading="lazy"
        />
      </div>

      {/* Description */}
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.description[locale] }} />
    </div>
  )
}
