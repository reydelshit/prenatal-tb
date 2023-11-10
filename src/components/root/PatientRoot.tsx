import { Outlet, useLocation } from 'react-router-dom'

import App from '@/App'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { IoMdNotificationsOutline } from 'react-icons/io'

import Notification from '../Notification'
import axios from 'axios'
import { useEffect, useState } from 'react'
import moment from 'moment'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type PatientDataTypes = {
  patient_id: number
  created_at: string
  patient_age: number
  patient_birthday: string
  patient_email: string
  patient_gender: string
  patient_name: string
  patient_lastname: string
  patient_middlename: string
  patient_phone: string
  patient_type: string
}

export default function HProviderRoot() {
  const location = useLocation()

  const patient_id = localStorage.getItem('patient_id')
  const user_id = localStorage.getItem('user_id')

  const [patientData, setPatientData] = useState<PatientDataTypes[]>([])

  const getPatientData = () => {
    axios
      .get('http://localhost/prenatal-tb/patient.php', {
        params: {
          patient_id: patient_id,
          // user_id: user_id,
        },
      })
      .then((res) => {
        setPatientData(res.data)
        // console.log(res.data)
      })
  }

  useEffect(() => {
    getPatientData()
  }, [])

  return (
    <div className="flex w-full flex-col justify-center items-center h-screen">
      <div className="min-w-[1200px] border-2 h-full">
        {/* <PatientSidebar /> */}
        <header className="h-[3rem] p-2 flex justify-between w-full mb-2  border-2">
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
          <div className="flex justify-between items-center">
            {patientData.map((patient, index) => (
              <div className="flex flex-col p-4" key={index}>
                <span className="flex  gap-2 text-3xl">
                  Hello,
                  <h1 className="font-bold">
                    {' '}
                    {patient.patient_name +
                      ' ' +
                      patient.patient_middlename +
                      ' ' +
                      patient.patient_lastname}
                  </h1>
                  👋
                </span>

                <p>
                  See your number of visits and get notified when your
                  appointment is set
                </p>
              </div>
            ))}

            <span className="font-semibold text-lg">
              {moment().format('LLLL')}
            </span>
          </div>
        </div>

        <div className="flex gap-2 p-2">
          <Card className="text-start bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">yes</CardTitle>d
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Provident, accusantium?
              </p>
            </CardContent>
          </Card>

          <Card className="text-start bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">yes</CardTitle>d
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Provident, accusantium?
              </p>
            </CardContent>
          </Card>

          <Card className="text-start bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">yes</CardTitle>d
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Provident, accusantium?
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="p-2">your next appointment is on date date</div>
      </div>
    </div>
  )
}
