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
      <div className="flex w-full ">
        <SideBar />
        <div className="w-full border-2">
          {location.pathname === '/' ? <App /> : <Outlet />}
        </div>
      </div>
    </div>
  )
}
