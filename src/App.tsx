import Header from './components/Header'
import { useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import axios from 'axios'

import CardCompo from './components/dashboard/Card'
import { GoNumber } from 'react-icons/go'
import dotenv from 'dotenv'

// dotenv.config()

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { useNavigate } from 'react-router-dom'

interface DataItem {
  name: string
  total: number
}

type PatientType = {
  patient_id: number
  patient_name: string
  patient_middlename: string
  patient_lastname: string
  patient_birthday: string
  patient_age: number
  patient_gender: string
  patient_email: string
  patient_phone: string
  patient_type: string
}

export default function App() {
  const [monthlyVisits, setMonthlyVisits] = useState<DataItem[]>([])
  const [totalVisits, setTotalVisits] = useState([])
  const [patients, setPatients] = useState<PatientType[]>([])
  const navigate = useNavigate()

  console.log(import.meta.env.VITE_PRENATAL_LOCAL_HOST)

  const getMonthlyVisits = async () => {
    axios
      .get(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/visit.php`, {
        params: {
          monthly_visits: 'yes',
        },
      })
      .then((res) => {
        console.log(res.data)
        setMonthlyVisits(res.data)
      })
  }

  const getAllVisits = async () => {
    axios
      .get(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/visit.php`)
      .then((res) => {
        console.log(res.data)
        setTotalVisits(res.data)
      })
  }

  const getAllPatients = async () => {
    axios
      .get(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/patient.php`)
      .then((res) => {
        setPatients(res.data)
      })
  }

  useEffect(() => {
    getMonthlyVisits()
    getAllPatients()
    getAllVisits()
  }, [])

  return (
    <div className="p-4">
      <Header
        title="Dashboard"
        description="View number of visits, appointments, and patients"
      />

      <div>
        <div className="flex gap-2 mb-4">
          <CardCompo
            title="TOTAL NUMBER OF PATIENTS"
            description="The total number of patients registered in the system."
            icon={<GoNumber className="h-[1.5rem] w-[1.5rem]" />}
            value={patients.length.toString()}
          />

          <CardCompo
            title=" TUBERCULOSIS PATIENTS"
            description="The total number of tuberculosis patients registered in the system."
            icon={<GoNumber className="h-[1.5rem] w-[1.5rem]" />}
            value={patients
              .filter((patient) => patient.patient_type === 'Tuberculosis')
              .length.toString()}
          />

          <CardCompo
            title="PRENATAL PATIENTS"
            description="The total number of prenatal patients registered in the system."
            icon={<GoNumber className="h-[1.5rem] w-[1.5rem]" />}
            value={patients
              .filter((patient) => patient.patient_type === 'Prenatal')
              .length.toString()}
          />

          <CardCompo
            title="TOTAL NUMBER OF VISITS"
            description="The total number of visits."
            icon={<GoNumber className="h-[1.5rem] w-[1.5rem]" />}
            value={totalVisits.length.toString()}
          />
        </div>

        <div className="w-full flex gap-4 justify-between">
          <div className="md:w-[70%] md:p-5 bg-white rounded-lg border-2">
            <h1 className="mb-5 font-bold uppercase">Monthly Visits</h1>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart data={monthlyVisits}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: string) => `${value}`}
                />
                <Bar dataKey="total" fill="#FACC15" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="w-[25rem] block">
            <Command className="border-2 h-fit">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList className="h-full border-2">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <span
                      onClick={() => navigate('/patient')}
                      className="cursor-pointer"
                    >
                      Manage Patient
                    </span>
                  </CommandItem>
                  <CommandItem className="cursor-pointer">
                    <span
                      onClick={() => navigate('/records')}
                      className="cursor-pointer"
                    >
                      View Patient Records
                    </span>
                  </CommandItem>
                  <CommandItem className="cursor-pointer">
                    <span
                      onClick={() => navigate('/scheduling-appointment')}
                      className="cursor-pointer"
                    >
                      Set Appointment
                    </span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Pages">
                  <CommandItem>
                    <span
                      onClick={() => navigate('/')}
                      className="cursor-pointer"
                    >
                      Dashboard
                    </span>
                  </CommandItem>
                  <CommandItem className="cursor-pointer">
                    <span
                      onClick={() => navigate('/scheduling-appointment')}
                      className="cursor-pointer"
                    >
                      Schedule Appointment
                    </span>
                  </CommandItem>

                  <CommandItem className="cursor-pointer">
                    <span
                      onClick={() => navigate('/medication')}
                      className="cursor-pointer"
                    >
                      Medication
                    </span>
                  </CommandItem>

                  <CommandItem className="cursor-pointer">
                    <span
                      onClick={() => navigate('/records')}
                      className="cursor-pointer"
                    >
                      Records
                    </span>
                  </CommandItem>

                  <CommandItem className="cursor-pointer">
                    <span
                      onClick={() => navigate('/questions')}
                      className="cursor-pointer"
                    >
                      Questions
                    </span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
      </div>
    </div>
  )
}
