import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

interface LogoProps {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className = 'w-22 sm:w-24' }) => {
  return (
    <Link href="/" className={`inline-block focus:ring-0 focus:outline-hidden ${className}`}>
      <Image
        src="/logo.png"   
        alt="Site Logo"
        width={120}      
        height={40}      
        className="h-14 w-auto"
        priority         
      />
    </Link>
  )
}

export default Logo
