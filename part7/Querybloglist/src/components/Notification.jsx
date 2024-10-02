import { useNotificationValue } from "../NotificationContext"
const Notification = ({ message, isError }) => {
  const notification = useNotificationValue()
  return <div>{notification === "" ? "" : <div className={notification.style}>{notification.text}</div>}</div>
}
export default Notification