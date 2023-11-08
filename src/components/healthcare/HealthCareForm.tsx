import { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import axios from 'axios'

export default function HealthCareForm() {
  const [patientUsername, setPatientUsername] = useState<string>('')
  const [patientPassword, setPatientPassword] = useState<string>('')
  const [patientType, setPatientType] = useState<string>('')
  const [patientGender, setPatientGender] = useState<string>('')
  const [patientDemogprahy, setPatientDemogprahy] = useState({
    patientName: '',
    patientMiddlename: '',
    patientLastname: '',
    patientAge: '',
    patientBirthday: '',
    patientGender: '',
    patientPhone: '',
    patientEmail: '',
  })

  const handlePatientTypeChange = (event: string) => {
    const selectedValue = event
    setPatientType(selectedValue)
    // console.log(selectedValue);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setPatientDemogprahy((values) => ({ ...values, [name]: value }))
  }

  const handleSubmitPatientDemo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit')

    axios
      .post('http://localhost/prenatal-tb/patient.php', {
        ...patientDemogprahy,
        patient_gender: patientGender,
        patient_type: patientType,
      })
      .then((res) => {
        console.log(res.data)
      })
  }

  const handlePatientGenderChange = (event: string) => {
    const selectedValue = event
    setPatientGender(selectedValue)
    // console.log(selectedValue);
  }
  return (
    <form onSubmit={handleSubmitPatientDemo} className="p-2">
      <div className="flex flex-col gap-2">
        <div className="w-full">
          <Label>First name</Label>
          <Input
            onChange={handleInputChange}
            name="patient_name"
            className="w-full"
          />
        </div>

        <div className="w-full">
          <Label>Middle name</Label>
          <Input
            onChange={handleInputChange}
            name="patient_middlename"
            className="w-full"
          />
        </div>

        <div className="w-full">
          <Label>Last name</Label>
          <Input
            onChange={handleInputChange}
            name="patient_lastname"
            className="w-full"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-full">
          <Label>Age</Label>
          <Input
            onChange={handleInputChange}
            name="patient_age"
            className="w-full"
          />
        </div>

        <div className="w-full">
          <Label>Birthday</Label>
          <Input
            onChange={handleInputChange}
            name="patient_birthday"
            type="date"
            className="w-full"
          />
        </div>

        <div className="w-full ">
          <Label>Gender</Label>

          <Select onValueChange={handlePatientGenderChange}>
            <SelectTrigger>
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <Label>Phone no.</Label>
          <Input
            onChange={handleInputChange}
            name="patient_phone"
            className="w-full"
          />
        </div>

        <div className="w-full">
          <Label>Email</Label>
          <Input
            onChange={handleInputChange}
            name="patient_email"
            className="w-full"
          />
        </div>
      </div>

      <div className="my-4">
        <Select onValueChange={handlePatientTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Patient Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Tuberculosis">Tuberculosis Patient</SelectItem>
            <SelectItem value="Pregnant">Pregnant Patient</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {patientType === 'Tuberculosis' && (
        <div>
          <div>
            <Label>Current symptoms (cough, fever, weight loss, etc.)</Label>
            <Input className="w-full" />
          </div>

          <div>
            <Label>History of exposure to tuberculosis</Label>
            <Input className="w-full" />
          </div>

          <div>
            <Label>Previous TB treatments (if any)</Label>
            <Input className="w-full" />
          </div>

          <div className="mt-2 flex w-full items-end justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      )}

      {patientType === 'Pregnant' && (
        <div>
          <div>
            <Label>Estimated date of conception</Label>
            <Input type="text" className="w-full" />
          </div>

          <div>
            <Label>Number of previous pregnancies</Label>
            <Input type="text" className="w-full" />
          </div>

          <div>
            <Label>Any complications during previous pregnancies</Label>
            <Input type="text" className="w-full" />
          </div>

          <div>
            <Label>Current symptoms or discomforts</Label>
            <Input type="text" className="w-full" />
          </div>

          <div className="mt-2 flex w-full items-end justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      )}
    </form>
  )
}
