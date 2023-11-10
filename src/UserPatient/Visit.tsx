export default function Visit() {
  const patient_id = localStorage.getItem('patient_id')

  console.log('patient_id:', patient_id)
  console.log('test')

  if (patient_id) {
    const newUrl = 'http://localhost:5173/user/visit/' + patient_id
    console.log('Redirecting to:', newUrl)
    window.location.href = newUrl
  } else {
    console.error('User ID not found in localStorage')
    window.location.href = '/login'
  }

  return (
    <div className="w-[50rem] text-center">
      <h1 className="font-bold text-3xl">Checking....</h1>
    </div>
  )
}
