import CityDropdown from '@/components/CityDropdown'
import HeroSectionWithSearchForm1 from '@/components/hero-sections/HeroSectionWithSearchForm1'
import { StaySearchForm } from '@/components/HeroSearchForm/StaySearchForm'
import StayCard2 from '@/components/StayCard2'
import { getStayCategoryByHandle } from '@/data/categories'
import { getStayListingFilterOptions, getStayListings } from '@/data/listings'
import { Divider } from '@/shared/divider'
import Pagination from '@/shared/Pagination'
import convertNumbThousand from '@/utils/convertNumbThousand'
import { House04Icon, MapPinpoint02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ handle?: string[] }> }): Promise<Metadata> {
  const { handle } = await params
  const category = await getStayCategoryByHandle(handle?.[0])
  if (!category) {
    return {
      title: 'Collection not found',
      description: 'The collection you are looking for does not exist.',
    }
  }
  const { name, description } = category
  return { title: name, description }
}

const Page = async ({ params }: { params: Promise<{ handle?: string[] }> }) => {
  const { handle } = await params

  const category = await getStayCategoryByHandle(handle?.[0])
  const listings = await getStayListings()
  const filterOptions = await getStayListingFilterOptions()

  if (!category?.id) {
    return redirect('/stay-categories/all')
  }

  return (
    <div className="pb-20">
      <div className="container">
        <HeroSectionWithSearchForm1
          heading={category.name}
          image={category.coverImage}
          imageAlt={category.name}
          searchForm={<StaySearchForm formStyle="default" />}
          description={
            <div className="flex items-center sm:text-lg">
              <HugeiconsIcon icon={MapPinpoint02Icon} size={20} color="currentColor" strokeWidth={1.5} />
              <span className="ms-2.5">{category.region} </span>
              <span className="mx-5"></span>
              <HugeiconsIcon icon={House04Icon} size={20} color="currentColor" strokeWidth={1.5} />
              <span className="ms-2.5">{convertNumbThousand(category.count)} stays</span>
            </div>
          }
        />
      </div>
      <div className="relative container mt-14 lg:mt-24">
        <div className="flex flex-wrap items-end justify-between gap-x-2.5 gap-y-5"></div>
        <CityDropdown />
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:mt-10 lg:grid-cols-3 xl:grid-cols-4">
          {listings.map((listing) => (
            <StayCard2 key={listing.id} data={listing} />
          ))}
        </div>

        <div className="mt-28 flex items-center justify-center">
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default Page
