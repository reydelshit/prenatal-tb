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
import { Link, useNavigate } from 'react-router-dom'

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

  return (
    <div className="w-full">
      <Table className="w-full">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
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
            patients.map((patient) => {
              return (
                <TableRow
                  className="cursor-pointer"
                  onClick={() => handleNavigate(patient.patient_id)}
                >
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
