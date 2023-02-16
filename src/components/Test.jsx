import { useState } from 'react'
function Test() {
  const [result, setResult] = useState('')
  const [input, setInput] = useState('')

  const handleClick = async () => {
    const apiUrl = 'http://localhost:8080'
    const url = input

    const data = await fetch(`${apiUrl}?url=${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).json

    setResult(data)
    console.log(data)
  }

  return (
    <div>
      <input onChange={(e) => setInput(e.target.value)} value={input} type='text' />
      <button onClick={handleClick}>test</button>
    </div>
  )
}

export default Test
