import { useState } from 'react'
function Test() {
  const [result, setResult] = useState('')
  const [input, setInput] = useState('')

  const handleClick = async () => {
    const apiKey = 'c2c33c5d75465cee78bb96bb3966d2e4'
    const url = input

    const data = { key: apiKey, q: url }
    fetch('https://api.linkpreview.net', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status != 200) {
          console.log(res.status)
          throw new Error('something went wrong')
        }
        return res.json()
      })
      .then((response) => {
        setResult(response)
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <input onChange={(e) => setInput(e.target.value)} value={input} type='text' />
      <button onClick={handleClick}>test</button>
    </div>
  )
}

export default Test
