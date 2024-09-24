const Base_url = 'https://eventbackend-zcqb.vercel.app'
const fetchurl = async (endpoint, options) => {
  const url = `${Base_url}${endpoint}`
  try {
    const response = await fetch(url, options)
    const contentType = response.headers.get('content-type')

    let resdata
    if (contentType && contentType.includes('application/json')) {
      resdata = await response.json()
    } else {
      const textData = await response.text()
      console.warn('Non-JSON response:', textData)
      resdata = textData
    }

    return {
      status: response.status,
      resdata: resdata
    }
  } catch (error) {
    console.error('Fetch error: ', error)
    throw error
  }
}

export default fetchurl
