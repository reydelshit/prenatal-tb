import { Link } from 'react-router-dom'
import { Button } from './components/ui/button'
import { Input } from '@/components/ui/input'
import Logo from '@/assets/logo.png'
import { useState } from 'react'
import axios from 'axios'
export default function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  })
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await axios
      .get('http://localhost/prenatal-tb/login.php', {
        params: loginDetails,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log('success')
          console.log(res.data)
          localStorage.setItem('user', res.data[0].user_id)
          localStorage.setItem('type', res.data[0].user_type)

          const type = res.data[0].user_type

          if (type === 'hprovider') {
            window.location.href = '/add-patient'
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
            type="email"
            placeholder="Email"
            className="mb-2"
            name="email"
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
