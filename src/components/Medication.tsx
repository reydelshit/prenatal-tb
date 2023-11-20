import { Button } from './ui/button'
import Header from './Header'
import { Label } from './ui/label'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from './ui/input'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

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

export default function Medication() {
  const [patients, setPatients] = useState<PatientType[]>([])
  const [medication, setMedication] = useState<PatientMedication[]>([])
  const [handleSearchPatient, setHandleSearchPatient] = useState('')

  const [showsPrescriptionForm, setShowsPrescriptionForm] = useState(false)
  const [frequency, setFrequency] = useState('')
  const [medicationForPatient, setMedicationForPatient] = useState({})
  const [storePatientID, setStorePatientID] = useState(0)
  const [patientName, setPatientName] = useState('')
  const [searchMedication, setSearchMedication] = useState('')

  const navigate = useNavigate()
  const getAllPatients = async () => {
    axios
      .get(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/patient.php`)
      .then((res) => {
        setPatients(res.data)
      })
  }

  const getAllPatientsMedication = async () => {
    axios
      .get(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/medication.php`)
      .then((res) => {
        console.log(res.data)
        setMedication(res.data)
      })
  }

  useEffect(() => {
    getAllPatients()
    getAllPatientsMedication()
  }, [])

  const handleFrequencyChange = (event: string) => {
    const selectedValue = event
    setFrequency(selectedValue)
    // console.log(selectedValue);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setMedicationForPatient((values) => ({ ...values, [name]: value }))
  }

  const handleSubmitMedication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit')

    axios
      .post(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/medication.php`, {
        ...medicationForPatient,
        patient_name: patientName,
        patient_id: storePatientID,
        frequency,
      })
      .then((res) => {
        console.log(res.data)
      })

    // window.location.reload()
  }

  const handleOpenForm = (patient_name: string, patient_id: number) => {
    console.log(patient_name, patient_id)
    setShowsPrescriptionForm(!showsPrescriptionForm)
    setPatientName(patient_name)
    setStorePatientID(patient_id)
  }

  return (
    <div className="w-full relative h-screen">
      <Header title="Medication" description="Set medication to patients" />

      <div className="flex gap-10">
        <div className="flex flex-col text-start h-full">
          <div className="w-[35rem] h-fit mt-[2rem] flex flex-col items-end">
            <div className="flex w-full justify-between px-4">
              <h1 className="font-bold">List of registered patients</h1>
              <Input
                className="w-[50%]"
                onChange={(e) => setHandleSearchPatient(e.target.value)}
                placeholder="Search patient"
              />
            </div>
            <div className="border-2 mt-[2rem]">
              <Table className="h-full w-full mt-2">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Stocks</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients &&
                    patients
                      .filter(
                        (patient) =>
                          patient.patient_name.includes(handleSearchPatient) ||
                          patient.patient_lastname.includes(
                            handleSearchPatient,
                          ) ||
                          patient.patient_middlename.includes(
                            handleSearchPatient,
                          ),
                      )
                      .map((patient, index) => {
                        return (
                          <TableRow key={index} className="cursor-pointer">
                            <TableCell>
                              {patient.patient_name +
                                ' ' +
                                patient.patient_middlename +
                                ' ' +
                                patient.patient_lastname}
                            </TableCell>

                            <TableCell>{patient.patient_type}</TableCell>
                            <TableCell className="flex gap-2">
                              <Button
                                onClick={() =>
                                  handleOpenForm(
                                    patient.patient_name +
                                      ' ' +
                                      patient.patient_lastname,
                                    patient.patient_id,
                                  )
                                }
                              >
                                Add Prescription
                              </Button>
                              <Button
                                onClick={() =>
                                  navigate(
                                    `/records/patient/${patient.patient_id}`,
                                  )
                                }
                              >
                                View Information
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                </TableBody>
              </Table>
            </div>
          </div>
          {showsPrescriptionForm && (
            <div className="absolute w-full bg-white bg-opacity-75 h-full flex justify-center z-30">
              <form
                onSubmit={handleSubmitMedication}
                className="bg-white w-[40%] border-2 h-[35rem] mt-[2rem] p-6 rounded-md"
              >
                <div className="w-full">
                  <div>
                    <Label>Patient</Label>
                    <Input
                      value={patientName}
                      onChange={handleInputChange}
                      name="patient_name"
                      className="w-full"
                      required
                      disabled
                    />
                  </div>

                  <div>
                    <Label>Medication</Label>
                    <Input
                      onChange={handleInputChange}
                      name="medication_name"
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <Label>Dosage</Label>
                    <Input
                      onChange={handleInputChange}
                      name="dosage"
                      className="w-full"
                      required
                    />
                  </div>

                  <div className="w-full ">
                    <Label>Frequency</Label>

                    <Select onValueChange={handleFrequencyChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Once a day">Once a day</SelectItem>
                        <SelectItem value="Twice a day">Twice a day</SelectItem>
                        <SelectItem value="Three times a day">
                          Three times a day
                        </SelectItem>
                        <SelectItem value="Four times a day">
                          Four times a day
                        </SelectItem>
                        <SelectItem value="Every 4 hours">
                          Every 4 hours
                        </SelectItem>
                        <SelectItem value="Every 6 hours">
                          Every 6 hours
                        </SelectItem>
                        <SelectItem value="Every 8 hours">
                          Every 8 hours
                        </SelectItem>
                        <SelectItem value="Every 12 hours">
                          Every 12 hours
                        </SelectItem>
                        <SelectItem value="Once every other day">
                          Once every other day
                        </SelectItem>
                        <SelectItem value="Once a week">Once a week</SelectItem>
                        <SelectItem value="Twice a week">
                          Twice a week
                        </SelectItem>
                        <SelectItem value="Three times a week">
                          Three times a week
                        </SelectItem>
                        <SelectItem value="Once every two weeks">
                          Once every two weeks
                        </SelectItem>
                        <SelectItem value="Once a month">
                          Once a month
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      onChange={handleInputChange}
                      name="start"
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      onChange={handleInputChange}
                      name="end"
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <Label>Description (optional)</Label>
                    <Input
                      type="text"
                      onChange={handleInputChange}
                      name="description"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-[2rem] w-full justify-center">
                  <Button onClick={() => setShowsPrescriptionForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="w-full mt-[2rem] ">
          <div className="flex justify-between w-full mb-2">
            <h1 className="font-bold p-2">Patient Medication List</h1>
            <Input
              className="w-[50%]"
              placeholder="search patient medication"
              onChange={(e) => setSearchMedication(e.target.value)}
            />
          </div>
          <Table className="w-full border-2">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medication &&
                medication
                  .filter((med) =>
                    med.patient_name
                      .toLowerCase()
                      .includes(searchMedication.toLowerCase()),
                  )
                  .map((med, index) => {
                    return (
                      <TableRow
                        key={index}
                        className="cursor-pointer"
                        // onClick={() => handleNavigate(patient.patient_id)}
                      >
                        <TableCell>{med.patient_name}</TableCell>
                        <TableCell>{med.medication_name}</TableCell>
                        <TableCell>{med.dosage}</TableCell>
                        <TableCell>{med.frequency}</TableCell>
                        <TableCell>{moment(med.start).format('LL')}</TableCell>
                        <TableCell>{moment(med.end).format('LL')}</TableCell>
                      </TableRow>
                    )
                  })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
