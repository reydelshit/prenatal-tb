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
}
export default function RecordsTable() {
  const [patients, setPatients] = useState<PatientType[]>([])
  const getAllPatients = async () => {
    axios.get('http://localhost/prenatal-tb/patient.php').then((res) => {
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

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between my-2">
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="prenatal">Prenatal Patients</SelectItem>
            <SelectItem value="tb">TB(Tuberculosis) Patients</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-[20%]">
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
                  patient.patient_name.includes(handleSearchPatient) ||
                  patient.patient_lastname.includes(handleSearchPatient) ||
                  patient.patient_middlename.includes(handleSearchPatient),
              )
              .map((patient, index) => {
                return (
                  <TableRow
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleNavigate(patient.patient_id)}
                  >
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>{patient.patient_name}</TableCell>
                    <TableCell>{patient.patient_middlename}</TableCell>
                    <TableCell>{patient.patient_lastname}</TableCell>
                    <TableCell>{patient.patient_birthday}</TableCell>
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
