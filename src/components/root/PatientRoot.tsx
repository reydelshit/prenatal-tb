import { Outlet, useLocation } from 'react-router-dom'

import App from '@/App'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { IoMdNotificationsOutline } from 'react-icons/io'

import Notification from '../Notification'

import User from '@/Patient/UserHome'
import { Button } from '../ui/button'

export default function HProviderRoot() {
  const location = useLocation()

  const user = localStorage.getItem('user')
  const userType = localStorage.getItem('type')

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('type')
    localStorage.removeItem('patient_id')

    window.location.href = '/login'
  }

  return (
    <div className="flex w-full flex-col justify-center items-center h-screen">
      <div className="max-w-[1300px] h-full">
        <header className="h-[6rem] p-2 flex justify-end w-full mb-2 items-center gap-4">
          <Popover>
            <PopoverTrigger className="relative">
              <div className="absolute bottom-auto left-auto right-2 top-2 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-red-600 p-1 text-md"></div>
              <IoMdNotificationsOutline className="w-8 h-[2rem]" />
            </PopoverTrigger>
            <PopoverContent className="w-[20rem] min-h-[20rem] mt-[1.5rem] mr-[18rem] p-4 self-end flex flex-col scroll-m-1">
              <Notification />
            </PopoverContent>
          </Popover>

          <Button onClick={handleLogout}>Logout</Button>
        </header>
        <div className="w-full">
          {location.pathname === '/user' ? <User /> : <Outlet />}
        </div>
      </div>
    </div>
  )
}
