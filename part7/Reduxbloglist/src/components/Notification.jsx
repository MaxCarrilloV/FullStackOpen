import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector((state) => state.notification)
  return (
    <div>
      {notification === '' ? '' : <div className={notification.style}>{notification.text}</div>}
    </div>
  )
}
export default Notification
