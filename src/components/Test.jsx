import { useState } from 'react'
function Test() {
  const [preview, setPreview] = useState('')
  const [input, setInput] = useState('')

  async function getPreview(url) {
    const server = import.meta.env.REACT_APP_API_URL
    const URI = encodeURI(url)

    const response = await fetch(`http://localhost:8888/preview?url=${URI}`, {
      method: 'GET',
      'content-type': 'application/json',
    })
    if (!response.ok) {
      throw new Error('something went wrong')
    }
    const data = await response.json()
    return data
  }

  const handleClick = async () => {
    try {
      const result = await getPreview(input)
      setPreview(result)
      console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <input onChange={(e) => setInput(e.target.value)} value={input} type='text' />
      <button onClick={handleClick}>test</button>
    </div>
  )
}

export default Test
