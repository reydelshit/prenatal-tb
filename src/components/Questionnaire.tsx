import { useEffect, useState } from 'react'
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { set } from 'date-fns'
type Questions = {
  id: number
  title: string
  question_type: string
}

export default function Questionnare() {
  const [patientType, setPatientType] = useState<string>('')
  const [question, setQuestion] = useState<string>('')
  const [questions, setQuestions] = useState<Questions[]>([])
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)
  const [storeID, setStoreID] = useState<number>(0)
  const [questionTitleUpdate, setQuestionTitleUpdate] = useState<string>('')

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
        getAllQuestions()
        setQuestion('')
      })
  }

  const getAllQuestions = () => {
    axios.get('http://localhost/prenatal-tb/question.php').then((res) => {
      console.log(res.data)
      setQuestions(res.data)
    })
  }

  // const getSpecificQuestion = () => {

  // }

  useEffect(() => {
    getAllQuestions()
  }, [])

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost/prenatal-tb/question.php/${id}`)
      .then((res) => {
        console.log(res.data)
        getAllQuestions()
      })
  }

  const handleShowUpdateModal = (id: number) => {
    console.log(id)
    setStoreID(id)
    setShowUpdateModal(true)

    axios
      .get('http://localhost/prenatal-tb/question.php', {
        params: {
          question_id: id,
        },
      })
      .then((res) => {
        console.log(res.data, 'dasda')

        if (res.data.length > 0) {
          setQuestionTitleUpdate(res.data[0].title)
          setPatientType(res.data[0].question_type)
        }
        // setQuestions(res.data)
      })
  }

  const handleUpdateQuestion = () => {
    axios
      .put(`http://localhost/prenatal-tb/question.php`, {
        question_type: patientType,
        question_text: questionTitleUpdate,
        question_id: storeID,
      })
      .then((res) => {
        console.log(res.data)
        getAllQuestions()
      })
  }

  return (
    <div className="relative">
      <Header
        title="Questionnaire"
        description="Manage demographic questions for patients"
      />

      <div className="flex gap-4">
        <div className="w-[40rem] flex flex-col p-2">
          <Label className="my-2">Question</Label>
          <Textarea
            value={question}
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

        <div className="border-2 w-[80%]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-full">Question</TableHead>
                <TableHead className="w-[8rem]">Type</TableHead>
                <TableHead className="w-[8rem] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((ques, index) => (
                <TableRow key={index}>
                  <TableCell>{ques.title}</TableCell>
                  <TableCell>{ques.question_type}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      onClick={() => handleDelete(ques.id)}
                      className="bg-red-500"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => handleShowUpdateModal(ques.id)}
                      className="bg-blue-500"
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {showUpdateModal && (
        <div className="absolute bg-white bg-opacity-90 z-20 w-full h-screen top-0 bottom-0 flex flex-col items-center justify-center">
          <div className="w-[40rem] flex flex-col p-2">
            <Label className="my-2">Question</Label>
            <Textarea
              value={questionTitleUpdate}
              onChange={(e) => setQuestionTitleUpdate(e.currentTarget.value)}
            ></Textarea>
            <div className="my-4">
              <Select
                defaultValue={patientType}
                onValueChange={handlePatientTypeChange}
              >
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
            <div className="flex gap-2 self-end">
              <Button
                onClick={() => setShowUpdateModal(false)}
                className="self-end mt-2"
              >
                Close
              </Button>
              <Button onClick={handleUpdateQuestion} className="self-end mt-2">
                Update question
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
