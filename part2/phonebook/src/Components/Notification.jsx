const Notification = ({ message, isError }) => {
    if (message === null || message.length === 0) {
      return null;
    }
  
    return <div className={isError}>{message}</div>;
  };
export default Notification