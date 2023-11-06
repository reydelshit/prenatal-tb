import { Outlet, useLocation } from 'react-router-dom'
import App from './App'
import Header from './components/Header'
import { Link } from 'react-router-dom'
import SideBar from './components/Sidebar'

export default function Root() {
  const location = useLocation()

  console.log(location.pathname)
  return (
    <div>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="p-2 w-full px-[6rem]">
          {location.pathname === '/' ? <App /> : <Outlet />}
        </div>
      </div>
    </div>
  )
}
