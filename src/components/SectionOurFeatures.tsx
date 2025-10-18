import clsx from 'clsx'
import { FC } from 'react'
import { StaticImageData } from 'next/image'

interface Props {
  className?: string
  rightImg?: StaticImageData
  type?: string
}

const SectionOurFeatures: FC<Props> = ({ className, rightImg, type }) => {
  return (
    <div className={clsx('relative flex flex-col items-center', className)}>
      {rightImg && <img src={rightImg.src} alt="Features" />}
      {type && <p>{type}</p>}
    </div>
  )
}

export default SectionOurFeatures
