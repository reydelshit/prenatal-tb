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
  })

  const [patientQuestionAnswers, setPatientQuestionAnswers] = useState({})
  const [tuberculosisQuestions, setTuberculosisQuestions] =
    useState<TuberculosisData>({})

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

    axios
      .post('http://localhost/prenatal-tb/patient.php', {
        ...patientDemogprahy,
        patient_gender: patientGender,
        patient_type: patientType,

        tuberculosisData,
      })
      .then((res) => {
        console.log(res.data)
      })
  }

  const getAllQuestions = () => {
    axios.get('http://localhost/prenatal-tb/question.php').then((res) => {
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

  // const handleQuestionEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target
  //   console.log(name, value)
  //   setPatientQuestionAnswers((values) => ({ ...values, [name]: value }))
  // }

  const handleAnswerChange = (questionId: number, answer: string) => {
    console.log(questionId, answer)
    setTuberculosisQuestions({
      ...tuberculosisQuestions,
      [questionId]: answer,
    })

    console.log(tuberculosisQuestions)

    // console.log(tuberculosisQuestions)
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
                <Input className="w-full" />
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
