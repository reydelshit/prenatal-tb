import { Outlet, useLocation } from 'react-router-dom'

import App from '@/App'

import HProviderSideBar from '../sidebar/HProviderSidebar'
import PatientSidebar from '../sidebar/PatientSidebar'

export default function HProviderRoot() {
  const location = useLocation()

  // console.log(location.pathname)
  return (
    <div className="flex w-full ">
      <PatientSidebar />
      <div className="w-full border-2 px-2">
        {location.pathname === '/' ? <App /> : <Outlet />}
      </div>
    </div>
  )
}
