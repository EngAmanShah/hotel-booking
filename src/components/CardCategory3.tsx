import { TCategory } from '@/data/categories'
import convertNumbThousand from '@/utils/convertNumbThousand'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export interface CardCategory3Props {
  className?: string
  category: category
}

type category ={
  title:string,
  image:string
}

const CardCategory3: FC<CardCategory3Props> = ({ className = '', category }) => {
  const { title,image } = category

  return (
    <div className={`group relative flex flex-col ${className}`}>
      <div className={`aspect-w-5 relative h-0 w-full shrink-0 overflow-hidden rounded-2xl aspect-h-5 sm:aspect-h-6`}>
        
          <img
            src={image}
            className="rounded-2xl object-cover"
            alt={title}
            width="(max-width: 400px) 100vw, 300px"
          />
        <span className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100"></span>
      </div>
      <div className="mt-4">
        <h2 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
          <Link href={"/stay-categories/all"} className="absolute inset-0"></Link>
          <span className="line-clamp-1">{title}</span>
        </h2>
      </div>
    </div>
  )
}

export default CardCategory3
