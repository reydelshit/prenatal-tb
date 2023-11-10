import axios from 'axios'
import { useState } from 'react'

export default function Visit() {
  const patient_id = localStorage.getItem('patient_id')

  if (patient_id) {
    var newUrl = 'http://localhost:5173/user/visit/' + patient_id

    window.location.href = newUrl
  } else {
    console.error('User ID not found in localStorage')
    window.location.href = '/login'
  }

  return (
    <div>
      <h1>Checking....</h1>
    </div>
  )
}
