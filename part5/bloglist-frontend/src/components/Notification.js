const Notification = ({ message }) => {
  const notification = {
    backgroundColor: 'blue',
    border: '3px solid red',
    color: 'white',
    margin: '0px 0px 10px 0px',
    padding: '0px 0px 0px 15px',
  }

  if(message === null) return null

  return (
    <div style={notification}>
      <h2>{message}</h2>
    </div>
  )
}

export default Notification