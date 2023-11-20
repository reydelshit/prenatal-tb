import { useEffect, useState } from 'react'
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
import DefaultImage from '@/assets/default.jpg'
type Questions = {
  id: number
  title: string
  question_type: string
}

interface TuberculosisData {
  [key: string]: string // Define the structure of the data (question ID to answer)
}
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
    weight: '',
    height: '',
  })
  const [image, setImage] = useState<string | null>(null)

  const [tuberculosisQuestions, setTuberculosisQuestions] =
    useState<TuberculosisData>({})
  const [prenatalQuestions, setPrenatalQuestions] = useState<TuberculosisData>(
    {},
  )

  const [questions, setQuestions] = useState<Questions[]>([])

  const handlePatientTypeChange = (event: string) => {
    const selectedValue = event
    setPatientType(selectedValue)
    // console.log(selectedValue);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setPatientDemogprahy((values) => ({ ...values, [name]: value }))

    if (name === 'patient_name') {
      setPatientUsername(value + Math.floor(Math.random() * (999 - 100 + 1)))
    }

    if (name === 'patient_lastname') {
      setPatientPassword(value + Math.floor(Math.random() * (999 - 100 + 1)))
    }
  }

  const handleSubmitPatientDemo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit')

    const tuberculosisData = Object.keys(tuberculosisQuestions).map(
      (questionId) => ({
        question_id: questionId,
        answer_text: tuberculosisQuestions[questionId],
      }),
    )

    const prenatalData = Object.keys(prenatalQuestions).map((questionId) => ({
      question_id: questionId,
      answer_text: prenatalQuestions[questionId],
    }))

    axios
      .post(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/patient.php`, {
        ...patientDemogprahy,
        patient_gender: patientGender,
        patient_type: patientType,
        tuberculosisData,
        prenatalData,

        user_username: patientUsername,
        user_password: patientPassword,
        patient_image: image,
      })
      .then((res) => {
        console.log(res.data)
      })

    window.location.reload()
  }

  const getAllQuestions = () => {
    axios
      .get(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/question.php`)
      .then((res) => {
        console.log(res.data)
        setQuestions(res.data)
      })
  }

  useEffect(() => {
    getAllQuestions()
  }, [])

  const handlePatientGenderChange = (event: string) => {
    const selectedValue = event
    setPatientGender(selectedValue)
    // console.log(selectedValue);
  }

  const handleAnswerChange = (questionId: number, answer: string) => {
    console.log(questionId, answer)

    if (patientType === 'Tuberculosis') {
      setTuberculosisQuestions({
        ...tuberculosisQuestions,
        [questionId]: answer,
      })
    } else {
      setPrenatalQuestions({
        ...prenatalQuestions,
        [questionId]: answer,
      })
    }

    console.log(prenatalQuestions)
  }

  const handlePrintDiv = (divName: string) => {
    let printContents = document.getElementById(divName)?.innerHTML
    let originalContents = document.body.innerHTML

    if (printContents) {
      document.body.innerHTML = printContents
      window.print()
      document.body.innerHTML = originalContents
    }
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = new FileReader()
    data.readAsDataURL(e.target.files![0])

    data.onloadend = () => {
      const base64 = data.result
      if (base64) {
        setImage(base64.toString())
      }
    }
  }

  return (
    <form onSubmit={handleSubmitPatientDemo} className="p-2">
      <div className="flex flex-col gap-2">
        <div className="mb-2">
          <img
            className="w-full h-[20rem] object-contain rounded-lg  mb-4"
            src={image! ? image! : DefaultImage}
          />
          <Label>Patient Image</Label>
          <Input
            required
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
            name="product_image"
          />
        </div>
        <div className="w-full">
          <Label>First name</Label>
          <Input
            type="text"
            onChange={handleInputChange}
            name="patient_name"
            className="w-full"
            required
          />
        </div>

        <div className="w-full">
          <Label>Middle name</Label>
          <Input
            onChange={handleInputChange}
            name="patient_middlename"
            className="w-full"
            required
          />
        </div>

        <div className="w-full">
          <Label>Last name</Label>
          <Input
            onChange={handleInputChange}
            name="patient_lastname"
            className="w-full"
            required
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
            required
          />
        </div>

        <div className="w-full">
          <Label>Birthday</Label>
          <Input
            onChange={handleInputChange}
            name="patient_birthday"
            type="date"
            className="w-full"
            required
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
          <Label>Weight.(55kg)</Label>
          <Input
            onChange={handleInputChange}
            name="weight"
            className="w-full"
            required
          />
        </div>

        <div className="w-full">
          <Label>Height (5'5ft)</Label>
          <Input
            onChange={handleInputChange}
            name="height"
            className="w-full"
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-full">
          <Label>Phone no.</Label>
          <Input
            onChange={handleInputChange}
            name="patient_phone"
            className="w-full"
            required
          />
        </div>

        <div className="w-full">
          <Label>Email</Label>
          <Input
            onChange={handleInputChange}
            name="patient_email"
            className="w-full"
            required
          />
        </div>
      </div>

      <div className="py-2">
        <div className="flex items-center">
          <div>
            <Label className="font-bold">Patient Account</Label>
            <Label className="block text-xs py-2">
              Note: Enter the demographic information of the patient to set the
              username and password. Upon submission the patient account will
              also be uploaded in the database.
            </Label>
          </div>

          <Button onClick={() => handlePrintDiv('id-for-print')}>
            Export account
          </Button>
        </div>
        <div id="id-for-print">
          <div>
            <Label className="mr-2 font-bold">Username:</Label>
            <span className="font-semibold text-sm">{patientUsername}</span>
          </div>

          <div>
            <Label className="mr-2 font-bold">Password:</Label>
            <span className="font-semibold text-sm">{patientPassword}</span>
          </div>
        </div>
      </div>

      <div className="my-4">
        <Select onValueChange={handlePatientTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Patient Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Tuberculosis">Tuberculosis Patient</SelectItem>
            <SelectItem value="Prenatal">Pregnant Patient</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {patientType === 'Tuberculosis' && (
        <div>
          {questions
            .filter((ques) => ques.question_type === 'Tuberculosis')
            .map((ques, index) => (
              <div key={index}>
                <Label>{ques.title}</Label>
                <Input
                  onChange={(e) => handleAnswerChange(ques.id, e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            ))}

          <div className="w-full flex justify-end py-2">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      )}

      {patientType === 'Prenatal' && (
        <div>
          {questions
            .filter((ques) => ques.question_type === 'Prenatal')
            .map((ques, index) => (
              <div key={index}>
                <Label>{ques.title}</Label>
                <Input
                  onChange={(e) => handleAnswerChange(ques.id, e.target.value)}
                  className="w-full"
                />
              </div>
            ))}
          <div className="w-full flex justify-end py-2">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      )}
    </form>
  )
}
