import Header from './Header'
import RecordsTable from './records/RecordsTable'

export default function Records() {
  return (
    <div>
      <Header title="Patient Records" description="View patient records" />
      <div className="w-full flex justify-center">
        <div className="w-[80%]">
          <RecordsTable />
        </div>
      </div>
    </div>
  )
}
