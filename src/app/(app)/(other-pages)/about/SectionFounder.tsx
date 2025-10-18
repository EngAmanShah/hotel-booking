// app/(other-pages)/about/SectionFounder.tsx
import Heading from '@/shared/Heading'
import Logo from '@/shared/Logo'

interface SectionFounderProps {
  heading: string
  paragraphs: string[]
}

const SectionFounder = ({ heading, paragraphs }: SectionFounderProps) => {
  return (
    <section className="relative mx-auto max-w-4xl px-4 py-16 text-center lg:text-left">
      <Heading subheading={heading}>
        <Logo />
      </Heading>

      <div className="mt-8 space-y-6 text-base text-neutral-700 dark:text-neutral-200 md:text-lg leading-relaxed">
        {paragraphs.map((p, index) => (
          <p
            key={index}
            className="transition-opacity duration-500 hover:opacity-80"
          >
            {p}
          </p>
        ))}
      </div>
    </section>
  )
}

export default SectionFounder
