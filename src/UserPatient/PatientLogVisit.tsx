import { Button } from '@/components/ui/button'
import axios from 'axios'
import { log } from 'console'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type PatientAppointmentType = {
  allDay: string
  appointment_id: string
  appointment_title: string
  end: string
  patient_id: number
  start: Date
}

export default function PatientLogVisit() {
  const { id } = useParams()

  const [patientAppointment, setPatientAppointment] = useState<
    PatientAppointmentType[]
  >([])

  const [seconds, setSeconds] = useState(5)
  const [showSeconds, setShowSeconds] = useState(false)

  const getAppointments = () => {
    console.log(id)
    axios
      .get('http://localhost/prenatal-tb/appointment.php', {
        params: {
          patient_id: id,
        },
      })
      .then((res) => {
        console.log(res.data, 'ndjas')
        setPatientAppointment(res.data)
      })
  }

  const startCountdown = () => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1)

      if (seconds === 0) {
        clearTimeout(intervalId)
        window.location.href = '/user'
      }
    }, 1000)
  }

  const handleLogVisit = () => {
    axios
      .post('http://localhost/prenatal-tb/visit.php', {
        patient_id: id,
        appointment_id: id,
        // appointment_id: patientAppointment[0].appointment_id,
      })
      .then((res) => {
        console.log(res.data.status)

        if (res.data.status === 'success') {
          setShowSeconds(true)
          startCountdown()
        }
      })
  }

  useEffect(() => {
    if (seconds === 0) {
      window.location.href = '/user'
    }
  }, [seconds])

  useEffect(() => {
    getAppointments()
  }, [])

  return (
    <div className="w-[60rem] flex justify-center items-center">
      {patientAppointment.length > 0 ? (
        <div>
          <h1>PatientLogVisit {id}</h1>
          {showSeconds && <div>redirecting back to homepage {seconds}</div>}

          <Button onClick={handleLogVisit}>Log visit</Button>
        </div>
      ) : (
        <h1>No Appointment</h1>
      )}
    </div>
  )
}
