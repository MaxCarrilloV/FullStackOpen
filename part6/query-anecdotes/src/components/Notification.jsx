import { useNotificationValue } from "../notificationContext"
const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const notification = useNotificationValue()
  return <div>{notification === "" ? "" : <div style={style}>{notification}</div>}</div>
}

export default Notification
