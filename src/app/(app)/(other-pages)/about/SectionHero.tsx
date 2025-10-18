// app/(other-pages)/about/SectionHero.tsx
import Image, { StaticImageData } from 'next/image'
import { FC, ReactNode } from 'react'

interface Props {
  className?: string
  rightImg: StaticImageData
  heading: ReactNode
  subHeading: string
}

const SectionHero: FC<Props> = ({
  className = '',
  rightImg,
  heading,
  subHeading,
}) => {
  return (
    <section
      className={`relative flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-20 ${className}`}
    >
      {/* Text Content */}
      <div className="max-w-2xl text-center lg:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          {heading}
        </h1>
        <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 sm:text-xl leading-relaxed">
          {subHeading}
        </p>
      </div>

      {/* Image */}
      <div className="flex-shrink-0 w-full max-w-md lg:max-w-lg xl:max-w-xl">
        <Image
          className="rounded-2xl shadow-lg"
          src={rightImg}
          alt="About illustration"
          priority
        />
      </div>
    </section>
  )
}

export default SectionHero
