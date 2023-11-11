import Header from './components/Header'
import { useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import moment from 'moment'
import axios from 'axios'

import { Button } from './components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import CardCompo from './components/dashboard/Card'

interface DataItem {
  name: string
  total: number
}

export default function App() {
  const [monthlyVisits, setMonthlyVisits] = useState<DataItem[]>([])

  const getMonthlyVisits = async () => {
    axios
      .get('http://localhost/prenatal-tb/visit.php', {
        params: {
          monthly_visits: 'yes',
        },
      })
      .then((res) => {
        console.log(res.data)
        setMonthlyVisits(res.data)
      })
  }

  useEffect(() => {
    getMonthlyVisits()
  }, [])

  return (
    <div className="p-4">
      <Header
        title="Dashboard"
        description="View number of visits, appointments, and patients"
      />

      <div>
        <div className="flex gap-2 mb-4">
          <CardCompo
            title="TOTAL NUMBER OF PATIENTS"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, accusantium?"
            icon="EMJI"
            value="10"
          />

          <CardCompo
            title=" TUBERCULOSIS PATIENTS"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, accusantium?"
            icon="EMJI"
            value="10"
          />

          <CardCompo
            title="  PRENATAL PATIENTS"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, accusantium?"
            icon="EMJI"
            value="10"
          />

          <CardCompo
            title="TOTAL NUMBER OF VISITS"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, accusantium?"
            icon="EMJI"
            value="10"
          />
        </div>

        <div className="w-full flex gap-4 border-2 justify-between">
          <div className="md:w-[70%] md:p-5 bg-white rounded-lg border-2">
            <h1 className="mb-5 font-bold uppercase">Monthly Visits</h1>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart data={monthlyVisits}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: string) => `${value}`}
                />
                <Bar dataKey="total" fill="#FACC15" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="w-[20rem] border-2">
            <h1 className="font-bold my-2">Quick Actions</h1>

            <div className="w-full flex flex-col">
              <Button className="w-full mb-2">Add patient</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
