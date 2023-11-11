import { Button } from '@/components/ui/button'
import axios from 'axios'
import { log } from 'console'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type PatientAppointmentType = {
  allDay: string
  appointment_id: string
  appointment_title: string
  end: string
  patient_id: number
  start: Date
  appointment_status: string
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
      .get('http://localhost/prenatal-tb/patientlog.php', {
        params: {
          appointment_id: id,
          // appointment_decider: 'ok',
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
        patient_id: localStorage.getItem('patient_id'),
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
        patientAppointment.map((appointment, index) => (
          <div key={index}>
            {moment(appointment.start).format('LL')}
            {/* <h1>PatientLogVisit {id}</h1> */}
            {showSeconds && <div>redirecting back to homepage {seconds}</div>}

            <h1>
              {appointment.appointment_status === 'Done'
                ? 'You are already logged your visit for this schedule'
                : ''}
            </h1>
            <Button
              disabled={
                appointment.appointment_status === 'Done' ? true : false
              }
              onClick={handleLogVisit}
            >
              Log visit
            </Button>
          </div>
        ))
      ) : (
        <h1>Not yet scheduled</h1>
      )}
    </div>
  )
}
