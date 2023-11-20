import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from './ui/button'

export default function Header({
  title,
  description,
}: {
  title: string
  description: string
}) {
  const handleLogout = () => {
    localStorage.removeItem('prenatal_userType')
    localStorage.removeItem('user')

    window.location.href = '/login'
  }

  const userType = localStorage.getItem('prenatal_userType')
  return (
    <div className="h-[8rem] px-5 py-5 mb-2 ">
      <div className="flex justify-between items-center mb-[1.5rem]">
        <div className="flex flex-col justify-center w-full">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p>{description}</p>
        </div>
        <div className="flex w-[25%] gap-2 justify-between p-2 items-center">
          <h1 className="font-bold w-fit  text-center my-2 p-2 rounded-sm">
            {userType === 'hprovider' ? 'Health Care Provider' : 'Patient'}
          </h1>
          <Button onClick={handleLogout} className="btn btn-primary">
            Logout
          </Button>
        </div>
      </div>

      <Separator />
    </div>
  )
}
