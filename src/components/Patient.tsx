import Header from './Header'
import HealthCareForm from './healthcare/HealthCareForm'
import RecordsTable from './records/RecordsTable'

export default function HealthCareProvider() {
  return (
    <div className="min-w-fit ">
      <Header
        title="Patient"
        description="Manage patient records, add, delete, update patient demography"
      />

      <div className="flex gap-4 p-2 border-2">
        <div className="border-2 w-[70%]">
          <HealthCareForm />
        </div>
        <div className="w-full">
          <h1>Health Care Provider</h1>
          <RecordsTable />
        </div>
      </div>
    </div>
  )
}
