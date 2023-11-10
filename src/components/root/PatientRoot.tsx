import { Outlet, useLocation } from 'react-router-dom'

import App from '@/App'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { IoMdNotificationsOutline } from 'react-icons/io'

import Notification from '../Notification'

export default function HProviderRoot() {
  const location = useLocation()

  // console.log(location.pathname)
  return (
    <div className="flex w-full flex-col">
      {/* <PatientSidebar /> */}
      <header className="h-[3rem] p-2 flex justify-between">
        <h1>User</h1>
        <Popover>
          <PopoverTrigger className="relative">
            <div className="absolute bottom-auto left-auto right-2 top-1.5 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-red-600 p-1 text-xs"></div>
            <IoMdNotificationsOutline className="w-8 h-[1.5rem]" />
          </PopoverTrigger>
          <PopoverContent className="w-[20rem] min-h-[20rem] mt-[1.5rem] mr-[15rem] p-4 self-end flex flex-col scroll-m-1">
            <Notification />
          </PopoverContent>
        </Popover>
      </header>
      <div className="w-full border-2 px-2">
        {location.pathname === '/' ? <App /> : <Outlet />}
      </div>
    </div>
  )
}
