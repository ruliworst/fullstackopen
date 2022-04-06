import { useState } from 'react'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <div>    
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={props.positive} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  if(text === 'positive') {
    return (
      <tr>
        <th>{text}</th>
        <th>{value} %</th>
      </tr>
    )
  }

  return (
    <tr>
      <th>{text}</th>
      <th>{value}</th>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const goodOnClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const neutralOnClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const badOnClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button onClick={goodOnClick} text="good" />
      <Button onClick={neutralOnClick} text="neutral" />
      <Button onClick={badOnClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} average={(good - bad) / all} positive={(good / all) * 100} all={all}/>
    </div>
  )
}

export default App