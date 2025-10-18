'use client'

import { useEffect, useState } from 'react'
import StartRating from '@/components/StartRating'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/shared/description-list'
import { Divider } from '@/shared/divider'
import T from '@/utils/getT'
import { HomeIcon } from '@heroicons/react/24/outline'
// import { Calendar04Icon, UserIcon, Download01Icon, CheckCircleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'

interface BookingData {
  bookingCode: string
  bookingDate: string
  checkInDate: string
  checkOutDate: string
  guests: number
  total: string
  paymentMethod: string
  room: {
    name: string
    location: string
    image: string
    amenities: string
  }
}

const Page = () => {
  const [bookingData, setBookingData] = useState<BookingData | null>(null)

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'instant',
    })

    // Simulate fetching booking data (in real app, this would come from API or context)
    const mockBookingData: BookingData = {
      bookingCode: `#${Math.floor(100000 + Math.random() * 900000)}`,
      bookingDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      checkInDate: 'Aug 12, 2025',
      checkOutDate: 'Aug 16, 2025',
      guests: 3,
      total: '$199',
      paymentMethod: 'Credit Card',
      room: {
        name: 'The Lounge & Bar',
        location: 'Tokyo, Japan',
        image: 'https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        amenities: '2 beds · 2 baths'
      }
    }

    setBookingData(mockBookingData)
  }, [])

  const handleDownloadInvoice = () => {
    // Add your download invoice logic here
    console.log('Download invoice clicked')
    // You might generate a PDF or redirect to a download endpoint
  }

  if (!bookingData) {
    return (
      <main className="container mt-10 mb-24 sm:mt-16 lg:mb-32">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-y-12 px-0 sm:rounded-2xl sm:p-6 xl:p-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container mt-10 mb-24 sm:mt-16 lg:mb-32">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-y-12 px-0 sm:rounded-2xl sm:p-6 xl:p-8">
        {/* Success Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            {/* <CheckCircleIcon className="w-8 h-8 text-green-600" /> */}
          </div>
          <h1 className="text-4xl font-semibold sm:text-5xl text-gray-900 dark:text-white">
            Congratulations! 🎉
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Your booking has been confirmed successfully
          </p>
        </div>
        
        <Divider />

        {/* Booking Summary */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Your Booking Details
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="w-full shrink-0 sm:w-40">
                <div className="aspect-w-4 overflow-hidden rounded-2xl aspect-h-3 sm:aspect-h-4">
                  <Image
                    fill
                    alt={bookingData.room.name}
                    className="object-cover"
                    src={bookingData.room.image}
                    sizes="200px"
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-3 pt-5 sm:px-5 sm:pb-5">
                <div>
                  <span className="line-clamp-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {bookingData.room.location}
                  </span>
                  <span className="mt-1 block text-base font-medium sm:text-lg text-gray-900 dark:text-white">
                    {bookingData.room.name}
                  </span>
                </div>
                <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                  {bookingData.room.amenities}
                </span>
                <Divider className="w-10!" />
                <StartRating />
              </div>
            </div>
          </div>
        </div>

        {/* Date and Guests Info */}
        <div className="flex flex-col divide-y divide-neutral-200 rounded-3xl border border-neutral-200 text-neutral-500 sm:flex-row sm:divide-x sm:divide-y-0 dark:divide-neutral-700 dark:border-neutral-700 dark:text-neutral-400">
          <div className="flex flex-1 gap-x-4 p-5">
            {/* <HugeiconsIcon icon={Calendar04Icon} size={32} strokeWidth={1.5} className="text-blue-600" /> */}
            <div className="flex flex-col">
              <span className="text-sm text-neutral-400">Check-in / Check-out</span>
              <span className="mt-1.5 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {bookingData.checkInDate} - {bookingData.checkOutDate}
              </span>
            </div>
          </div>
          <div className="flex flex-1 gap-x-4 p-5">
            {/* <HugeiconsIcon icon={UserIcon} size={32} strokeWidth={1.5} className="text-blue-600" /> */}
            <div className="flex flex-col">
              <span className="text-sm text-neutral-400">Guests</span>
              <span className="mt-1.5 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {bookingData.guests} Guest{bookingData.guests !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Booking Information</h3>
          <DescriptionList className="mt-5">
            <DescriptionTerm>Booking code</DescriptionTerm>
            <DescriptionDetails className="font-mono text-blue-600">{bookingData.bookingCode}</DescriptionDetails>
            
            <DescriptionTerm>Booking date</DescriptionTerm>
            <DescriptionDetails>{bookingData.bookingDate}</DescriptionDetails>
            
            <DescriptionTerm>Total amount</DescriptionTerm>
            <DescriptionDetails className="font-semibold text-green-600">{bookingData.total}</DescriptionDetails>
            
            <DescriptionTerm>Payment method</DescriptionTerm>
            <DescriptionDetails>{bookingData.paymentMethod}</DescriptionDetails>
            
            <DescriptionTerm>Status</DescriptionTerm>
            <DescriptionDetails>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Confirmed
              </span>
            </DescriptionDetails>
          </DescriptionList>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">What's Next?</h4>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              You will receive a confirmation email shortly
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Check-in time is from 3:00 PM
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Free cancellation up to 24 hours before check-in
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row  text-white ">
          <ButtonPrimary href="/" className="flex-1 justify-center text-white">
            <HomeIcon className="size-5" />
            Explore More Stays
          </ButtonPrimary>
          <ButtonPrimary 
            className="!bg-green-600 hover:!bg-green-700 flex-1 justify-center" 
            onClick={handleDownloadInvoice}
          >
            {/* <HugeiconsIcon icon={Download01Icon} className="size-5" /> */}
            Download Invoice
          </ButtonPrimary>
        </div>
      </div>
    </main>
  )
}

export default Page