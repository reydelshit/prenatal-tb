import { useNavigate } from 'react-router-dom'
import Header from './Header'
import HealthCareForm from './healthcare/HealthCareForm'
import RecordsTable from './records/RecordsTable'
import { Button } from './ui/button'

export default function ManagePatient() {
  const navigate = useNavigate()
  return (
    <div className="min-w-fit ">
      <Header
        title="Patient"
        description="Manage patient records, add, delete, update patient demography"
      />

      <div className="flex gap-4 p-2 ">
        <div className="w-[50%]">
          <HealthCareForm />
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <h1>List of patients</h1>
            <Button onClick={() => navigate('/scheduling-appointment')}>
              Schedule Appointment
            </Button>
          </div>
          <RecordsTable />
        </div>
      </div>
    </div>
  )
}
