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
    <div
      onMouseOver={() => handleMouseOver()}
      onMouseLeave={() => handleMouseLeave()}
      style={{ width: `${width}rem` }}
      className="w-[25rem] p-2 bg-white h-screen fixed z-10 top-0 left-0 
      items-center flex flex-col border-r-2 transition-all ease-in-out duration-350
      border-2"
    >
      {isMouseOver ? (
        <div className="border-2 flex flex-col w-full">
          <div className="mt-[2rem]">
            <h1 className="text-2xl font-bold">Prenatal TB</h1>
          </div>
          <div className=" flex flex-col mt-[5rem]">
            <Link className="p-2 border-2 mb-2" to="/">
              Dashboard
            </Link>
            <Link className="p-2 border-2 mb-2" to="/add-patient">
              Add patient
            </Link>
            <Link className="p-2 border-2 mb-2" to="/scheduling-appointment">
              Scheduling Appointment
            </Link>
            <Link className="p-2 border-2 mb-2" to="/records">
              Records
            </Link>
          </div>
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  )
}
