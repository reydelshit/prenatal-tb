import axios from 'axios'
import { useEffect, useState } from 'react'

type Notification = {
  created_at: string
  notification_message: string
  receiver_id: number
  sender_id: number
}
export default function Notification() {
  const [notification, setNotification] = useState<Notification[]>([])
  const getNotification = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PRENATAL_LOCAL_HOST}/notification.php`,
        {
          params: {
            receiver_id: localStorage.getItem('patient_id'),
            user_id: localStorage.getItem('user'),
          },
        },
      )
      console.log(response.data, 'notif')

      if (Array.isArray(response.data) && response.data.length > 0) {
        setNotification(response.data)
      } else {
        setNotification([])
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
      //   setDataFetched(false);
    }
  }

  useEffect(() => {
    getNotification()
  }, [])

  return (
    <div className="h-[20rem] pb-6 ">
      <h1>You have {notification.length} notifications</h1>
      <div className="h-full overflow-y-scroll ">
        {notification.length > 0 ? (
          notification
            .map((noti, index) => {
              return (
                <div
                  className="border-2 p-2 mt-[1rem] rounded-sm bg-gray-200"
                  key={index}
                >
                  <p>{noti.notification_message}</p>
                </div>
              )
            })
            .slice(0, 5)
        ) : (
          <p>No notifications</p>
        )}
      </div>
    </div>
  )
}
