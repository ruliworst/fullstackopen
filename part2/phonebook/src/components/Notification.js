const Notification = ({message}) => {
  const notification = {
    backgroundColor: 'blue',
    border: '3px solid red',
    color: 'white',
  }

  if(message === null) return null

  return (
    <div style={notification}>
      <h2>{message}</h2>
    </div>
  )
}

export default Notification