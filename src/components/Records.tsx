import Header from './Header'
import RecordsTable from './records/RecordsTable'

export default function Records() {
  return (
    <div>
      <Header title="Patient Records" description="View patient records" />
      <RecordsTable />
    </div>
  )
}
