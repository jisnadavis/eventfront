import { fetchData } from './api'
import { createheader } from './public/components/header/header'
import { createhome } from './public/pages/home/home'
import './style.css'
const divapp = document.querySelector('#app')
divapp.innerHTML = ''
const initializeApp = async () => {
  createheader()
  createhome()
  try {
    const data = await fetchData()
    document.querySelector('#app').textContent = JSON.stringify(data, null, 2)
  } catch (error) {
    console.error('Error fetching data:', error)
    document.querySelector('#app').textContent = 'Failed to load data'
  }
}

initializeApp()
