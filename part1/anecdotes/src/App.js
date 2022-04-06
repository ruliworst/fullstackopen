import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVotedIndex, setMostVotedIndex] = useState(0)

  const chooseRandomAnecdote = () => {
    let randomNumber = Math.floor(Math.random() * (anecdotes.length))
    setSelected(randomNumber)
  }

  const voteAnecdote = () => {
    const votesCopy = [...votes]
    votesCopy[selected]++

    let maxValue = 0
    let finalIndex = 0
    votesCopy.forEach((value, index) => {
      if(value > maxValue) {
        maxValue = value
        finalIndex = index
      }
    })

    setMostVotedIndex(finalIndex)
    setVotes(votesCopy)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}<br></br>
      <p>has {votes[selected]} votes</p>
      <button onClick={voteAnecdote}>vote</button>
      <button onClick={chooseRandomAnecdote}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {anecdotes[mostVotedIndex]}<br></br>
      <p>has {votes[mostVotedIndex]} votes</p>
    </div>
  )
}

export default App