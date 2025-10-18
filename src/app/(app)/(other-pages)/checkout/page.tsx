'use client'

import { useEffect, useState } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { Divider } from '@/shared/divider'
import Form from 'next/form'

interface RoomSelection {
  roomName: string
  options: string[]
}

interface ReservationData {
  rooms: RoomSelection[]
  totalPrice: string
}

const CheckoutPage = () => {
  const [reservationData, setReservationData] = useState<ReservationData | null>(null)
  const hotelImage = 'https://images.pexels.com/photos/32290182/pexels-photo-32290182.jpeg'
  const hotelName = 'Voco Makkah, an IHG Hotel'
  const hotelAddress = 'Street, Ibrahim Al Khali, Misfalah, Makkah 24233, Saudi Arabia'
  
  // Sample dates
  const checkInDate = '2025/08/28'
  const checkOutDate = '2025/08/29'
  const nights = 1
  const guests = 12
  const roomType = '6 Double'
  const roomPrice = '288 SAR'
  const totalPrice = '1728.00 SAR'

  useEffect(() => {
    const data = localStorage.getItem('selectedRoom')
    if (data) {
      const parsed = JSON.parse(data)
      setReservationData(parsed)
    }
  }, [])

  const handleSubmitForm = async (formData: FormData) => {
    const formObject = Object.fromEntries(formData.entries())
    console.log('Form submitted:', formObject)
    console.log('Reservation data:', reservationData)
    localStorage.removeItem('selectedRoom')
    window.location.href = '/pay-done'
  }

  return (
    <main className="container mt-10 mb-24 flex flex-col gap-14 lg:mb-32 lg:flex-row lg:gap-10">
      {/* Booking Form */}
      <div className="w-full lg:w-3/5 xl:w-2/3">
        <Form
          action={handleSubmitForm}
          className="flex flex-col gap-y-8 border-neutral-200 px-0 sm:rounded-4xl sm:border sm:p-6 xl:p-8 dark:border-neutral-700"
        >
          <h1 className="text-3xl font-semibold lg:text-4xl">Booking Information</h1>
          
          {/* Hotel Information */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{hotelName}</h2>
            <div className="text-neutral-600 dark:text-neutral-400 space-y-1">
              <p>{hotelAddress}</p>
              <p>Breakfast</p>
              <p>City view</p>
            </div>
          </div>

          <Divider />

          {/* Room Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">{roomType}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Including taxes and fees</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{roomPrice}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">225.42 SAR</p>
              </div>
            </div>
          </div>


         
    

          {/* Personal Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Enter your information</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">First name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:border-neutral-600 dark:bg-neutral-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:border-neutral-600 dark:bg-neutral-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:border-neutral-600 dark:bg-neutral-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Phone</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 bg-neutral-50 px-3 text-sm text-neutral-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
                    +966
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="block w-full rounded-r-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:border-neutral-600 dark:bg-neutral-800"
                  />
                </div>
              </div>
            </div>
          </div>

          <ButtonPrimary type="submit" className="mt-10 w-full">
            Confirm Booking
          </ButtonPrimary>
        </Form>
      </div>

      {/* Sidebar */}
      <div className="grow">
        <div className="sticky top-5 flex w-full flex-col gap-y-6 border-neutral-200 px-0 sm:gap-y-8 sm:rounded-4xl sm:p-6 lg:border xl:p-8 dark:border-neutral-700">
          <h2 className="text-xl font-semibold">Your Trip Summary</h2>
          <img
            src={hotelImage}
            alt={hotelName}
            className="w-full h-48 object-cover rounded-xl"
          />
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{hotelName}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{hotelAddress}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 py-3">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Check-in</p>
                <p className="font-semibold">{checkInDate}</p>
                <p className="text-xs text-neutral-500">16:00 - 20:00</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Check-out</p>
                <p className="font-semibold">{checkOutDate}</p>
                <p className="text-xs text-neutral-500">12:00 - 14:00</p>
              </div>
            </div>
            
            <Divider />
            
            <div>
              <h4 className="font-semibold mb-2">Room Details</h4>
              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium">{roomType}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{guests} Guests</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{roomPrice}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">225.42 SAR</p>
                </div>
              </div>
            </div>
            
            <Divider />
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                {/* <span className="text-neutral-600 dark:text-neutral-400">Period</span>
                <span className="font-semibold">Nights</span> */}
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-neutral-200 dark:border-neutral-700">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold">{totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CheckoutPage