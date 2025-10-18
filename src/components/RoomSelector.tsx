'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import ButtonPrimary from '@/shared/ButtonPrimary'

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

interface Props {
  roomTypes: RoomType[]
  defaultPrice: string
}

export default function RoomSelector({ roomTypes, defaultPrice }: Props) {
  const router = useRouter()
  const [selectedRoom, setSelectedRoom] = useState(roomTypes[0])

  // Initialize state with each room having its own empty options object
  const [roomOptionsMap, setRoomOptionsMap] = useState<Record<string, Record<string, number>>>(
    roomTypes.reduce((acc, room) => {
      acc[room.name] = {}
      return acc
    }, {} as Record<string, Record<string, number>>)
  )

  const selectedOptions = roomOptionsMap[selectedRoom.name] || {}

  const handleSelectRoom = (room: RoomType) => {
    setSelectedRoom(room)
  }

  const handleIncrement = (option: RoomOption) => {
    setRoomOptionsMap(prev => {
      const currentRoomOptions = prev[selectedRoom.name] || {}
      const qty = currentRoomOptions[option.type] || 0
      return { 
        ...prev, 
        [selectedRoom.name]: { 
          ...currentRoomOptions, 
          [option.type]: qty + 1 
        } 
      }
    })
  }

  const handleDecrement = (option: RoomOption) => {
    setRoomOptionsMap(prev => {
      const currentRoomOptions = prev[selectedRoom.name] || {}
      const qty = currentRoomOptions[option.type] || 0
      if (qty <= 1) {
        const { [option.type]: _, ...rest } = currentRoomOptions
        return { 
          ...prev, 
          [selectedRoom.name]: rest 
        }
      }
      return { 
        ...prev, 
        [selectedRoom.name]: { 
          ...currentRoomOptions, 
          [option.type]: qty - 1 
        } 
      }
    })
  }

  const totalPrice = useMemo(() => {
    let total = 0
    Object.entries(selectedOptions).forEach(([type, qty]) => {
      const option = selectedRoom.options.find(o => o.type === type)
      if (option) {
        const priceNum = parseFloat(option.price.replace(/[^0-9.]/g, '')) || 0
        total += priceNum * qty
      }
    })
    return `${total} SAR`
  }, [selectedOptions, selectedRoom])

  const handleReserve = () => {
    // Collect all selected options from all rooms
    const allSelectedOptions = []
    for (const roomName in roomOptionsMap) {
      const options = roomOptionsMap[roomName]
      if (Object.keys(options).length > 0) {
        allSelectedOptions.push({
          roomName,
          options: Object.entries(options).map(([type, qty]) => `${type} x${qty}`)
        })
      }
    }
    
    // Calculate total price across all rooms
    let totalPriceAllRooms = 0
    for (const roomName in roomOptionsMap) {
      const room = roomTypes.find(r => r.name === roomName)
      if (room) {
        const options = roomOptionsMap[roomName]
        Object.entries(options).forEach(([type, qty]) => {
          const option = room.options.find(o => o.type === type)
          if (option) {
            const priceNum = parseFloat(option.price.replace(/[^0-9.]/g, '')) || 0
            totalPriceAllRooms += priceNum * qty
          }
        })
      }
    }
    
    const reservationData = {
      rooms: allSelectedOptions,
      totalPrice: `${totalPriceAllRooms} SAR`,
    }
    
    localStorage.setItem('selectedRoom', JSON.stringify(reservationData))
    router.push('/checkout')
  }

  return (
    <div className="relative z-[1] mt-10 flex flex-col gap-8 lg:flex-row xl:gap-10">
      {/* Room list */}
      <div className="flex w-full flex-col gap-y-8 lg:w-3/5 xl:w-[64%] xl:gap-y-10">
        <h2 className="text-2xl font-semibold mb-6">Room Types</h2>
        {roomTypes.map(room => {
          const roomOptions = roomOptionsMap[room.name] || {}
          return (
            <div
              key={room.name}
              className={`mb-8 border rounded-2xl p-4 ${
                selectedRoom.name === room.name
                  ? 'border-primary-500'
                  : 'border-neutral-200 dark:border-neutral-700'
              }`}
            >
              <h3
                className="text-xl font-semibold mb-4 cursor-pointer"
                onClick={() => handleSelectRoom(room)}
              >
                {room.name}
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/3 flex-shrink-0">
                  <img src={room.image} alt={room.name} className="w-full h-40 object-cover rounded-xl" />
                </div>
                <div className="w-full sm:w-2/3 flex flex-col gap-2">
                  {room.options.map((option, idx) => {
                    const qty = roomOptions[option.type] || 0
                    return (
                      <div key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <div className="flex items-center gap-2">
                          {option.icon && <option.icon className="h-5 w-5 text-neutral-500" />}
                          <span className="text-base text-neutral-700 dark:text-neutral-300">{option.type}</span>
                          {option.notes && <span className="text-xs text-neutral-500">({option.notes})</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{option.price}</span>
                          {qty === 0 ? (
                            <button
                              className="px-3 py-1 bg-primary-100 text-primary-600 rounded hover:bg-primary-200 focus:outline-none"
                              onClick={() => handleIncrement(option)}
                            >
                              +
                            </button>
                          ) : (
                            <div className="flex items-center border rounded px-2">
                              <button
                                className="px-2 text-lg font-bold text-primary-600"
                                onClick={() => handleDecrement(option)}
                              >
                                -
                              </button>
                              <span className="px-3">{qty}</span>
                              <button
                                className="px-2 text-lg font-bold text-primary-600"
                                onClick={() => handleIncrement(option)}
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Sidebar */}
      <div className="grow lg:w-1/3">
        <div className="sticky top-5 listingSection__wrap sm:shadow-xl p-4 border rounded-3xl">
          <h2 className="text-xl font-semibold mb-2">Your Trip Summary</h2>
          <div className="flex flex-col gap-2">
            {roomTypes.map(room => {
              const roomOptions = roomOptionsMap[room.name] || {}
              if (Object.keys(roomOptions).length === 0) return null
              
              return (
                <div key={room.name} className="mb-4">
                  <div className="text-sm font-medium text-gray-800 mb-1">
                    {room.name}:
                  </div>
                  {Object.entries(roomOptions).map(([type, qty]) => {
                    const option = room.options.find(o => o.type === type)
                    if (!option) return null
                    const priceNum = parseFloat(option.price.replace(/[^0-9.]/g, '')) || 0
                    return (
                      <div key={type} className="text-sm text-gray-600 ml-2">
                        {type} x{qty} - {priceNum * qty} SAR
                      </div>
                    )
                  })}
                </div>
              )
            })}
            <div className="flex items-end text-2xl font-semibold mt-2">
              Total: <span className="ml-2">
                {roomTypes.reduce((total, room) => {
                  const roomOptions = roomOptionsMap[room.name] || {}
                  Object.entries(roomOptions).forEach(([type, qty]) => {
                    const option = room.options.find(o => o.type === type)
                    if (option) {
                      const priceNum = parseFloat(option.price.replace(/[^0-9.]/g, '')) || 0
                      total += priceNum * qty
                    }
                  })
                  return total
                }, 0)} SAR
              </span>
            </div>
          </div>
          <ButtonPrimary onClick={handleReserve} className="w-full mt-4">
            Reserve
          </ButtonPrimary>
        </div>
      </div>
    </div>
  )
}