import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { EventDragStartArg } from '@fullcalendar/interaction'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DragEventHandler, useEffect, useState } from 'react'
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
  EventChangeArg,
} from '@fullcalendar/core'

import timeGridPlugin from '@fullcalendar/timegrid'

import { EventInput } from '@fullcalendar/core'
import { Input } from './ui/input'
import { Button } from './ui/button'

import { Label } from './ui/label'
import axios from 'axios'
import Header from './Header'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import moment from 'moment'
import DefaultProfile from '@/assets/default.jpg'
type PatientType = {
  patient_id: number
  patient_name: string
  patient_middlename: string
  patient_lastname: string
  patient_birthday: string
  patient_age: number
  patient_gender: string
  patient_email: string
  patient_phone: string
  patient_type: string
  patient_image: string
  weight: string
  height: string
}

export default function SchedulingAppointment() {
  const [state, setState] = useState({
    weekendsVisible: true,
    currentEvents: [],
  }) as any

  const [addAppointment, setAddAppointment] = useState(false)
  const [title, setTitle] = useState('' as any)
  const [selectInfo, setSelectInfo] = useState({} as any)
  const [appointments, setAppointments] = useState<EventInput[]>([])

  const [patients, setPatients] = useState<PatientType[]>([])
  const [handleSearchPatient, setHandleSearchPatient] = useState('')
  const [patientID, setPatientID] = useState(0)
  const [patientName, setPatientName] = useState('' as any)
  const [patientPhone, setPatientPhone] = useState('' as any)

  const getAppointments = async () => {
    await axios
      .get(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/appointment.php`)
      .then((res) => {
        setAppointments(
          res.data.map((appointment: EventInput[]) => appointment),
        )
        console.log(res.data)
      })
  }

  const sendSMStoPatient = async (
    patient_phone: string,

    appointment_date: string,
  ) => {
    console.log(patientPhone)
    const apiKey =
      'SigIVuuIwp98jJW4wVbDD9fmrVS544zMKBk0EXlVGdNrFWxTqGcB6E7RG2DPX-y7'
    fetch('https://api.httpsms.com/v1/messages/send', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `Hello, ${patientName}! You have a new appointment on ${moment(
          appointment_date,
        ).format('ll')}. Please be on time. Thank you!`,
        from: '+639097134971',
        to: patient_phone,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }
  useEffect(() => {
    getAppointments()

    console.log(appointments, 'useeffect')
  }, [])

  const selectDate = (selectInfo: DateSelectArg) => {
    console.log(selectInfo)

    setSelectInfo(selectInfo)
    setAddAppointment(true)
  }

  const handleDateSelect = (selectInfo: DateSelectArg, patient_id: number) => {
    // setAddAppointment(true)

    // let title = prompt('Please enter a new title for your appointment')

    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect()
    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      })
      setAddAppointment(false)

      // console.log(selectInfo)

      axios
        .post(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/appointment.php`, {
          appointment_title: title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          patient_id,
        })
        .then((res) => {
          console.log(res.data)

          if (res.data.status === 'success') {
            handleNotification(patient_id, selectInfo.startStr)
            sendSMStoPatient(patientPhone, selectInfo.startStr)
          }
        })
    }
  }

  const handleNotification = (patient_id: number, startDate: string) => {
    axios
      .post(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/notification.php`, {
        receiver_id: patient_id,
        sender_id: localStorage.getItem('user'),
        notification_message: `You have a new appointment on ${moment(
          startDate,
        ).format('lll')}`,
      })
      .then((res) => {
        console.log(res.data)
      })
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    console.log(clickInfo.event)
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`,
      )
    ) {
      axios
        .delete(
          `${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/appointment.php/${
            clickInfo.event.id
          }`,
        )
        .then((res) => {
          console.log(res.data)
        })
      clickInfo.event.remove()
    }
  }

  const handleChangeAppointment = (eventChange: EventChangeArg) => {
    console.log(eventChange.event.title)

    // console.log('nice')
    // console.log(eventInfo.event)
    axios
      .put(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/appointment.php`, {
        appointment_id: eventChange.event.id,
        appointment_title: eventChange.event.title,
        start: eventChange.event.startStr,
        end: eventChange.event.endStr,
        allDay: eventChange.event.allDay,
      })
      .then((res) => {
        console.log(res.data)
      })
  }

  const handleAppointments = (events: EventApi[]) => {
    setState({
      currentEvents: events,
    })
  }

  const handleSelectedPatient = (selectedPatient: PatientType) => {
    console.log(selectedPatient)

    setTitle(
      selectedPatient.patient_name +
        ' ' +
        selectedPatient.patient_lastname +
        ' - ' +
        selectedPatient.patient_type,
    )
    setPatientName(
      selectedPatient.patient_name + ' ' + selectedPatient.patient_lastname,
    )

    setPatientID(selectedPatient.patient_id)
    setPatientPhone(selectedPatient.patient_phone)
  }

  const getAllPatients = async () => {
    axios
      .get(`${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/patient.php`)
      .then((res) => {
        setPatients(res.data)
      })
  }

  useEffect(() => {
    getAllPatients()
  }, [])

  const renderSidebar = () => {
    return (
      <div className="w-[20rem] ">
        <Card className="w-full mb-2">
          <CardHeader>
            <CardTitle className="text-lg">Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-md">
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </CardContent>
        </Card>

        <div className="border-2 text-sm p-2 rounded-md">
          <span className="block text-base font-semibold">
            All Appointments ({state.currentEvents.length})
          </span>
          <span className="text-md">
            {state.currentEvents.map(renderSidebarEvent)}
          </span>
        </div>
      </div>
    )
  }

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    )
  }

  const renderSidebarEvent = (event: EventApi) => {
    return (
      <div className="flex gap-1" key={event.id}>
        <span>
          {formatDate(event.start!, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
        <p className="font-bold">{event.title}</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <Header
        title="Schedule Appointment"
        description="Assign appointment to patients"
      />
      {addAppointment && (
        <div className="w-full bg-white bg-opacity-90 z-20 absolute my-auto p-2 h-full flex justify-center ">
          <div className=" w-[30rem] flex-col flex gap-2 my-5 border-2 p-4 bg-white rounded-md h-fit mt-[12rem]">
            <div className="w-full">
              <div className="w-full h-fit mb-[3rem] ">
                <Input
                  onChange={(e) => setHandleSearchPatient(e.target.value)}
                  placeholder="Search patient"
                />
                <Label className="text-end block my-5">
                  Only shows 5 patients, search to show more
                </Label>
                <Table className="h-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients &&
                      patients
                        .filter(
                          (patient) =>
                            patient.patient_name.includes(
                              handleSearchPatient,
                            ) ||
                            patient.patient_lastname.includes(
                              handleSearchPatient,
                            ) ||
                            patient.patient_middlename.includes(
                              handleSearchPatient,
                            ),
                        )
                        .map((patient, index) => {
                          return (
                            <TableRow
                              key={index}
                              onClick={() => handleSelectedPatient(patient)}
                              className="cursor-pointer"
                            >
                              <TableCell>
                                <img
                                  className="rounded-full  w-[2rem]  h-[2rem] object-cover"
                                  src={
                                    patient.patient_image
                                      ? patient.patient_image
                                      : DefaultProfile
                                  }
                                  alt=""
                                />
                              </TableCell>

                              <TableCell>
                                {patient.patient_name +
                                  ' ' +
                                  patient.patient_middlename +
                                  ' ' +
                                  patient.patient_lastname}
                              </TableCell>
                              <TableCell>{patient.patient_phone}</TableCell>
                            </TableRow>
                          )
                        })
                        .splice(0, 4)}
                  </TableBody>
                </Table>
              </div>
              <Label className="mb-2 block">
                Appointment title eg. Reydel Ocon - (Patient type eg. TB ||
                Pren)
              </Label>
              <Input
                value={title}
                placeholder="Appointment title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="my-2">
              <p className="text-xs">
                <strong>Note:</strong> Upon adding appointment, the push
                notification and sms message will automatically send to the
                patient. SMS charges may apply.
              </p>
            </div>
            <div className="flex gap-2 self-end">
              <Button
                className="bg-white border-2 text-black"
                onClick={() => setAddAppointment(false)}
              >
                Cancel
              </Button>

              <Button onClick={() => handleDateSelect(selectInfo, patientID)}>
                Add appointment
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4 w-full">
        {renderSidebar()}
        <div className="w-full">
          {appointments.length > 0 && (
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              eventBackgroundColor="orange"
              eventBorderColor="orange"
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              initialEvents={appointments} // alternatively, use the `events` setting to fetch from a feed
              select={selectDate}
              eventContent={renderEventContent} // custom render function
              eventClick={handleEventClick}
              eventsSet={handleAppointments} // called after events are initialized/added/changed/removed
              // you can update a remote database when these fire:
              // eventAdd={() => handleAppointmentsDatabaase}
              eventChange={handleChangeAppointment}
              // eventRemove={function(){}}
            />
          )}
        </div>
      </div>
    </div>
  )
}
