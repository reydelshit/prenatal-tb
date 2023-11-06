import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import { useState } from 'react'
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core'

import timeGridPlugin from '@fullcalendar/timegrid'

import { EventInput } from '@fullcalendar/core'
import { Input } from './ui/input'
import { Button } from './ui/button'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Label } from './ui/label'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_APPOINTMENTS: EventInput[] = [
  {
    id: createEventId(),
    title: ' All-day appointment',
    start: todayStr,
  },
  {
    id: createEventId(),
    title: ' Timed appointment',
    start: todayStr + 'T12:00:00',
  },
]

export function createEventId() {
  return String(eventGuid++)
}

export default function SchedulingAppointment() {
  const [state, setState] = useState({
    weekendsVisible: true,
    currentEvents: [],
  }) as any

  const [addAppointment, setAddAppointment] = useState(false)
  const [title, setTitle] = useState('' as any)
  const [selectInfo, setSelectInfo] = useState({} as any)

  const testHandle = (selectInfo: DateSelectArg) => {
    console.log(selectInfo)

    setSelectInfo(selectInfo)
    setAddAppointment(true)
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // setAddAppointment(true)

    // let title = prompt('Please enter a new title for your appointment')

    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect()
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      })
      setAddAppointment(false)
    }
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`,
      )
    ) {
      clickInfo.event.remove()
    }
  }

  const handleAppointments = (events: EventApi[]) => {
    setState({
      currentEvents: events,
    })
  }

  const renderSidebar = () => {
    return (
      <div className="border-2 w-[18rem] p-2">
        <div>
          <h2>Instructions:</h2>
          <div className="indent-1 text-left text-sm">
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </div>
        </div>

        <div className="border-2 mt-[2rem] list-none">
          <h2 className="font-bold">
            All Appointments ({state.currentEvents.length})
          </h2>
          <span>{state.currentEvents.map(renderSidebarEvent)}</span>
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
      <li key={event.id}>
        <b>
          {formatDate(event.start!, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </b>
        <i>{event.title}</i>
      </li>
    )
  }

  return (
    <div className="relative">
      {addAppointment && (
        <div className="w-full bg-white bg-opacity-90 z-20 absolute my-auto p-2 h-full flex justify-center items-center">
          <div className="w-[40%] flex-col flex gap-2 my-5 border-2 items-center p-4 bg-white rounded-md h-[10rem]">
            <div className="w-full">
              <Label>Appointment title eg. Reydel - TB</Label>
              <Input
                placeholder="Appointment title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex gap-2 self-end">
              <Button
                className="bg-white border-2 text-black"
                onClick={() => setAddAppointment(false)}
              >
                Cancel
              </Button>

              <Button onClick={() => handleDateSelect(selectInfo)}>
                Add appointment
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        {renderSidebar()}
        <div className="w-[75%]">
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
            initialEvents={INITIAL_APPOINTMENTS} // alternatively, use the `events` setting to fetch from a feed
            select={testHandle}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleAppointments} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}

            bac
            */
          />
        </div>
      </div>
    </div>
  )
}
