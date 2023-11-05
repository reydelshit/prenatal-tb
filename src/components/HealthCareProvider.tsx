import { useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export default function HealthCareProvider() {
  const [patientType, setPatientType] = useState<string>('')

  const handlePatientTypeChange = (event: string) => {
    const selectedValue = event
    setPatientType(selectedValue)
    // console.log(selectedValue);
  }

  return (
    <div className="w-full flex items-center flex-col p-2">
      <div className="border-2 w-[80%]">
        <form className="p-2">
          <div className="flex gap-2">
            <div className="w-full">
              <Label>First name</Label>
              <Input className="w-full" />
            </div>

            <div className="w-full">
              <Label>Middle name</Label>
              <Input className="w-full" />
            </div>

            <div className="w-full">
              <Label>Last name</Label>
              <Input className="w-full" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Label>Age</Label>
              <Input className="w-full" />
            </div>

            <div className="w-full">
              <Label>Birthday</Label>
              <Input type="date" className="w-full" />
            </div>

            <div className="w-full ">
              <Label>Birthday</Label>

              <Select>
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
          <div className="my-4">
            <Select onValueChange={handlePatientTypeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Patient Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tuberculosis">
                  Tuberculosis Patient
                </SelectItem>
                <SelectItem value="Pregnant">Pregnant Patient</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {patientType === 'Tuberculosis' && (
            <div>
              <div>
                <Label>
                  Current symptoms (cough, fever, weight loss, etc.)
                </Label>
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

              <div className="mt-2">
                <Button>Submit</Button>
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

              <div className="mt-2">
                <Button>Submit</Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
