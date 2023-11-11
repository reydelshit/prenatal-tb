import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineSchedule } from 'react-icons/ai'
import { LuListChecks } from 'react-icons/lu'
import { RxDashboard } from 'react-icons/rx'
import { LiaNotesMedicalSolid } from 'react-icons/lia'
import { AiOutlineQuestion } from 'react-icons/ai'
import { MdOutlineMedication } from 'react-icons/md'
import Logo from '@/assets/logo.png'
export default function HProviderSideBar() {
  return (
    <div className="block max-w-[16rem] h-screen">
      <div className=" flex flex-col justify-between w-full h-full">
        <div className=" flex flex-col">
          <div className="flex w-full justify-center flex-col items-center mb-[2rem] my-[2rem]">
            <img className="h-[10rem]" src={Logo} alt="" />
            <h1 className="p-2 font-bold text-xl text-center">
              PRENATAL AND TUBERCULOSIS MONITORING AND SCHEDULING SYSTEM
            </h1>
          </div>

          <Link className="p-2 mb-2 flex items-center gap-2" to="/">
            <RxDashboard className="text-md h-[1.5rem] w-[1.5rem]" /> Dashboard
          </Link>

          <Link className="p-2  mb-2 flex items-center gap-2" to="/patient">
            <LiaNotesMedicalSolid className="text-md h-[1.5rem] w-[1.5rem]" />{' '}
            Manage Patient
          </Link>
          <Link
            className="p-2  mb-2 flex items-center gap-2"
            to="/scheduling-appointment"
          >
            <AiOutlineSchedule className="text-md h-[1.5rem] w-[1.5rem]" />{' '}
            Schedule Appointment
          </Link>

          <Link className="p-2  mb-2 flex items-center gap-2" to="/medication">
            <MdOutlineMedication className="text-md h-[1.5rem] w-[1.5rem]" />{' '}
            Medication
          </Link>
          <Link className="p-2  mb-2 flex items-center gap-2" to="/records">
            <LuListChecks className="text-md h-[1.5rem] w-[1.5rem]" /> Records
          </Link>

          <Link className="p-2  mb-2 flex items-center gap-2" to="/questions">
            <AiOutlineQuestion className="text-md h-[1.5rem] w-[1.5rem]" />{' '}
            Questions
          </Link>
        </div>
      </div>
    </div>
  )
}
