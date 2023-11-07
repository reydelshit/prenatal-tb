import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SideBar() {
  const [width, setWidth] = useState<number>(5)
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false)

  const handleMouseOver = () => {
    setWidth(18)
    setIsMouseOver(true)
  }

  const handleMouseLeave = () => {
    setWidth(5)
    setIsMouseOver(false)
  }

  return (
    <div className="block min-w-[16rem] h-screen bg-violet-50 text-black">
      <div className="border-2 flex flex-col w-full p-4 h-full">
        <div className=" flex flex-col mt-[5rem]">
          <Link className="p-2 border-2 mb-2" to="/">
            Dashboard
          </Link>
          <Link className="p-2 border-2 mb-2" to="/patient">
            Patient
          </Link>
          <Link className="p-2 border-2 mb-2" to="/scheduling-appointment">
            Scheduling Appointment
          </Link>
          <Link className="p-2 border-2 mb-2" to="/records">
            Records
          </Link>
        </div>
      </div>
    </div>
  )
}
