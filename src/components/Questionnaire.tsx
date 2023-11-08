import { useState } from 'react'
import Header from './Header'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import axios from 'axios'

export default function Questionnare() {
  const [patientType, setPatientType] = useState<string>('')
  const [question, setQuestion] = useState<string>('')

  const handlePatientTypeChange = (event: string) => {
    const selectedValue = event
    setPatientType(selectedValue)
    // console.log(selectedValue);
  }

  const handleAddQuestion = () => {
    console.log(question, patientType)
    axios
      .post('http://localhost/prenatal-tb/question.php', {
        question_text: question,
        question_type: patientType,
      })
      .then((res) => {
        console.log(res.data)
      })
  }

  return (
    <div>
      <Header
        title="Questionnaire"
        description="Manage demographic questions for patients"
      />

      <div className="flex gap-4">
        <div className="w-[40rem] flex flex-col p-2">
          <Label className="my-2">Question</Label>
          <Textarea
            onChange={(e) => setQuestion(e.currentTarget.value)}
          ></Textarea>
          <div className="my-4">
            <Select onValueChange={handlePatientTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tuberculosis">
                  Tuberculosis Patient
                </SelectItem>
                <SelectItem value="Prenatal">Pregnant Patient</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAddQuestion} className="self-end mt-2">
            Add question
          </Button>
        </div>

        <div className="border-2 w-full">nice</div>
      </div>
    </div>
  )
}
