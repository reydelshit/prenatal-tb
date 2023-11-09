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
    localStorage.removeItem('type')
    localStorage.removeItem('user')

    window.location.reload()
  }
  return (
    <div className="h-[8rem] px-5 py-5 mb-2 flex justify-between">
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mb-[1.5rem]">{description}</p>
        <Separator />
      </div>
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>

          <div>
            <Button onClick={handleLogout} className="btn btn-primary">
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
