import { useState } from 'react'
function Test() {
  const [preview, setPreview] = useState('')
  const [input, setInput] = useState('')

  async function getPreview(url) {
    const server = 'https://link-preview-74vm.onrender.com'
    const URI = encodeURI(url)

    const response = await fetch(`${server}/preview?url=${URI}`, {
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
