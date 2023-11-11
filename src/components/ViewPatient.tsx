import axios from 'axios'
import Header from './Header'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Label } from './ui/label'
import moment from 'moment'
import { Button } from './ui/button'
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

type PatientInfoType = {
  answer_text: string
  question_text: string
}

export default function ViewPatient() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [patient, setPatient] = useState<PatientType[]>([])
  const [patientInfo, setPatientInfo] = useState<PatientInfoType[]>([])

  const getPatientRecords = async () => {
    await axios
      .get('http://localhost/prenatal-tb/patient.php', {
        params: {
          patient_id: id,
        },
      })
      .then((res) => {
        console.log(res.data, 'patient records')
        setPatient(res.data)
      })
  }

  const getPatientInfoAnswers = async () => {
    axios
      .get('http://localhost/prenatal-tb/info_answer.php', {
        params: {
          patient_id: id,
        },
      })
      .then((res) => {
        console.log(res.data, 'patient info answer')
        setPatientInfo(res.data)
      })
  }

  useEffect(() => {
    getPatientRecords()
    getPatientInfoAnswers()
  }, [])

  return (
    <div>
      <Header
        title="Patient Records"
        description="View number of visits, diagnosis, and treatment"
      />

      <div className="w-full flex justify-center flex-col items-start">
        <div className="flex justify-between w-full px-[10.5rem] ">
          <h1 className="font-bold text-xl">Patient Information</h1>
          <Button onClick={() => navigate('/medication')} className="self-end ">
            Set Medication
          </Button>
        </div>
        {patient.length > 0 &&
          patient.map((pat, index) => (
            <div
              className="w-full flex justify-center p-2 flex-col items-center"
              key={index}
            >
              <div className="flex gap-2 w-[80%] p-2">
                <span className="block w-full border-b-2 p-2">
                  <Label>First name</Label>
                  <h1 className="font-semibold">{pat.patient_name}</h1>
                </span>

                <span className="block w-full border-b-2 p-2">
                  <Label>Middle name</Label>
                  <h1 className="font-semibold">{pat.patient_middlename}</h1>
                </span>

                <span className="block w-full border-b-2 p-2">
                  <Label>Last name</Label>
                  <h1 className="font-semibold">{pat.patient_lastname}</h1>
                </span>
              </div>

              <div className="flex gap-2 w-[80%] p-2">
                <span className="block w-full border-b-2 p-2">
                  <Label>Age</Label>
                  <h1 className="font-semibold">{pat.patient_age}</h1>
                </span>

                <span className="block w-full border-b-2 p-2">
                  <Label>Birthday</Label>
                  <h1 className="font-semibold">
                    {moment(pat.patient_birthday).format('LL')}
                  </h1>
                </span>

                <span className="block w-full border-b-2 p-2">
                  <Label>Gender</Label>
                  <h1 className="font-semibold">{pat.patient_gender}</h1>
                </span>
              </div>

              <div className="flex gap-2 w-[80%] p-2">
                <span className="block w-full border-b-2  p-2">
                  <Label>Phone</Label>
                  <h1 className="font-semibold">{pat.patient_phone}</h1>
                </span>

                <span className="block w-full border-b-2 p-2">
                  <Label>Email</Label>
                  <h1 className="font-semibold">{pat.patient_email}</h1>
                </span>
              </div>
            </div>
          ))}

        <div className="w-full flex justify-center p-2 flex-col items-center">
          <div className="w-full px-[10.5rem] mt-[2rem]">
            <h1 className="self-start font-bold text-xl">
              Additional Information
            </h1>
          </div>
          {patientInfo.map((info, index) => (
            <div key={index} className="flex gap-2 w-[80%] p-2">
              <span className="block w-full rounded-md p-2">
                <Label>{info.question_text}</Label>
                <h1 className="font-semibold">{info.answer_text}</h1>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
