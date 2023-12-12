import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../ui/input'
import DefaultProfile from '@/assets/default.jpg'
import moment from 'moment'

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
  weight: string
  height: string
  patient_image: string
}

export default function RecordsTable() {
  const [patients, setPatients] = useState<PatientType[]>([])
  const getAllPatients = async () => {
    axios
      .get(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/patient.php`)
      .then((res) => {
        setPatients(res.data)
      })
  }

  useEffect(() => {
    getAllPatients()
  }, [])
  const navigate = useNavigate()

  const handleNavigate = (id: number) => {
    navigate(`/records/patient/${id}`)
  }

  const [handleSearchPatient, setHandleSearchPatient] = useState('')

  const [patientType, setPatientType] = useState<string>('')
  const handleChangePatientType = (event: string) => {
    const selectedValue = event
    setPatientType(selectedValue)
    console.log(selectedValue)
  }
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between my-2">
        <Select onValueChange={handleChangePatientType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Prenatal">Prenatal Patients</SelectItem>
            <SelectItem value="Tuberculosis">
              TB(Tuberculosis) Patients
            </SelectItem>
          </SelectContent>
        </Select>
        <div className="w-[40%]">
          <Input
            onChange={(e) => setHandleSearchPatient(e.target.value)}
            placeholder="search patient.."
          />
        </div>
      </div>

      <Table className="w-full border-2">
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead></TableHead>
            <TableHead>Firstname</TableHead>
            <TableHead>Middlename</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Birthday</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients &&
            patients
              .filter(
                (patient) =>
                  (patient.patient_type.includes(patientType) &&
                    (patient.patient_name
                      .toLowerCase()
                      .includes(handleSearchPatient.toLowerCase()) ||
                      patient.patient_lastname
                        .toLowerCase()
                        .includes(handleSearchPatient.toLowerCase()) ||
                      patient.patient_middlename
                        .toLowerCase()
                        .includes(handleSearchPatient.toLowerCase()))) ||
                  patientType === 'All',
              )
              .map((patient, index) => {
                return (
                  <TableRow
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleNavigate(patient.patient_id)}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img
                        className="rounded-full  w-[3rem]  h-[3rem] object-cover"
                        src={
                          patient.patient_image
                            ? patient.patient_image
                            : DefaultProfile
                        }
                        alt=""
                      />
                    </TableCell>

                    <TableCell>{patient.patient_name}</TableCell>
                    <TableCell>{patient.patient_middlename}</TableCell>
                    <TableCell>{patient.patient_lastname}</TableCell>
                    <TableCell>
                      {moment(patient.patient_birthday).format('LL')}
                    </TableCell>
                    <TableCell>{patient.patient_age}</TableCell>
                    <TableCell>{patient.patient_gender}</TableCell>
                    <TableCell>{patient.patient_email}</TableCell>
                    <TableCell>{patient.patient_phone}</TableCell>
                  </TableRow>
                )
              })}
        </TableBody>
      </Table>
    </div>
  )
}
