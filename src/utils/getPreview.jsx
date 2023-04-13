export async function getPreview(urls) {
  const server = 'https://link-preview-74vm.onrender.com'
  // const URI = encodeURI(url)
  //   `${server}/preview?url=${URI}`
  //   console.log(urls)
  const response = await fetch(`${server}/preview`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(urls),
  })
  if (!response.ok) {
    throw new Error('something went wrong')
  }
  const data = await response.json()
  return data
}
