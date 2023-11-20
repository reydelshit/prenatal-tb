import axios from 'axios'
import Header from './Header'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Label } from './ui/label'
import moment from 'moment'
import { Button } from './ui/button'
import DefaultProfile from '@/assets/default.jpg'

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
  weight: string
  height: string
  patient_image: string
}

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type PatientInfoType = {
  answer_text: string
  question_text: string
}

type PatientMedication = {
  medication_id: number
  patient_name: string
  medication_name: string
  dosage: string
  frequency: string
  start: string
  end: string
  created_at: string
  description: string
  patient_id: number
}

export default function ViewPatient() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [patient, setPatient] = useState<PatientType[]>([])
  const [patientInfo, setPatientInfo] = useState<PatientInfoType[]>([])
  const [medication, setMedication] = useState<PatientMedication[]>([])

  const getPatientRecords = async () => {
    await axios
      .get(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/patient.php`, {
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
      .get(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/info_answer.php`, {
        params: {
          patient_id: id,
        },
      })
      .then((res) => {
        console.log(res.data, 'patient info answer')
        setPatientInfo(res.data)
      })
  }

  const getAllPatientsMedication = async () => {
    axios
      .get(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/medication.php`, {
        params: {
          patient_id: id,
        },
      })
      .then((res) => {
        setMedication(res.data)
      })
  }

  useEffect(() => {
    getPatientRecords()
    getPatientInfoAnswers()
    getAllPatientsMedication()
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
              className="w-full flex justify-center p-2 items-center"
              key={index}
            >
              <div className="w-[80%]">
                <div className="flex w-[20%] p-2 h-full">
                  <span className="block w-full p-2">
                    <img
                      className="rounded-md w-[15rem]  h-[15rem] object-contain"
                      src={
                        pat.patient_image ? pat.patient_image : DefaultProfile
                      }
                      alt=""
                    />
                  </span>
                </div>

                <div className="w-full">
                  <div className="flex gap-2 p-2">
                    <span className="block w-full border-b-2 p-2">
                      <Label>First name</Label>
                      <h1 className="font-semibold">{pat.patient_name}</h1>
                    </span>

                    <span className="block w-full border-b-2 p-2">
                      <Label>Middle name</Label>
                      <h1 className="font-semibold">
                        {pat.patient_middlename}
                      </h1>
                    </span>

                    <span className="block w-full border-b-2 p-2">
                      <Label>Last name</Label>
                      <h1 className="font-semibold">{pat.patient_lastname}</h1>
                    </span>
                  </div>

                  <div className="flex gap-2 p-2">
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

                  <div className="flex gap-2 p-2">
                    <span className="block w-full border-b-2 p-2">
                      <Label>Weight</Label>
                      <h1 className="font-semibold">{pat.weight}</h1>
                    </span>

                    <span className="block w-full border-b-2 p-2">
                      <Label>Height</Label>
                      <h1 className="font-semibold">
                        <h1 className="font-semibold">{pat.height}</h1>
                      </h1>
                    </span>
                  </div>

                  <div className="flex gap-2 p-2">
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

        <div className="w-full mt-[2rem] flex flex-col items-center">
          <div className="w-full px-[10.5rem] mt-[2rem] mb-2">
            <h1 className="self-start font-bold text-xl">
              Patient Medication List
            </h1>
          </div>
          <div className="w-[80%]">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Medication</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medication.length > 0 ? (
                  medication.map((med, index) => {
                    return (
                      <TableRow key={index} className="cursor-pointer">
                        <TableCell>{med.patient_name}</TableCell>
                        <TableCell>{med.medication_name}</TableCell>
                        <TableCell>{med.dosage}</TableCell>
                        <TableCell>{med.frequency}</TableCell>
                        <TableCell>{moment(med.start).format('LL')}</TableCell>
                        <TableCell>{moment(med.end).format('LL')}</TableCell>
                        <TableCell>{med.description}</TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow className="font-bold h-[4rem] text-xl text-center w-full">
                    There is no current medication
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
