import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineSchedule } from 'react-icons/ai'
import { LuListChecks } from 'react-icons/lu'
import { RxDashboard } from 'react-icons/rx'
import { LiaNotesMedicalSolid } from 'react-icons/lia'
import { AiOutlineQuestion } from 'react-icons/ai'
export default function PatientSidebar() {
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
    <div className="block min-w-[16rem] h-screen">
      <div className=" flex flex-col justify-between w-full h-full border-2 border-orange-500">
        <div className=" flex flex-col mt-[5rem]">
          <Link className="p-2 mb-2 flex items-center gap-2" to="/">
            <RxDashboard className="text-md h-[1.5rem] w-[1.5rem]" /> Dashboard
          </Link>

          <Link
            className="p-2  mb-2 flex items-center gap-2"
            to="/user/patient"
          >
            <LiaNotesMedicalSolid className="text-md h-[1.5rem] w-[1.5rem]" />{' '}
            Manage Patient
          </Link>
          <Link
            className="p-2  mb-2 flex items-center gap-2"
            to="/user/scheduling-appointment"
          >
            <AiOutlineSchedule className="text-md h-[1.5rem] w-[1.5rem]" />{' '}
            Schedule Appointment
          </Link>
          <Link
            className="p-2  mb-2 flex items-center gap-2"
            to="/user/records"
          >
            <LuListChecks className="text-md h-[1.5rem] w-[1.5rem]" /> Records
          </Link>

          <Link
            className="p-2  mb-2 flex items-center gap-2"
            to="/user/questions"
          >
            <AiOutlineQuestion className="text-md h-[1.5rem] w-[1.5rem]" />{' '}
            Questions
          </Link>
        </div>
      </div>
    </div>
  )
}
