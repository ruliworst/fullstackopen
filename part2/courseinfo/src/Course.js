const Header = ({name}) => <div><h2>{name}</h2></div>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      )}
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((previousValue, actualPart) => previousValue + actualPart.exercises, 0)

  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

const Course = ({course}) => {
  const {name, parts} = course

  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

export default Course