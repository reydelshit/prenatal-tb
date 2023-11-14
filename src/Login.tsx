import { Link } from 'react-router-dom'
import { Button } from './components/ui/button'
import { Input } from '@/components/ui/input'
import Logo from '@/assets/logo.png'
import { useState } from 'react'
import axios from 'axios'
export default function Login() {
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
  })
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await axios
      .get(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/login.php`, {
        params: loginDetails,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log('success')
          console.log(res.data)
          localStorage.setItem('user', res.data[0].user_id)
          localStorage.setItem('type', res.data[0].user_type)

          if (res.data[0].user_type === 'patient') {
            localStorage.setItem('patient_id', res.data[0].patient_id)
          }

          const type = res.data[0].user_type

          if (type === 'hprovider') {
            window.location.href = '/'
          }

          if (type === 'patient') {
            window.location.href = '/user'
          }
        }
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)

    setLoginDetails((values) => ({ ...values, [name]: value }))
  }

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col text-center">
      <div>
        <img src={Logo} alt="logo" className="w-[20rem]" />

        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center items-center "
        >
          <Input
            placeholder="Username"
            className="mb-2"
            name="username"
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Password"
            className="mb-2"
            name="password"
            onChange={handleChange}
          />
          <Button className="w-[80%]" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}
