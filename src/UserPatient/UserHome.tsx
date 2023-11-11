import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import axios from 'axios'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { Label } from '@/components/ui/label'

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

type NextAppointment = {
  allDay: string
  appointment_id: number
  appointment_title: string
  end: string
  start: string
}

type AppointmentType = {
  allDay: string
  id: 23
  start: string
  title: string
  end: string
  appointment_status: string
}

export default function User() {
  const [patientData, setPatientData] = useState<PatientDataTypes[]>([])
  const [nextAppointment, setNextAppointment] = useState<NextAppointment[]>([])
  const [appointment, setAppointment] = useState<AppointmentType[]>([])

  const patient_id = localStorage.getItem('patient_id')
  const user_id = localStorage.getItem('user_id')
  const navigate = useNavigate()

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

  const getNextAppointment = () => {
    axios
      .get('http://localhost/prenatal-tb/appointment.php', {
        params: {
          patient_id: patient_id,
          next_appointment: 'yes',
          // user_id: user_id,
        },
      })
      .then((res) => {
        console.log(res.data, 'next')
        setNextAppointment(res.data)
      })
  }

  const getAppointment = () => {
    axios
      .get('http://localhost/prenatal-tb/appointment.php', {
        params: {
          patient_id: patient_id,
          all_appointments: 'yes',
          // user_id: user_id,
        },
      })
      .then((res) => {
        console.log(res.data, 'appointment')
        setAppointment(res.data)
      })
  }

  useEffect(() => {
    getPatientData()
    getNextAppointment()
    getAppointment()
  }, [])

  const handleNavigate = (id: number) => {
    console.log(id)

    navigate(`/user/visit/${id}`)
  }

  return (
    <div className="w-full">
      <div className="w-full px-2">
        <div className="flex justify-between items-center h-[15rem]">
          {patientData.map((patient, index) => (
            <div className="flex flex-col p-4" key={index}>
              <span className="flex gap-2 text-3xl">
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
                See your number of visits and get notified when your appointment
                is set
              </p>
            </div>
          ))}

          <div className="p-2">
            <h1 className="text-1xl font-bold">Next Appointment</h1>
            {nextAppointment.map((appointment, index) => (
              <span key={index}>
                {moment(appointment.start).format('LLLL')}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full justify-center flex mt-[2rem]">
        <div className="w-[100%]">
          <div className="w-full flex justify-between">
            <h1 className="py-2 font-bold">Appointments</h1>

            <div className="flex flex-col items-end">
              <Label className="bg-yellow-500 text-white p-2">Today</Label>
              <h1 className="py-2 font-bold">{moment().format('LLLL')}</h1>
            </div>
          </div>

          <Table className="w-full border-2">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointment.map((appointment, index) => (
                <TableRow
                  className="cursor-pointer"
                  onClick={() => handleNavigate(appointment.id)}
                  key={index}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {moment(appointment.start).format('LL')}
                  </TableCell>
                  <TableCell> {moment(appointment.end).format('LL')}</TableCell>
                  <TableCell>{appointment.appointment_status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
