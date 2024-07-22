const API_URL = import.meta.env.VITE_API_URL
console.log(API_URL)
export async function fetchData() {
  const response = await fetch(`${API_URL}/data`)
  const data = await response.json()
  return data
}
