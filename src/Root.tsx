import { Outlet, useLocation } from 'react-router-dom'
import App from './App'
import Header from './components/Header'
import { Link } from 'react-router-dom'

export default function Root() {
  const location = useLocation()

  console.log(location.pathname)
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="flex flex-col w-[15rem] border-2 p-2">
          <Link to="/">Dashboard</Link>
          <Link to="/add-patient">Add patient</Link>
          <Link to="/scheduling-appointment">Scheduling Appointment</Link>
          <Link to="/records">Records</Link>
        </div>
        <div className="p-2 border-2 border-orange-500 w-full">
          {location.pathname === '/' ? <App /> : <Outlet />}
        </div>
      </div>
    </div>
  )
}
