import axios from 'axios'
import { useEffect, useState } from 'react'

type PatientAppointmentType = {
  allDay: string
  appointment_id: string
  appointment_title: string
  end: string
  patient_id: number
  start: Date
}

export default function Visit() {
  const patient_id = localStorage.getItem('patient_id')

  console.log('patient_id:', patient_id)
  console.log('test')

  const [patientAppointment, setPatientAppointment] = useState<
    PatientAppointmentType[]
  >([])

  const getAppointment = () => {
    axios
      .get(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/appointment.php`, {
        params: {
          patient_id: patient_id,
        },
      })
      .then((res) => {
        console.log(res.data, 'ndjas')
        setPatientAppointment(res.data)

        if (patient_id) {
          if (res.data.length > 0) {
            const newUrl = `/user/visit/` + res.data[0].appointment_id

            console.log('Redirecting to:', newUrl)
            window.location.href = newUrl
          } else {
            const newUrl =
              `${import.meta.env.VITE_PRENATAL_DEFAULT_HOST}/user/visit/` +
              'no-appointment-scheduled'

            console.log('Redirecting to:', newUrl)
            window.location.href = newUrl
          }
        } else {
          console.error('User ID not found in localStorage')
          window.location.href = '/login'
        }
      })
  }

  useEffect(() => {
    getAppointment()
  }, [])

  return (
    <div className="w-[50rem] text-center">
      <h1 className="font-bold text-3xl">Checking....</h1>
    </div>
  )
}
