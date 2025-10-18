export async function getNavigation(): Promise<TNavigationItem[]> {
  return [
    {
      id: '1',
      href: '/about-us',
      name: 'About Us',
    },
    {
      id: '2',
      href: '/blog',
      name: 'Blog',
    },
    {
      id: '3',
      href: '/privacy-policy',
      name: 'Privacy Policy',
    },
    {
      id: '4',
      href: '/terms-and-conitions',
      name: 'Terms & Conditions',
    },
  ]
}

// ============ TYPE =============
export type TNavigationItem = Partial<{
  id: string
  href: string
  name: string
  type?: 'dropdown' | 'mega-menu'
  isNew?: boolean
  children?: TNavigationItem[]
}>

export const getLanguages = async () => {
  return [
    {
      id: 'English',
      name: 'English',
      description: 'United State',
      href: '#',
      active: true,
    },
    {
      id: 'Arabic',
      name: 'Arabic',
      description: 'Saudi Arabia',
      href: '#',
      active: false,
    },
  ]
}
