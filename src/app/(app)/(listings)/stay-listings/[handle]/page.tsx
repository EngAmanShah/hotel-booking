import {
  Bathtub02Icon,
  BedSingle01Icon,
  BodySoapIcon,
  CableCarIcon,
  CctvCameraIcon,
  HairDryerIcon,
  MeetingRoomIcon,
  ShampooIcon,
  Speaker01Icon,
  TvSmartIcon,
  VirtualRealityVr01Icon,
  WaterEnergyIcon,
  WaterPoloIcon,
  Wifi01Icon,
} from '@/components/Icons'
import { getListingReviews } from '@/data/data'
import { getStayListingByHandle } from '@/data/listings'
import T from '@/utils/getT'
import { UsersIcon } from '@heroicons/react/24/outline'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import HeaderGallery from '../../components/HeaderGallery'
import SectionHeader from '../../components/SectionHeader'
import { SectionHeading, SectionSubheading } from '../../components/SectionHeading'
import SectionMap from '../../components/SectionMap'
// import Divider from '@/shared/divider'
import RoomSelector from '@/components/RoomSelector' // <-- import the client component

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  const listing = await getStayListingByHandle(handle)

  if (!listing) {
    return {
      title: 'Listing not found',
      description: 'The listing you are looking for does not exist.',
    }
  }

  return {
    title: listing?.title,
    description: listing?.description,
  }
}

interface RoomOption {
  type: string
  price: string
  notes?: string
  icon?: React.ElementType
}

interface RoomType {
  name: string
  image: string
  options: RoomOption[]
}

const Page = async ({ params }: { params: Promise<{ handle: string }> }) => {
  const { handle } = await params
  const listing = await getStayListingByHandle(handle)

  if (!listing?.id) {
    return redirect('/stay-categories/all')
  }

  const {
    address,
    bathrooms,
    bedrooms,
    galleryImgs,
    listingCategory,
    maxGuests,
    price,
    reviewCount,
    reviewStart,
    title,
  } = listing

  const reviews = (await getListingReviews(handle)).slice(0, 3)

  const roomTypes: RoomType[] = [
    {
      name: 'Double Room',
      image: 'https://cdn.pixabay.com/photo/2016/11/18/17/46/room-1836070_960_720.jpg',
      options: [
        { type: 'Room only', price: '252 SAR', notes: 'Includes taxes and fees' },
        { type: 'Breakfast', price: '299 SAR', notes: 'Includes taxes and fees' },
        { type: 'Night', price: '299 SAR', notes: 'Includes taxes and fees' },
      ],
    },
    {
      name: 'Triple Room',
      image: 'https://cdn.pixabay.com/photo/2016/11/18/17/46/room-1836070_960_720.jpg',
      options: [
        { type: 'Room only', price: '261 SAR', notes: 'Includes taxes and fees' },
        { type: 'Breakfast', price: '333 SAR', notes: 'Includes taxes and fees' },
      ],
    },
    {
      name: 'Quad Room',
      image: 'https://cdn.pixabay.com/photo/2016/11/18/17/46/room-1836070_960_720.jpg',
      options: [
        { type: 'Room only', price: '285 SAR', notes: 'Includes taxes and fees' },
        { type: 'Breakfast', price: '379 SAR', notes: 'Includes taxes and fees' },
      ],
    },
  ]

  const renderSectionHeader = () => (
    <SectionHeader
      address={address}
      listingCategory={listingCategory}
      reviewCount={reviewCount}
      reviewStart={reviewStart}
      title={title}
    >
    </SectionHeader>
  )

  const renderSectionAmenities = () => {
    const Amenities_demos = [
      { name: 'Fast wifi', icon: Wifi01Icon },
      { name: 'Bathtub', icon: Bathtub02Icon },
      { name: 'Hair dryer', icon: HairDryerIcon },
      { name: 'Sound system', icon: Speaker01Icon },
      { name: 'Shampoo', icon: ShampooIcon },
      { name: 'Body soap', icon: BodySoapIcon },
      { name: 'Water Energy ', icon: WaterEnergyIcon },
      { name: 'Water Polo', icon: WaterPoloIcon },
      { name: 'Cable Car', icon: CableCarIcon },
      { name: 'Tv Smart', icon: TvSmartIcon },
      { name: 'Cctv Camera', icon: CctvCameraIcon },
      { name: 'Virtual Reality Vr', icon: VirtualRealityVr01Icon },
    ]

    return (
      <div className="listingSection__wrap">
        <SectionHeading>Services and facilities</SectionHeading>
        <SectionSubheading>Learn more about the services and facilities offered</SectionSubheading>
        {/* <Divider className="w-14!" /> */}
        <div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 xl:grid-cols-3 dark:text-neutral-300">
          {Amenities_demos.map((item) => (
            <div key={item.name} className="flex items-center gap-x-3">
              <item.icon className="h-6 w-6" />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <HeaderGallery images={galleryImgs} />
      {renderSectionHeader()}
      <RoomSelector roomTypes={roomTypes} defaultPrice={price} /> {/* Client Component */}
      {renderSectionAmenities()}
      <SectionMap />
    </div>
  )
}

export default Page
