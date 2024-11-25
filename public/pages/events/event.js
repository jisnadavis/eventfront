import { registerCustomer } from '../attendeeregister/attendee'
import fetchurl from '../fetchurluser'
import './event.css'

export const createevent = async () => {
  const divApp = document.querySelector('#app')
  divApp.innerHTML = ''
  const loadingDiv = document.createElement('div')
  loadingDiv.className = 'loading-container'

  const loadimg = document.createElement('img')
  loadimg.src = './assets/loading.gif'
  loadimg.alt = 'Loading...'
  loadingDiv.appendChild(loadimg)

  divApp.appendChild(loadingDiv)
  try {
    // Fetch events data
    const res = await fetchurl('/api/v1/events/')
    const events = res.resdata

    divApp.removeChild(loadingDiv)

    printEvents(events, divApp)
  } catch (error) {
    console.error('Error fetching events:', error)

    // Remove loading indicator and show an error message
    divApp.removeChild(loadingDiv)
    const errorMessage = document.createElement('p')
    errorMessage.textContent = 'Failed to load events. Please try again later.'
    divApp.appendChild(errorMessage)
  }
}

// const res = await fetchurl('/api/v1/events/')
// const events = res.resdata
// divApp.removeChild(loadingDiv);

// printEvents(events, divApp)

const printEvents = (events, elementPadre) => {
  const eventDiv = document.createElement('div')
  eventDiv.className = 'eventdiv'

  for (const event of events) {
    const parEvent = document.createElement('div')
    parEvent.className = 'par_event'

    const eventImg = document.createElement('img')
    eventImg.src = event.eventimg
    parEvent.appendChild(eventImg)

    const descriptionEvent = document.createElement('div')
    descriptionEvent.className = 'description'

    const h1Title = document.createElement('h2')
    h1Title.textContent = event.title

    const dateH3 = document.createElement('h3')
    const trimmeddate = event.date.split('T')[0]
    dateH3.textContent = trimmeddate

    const locationH4 = document.createElement('h4')
    locationH4.textContent = event.location

    const descriptionP = document.createElement('p')
    descriptionP.textContent = event.description

    descriptionEvent.appendChild(h1Title)
    descriptionEvent.appendChild(dateH3)
    descriptionEvent.appendChild(locationH4)
    descriptionEvent.appendChild(descriptionP)
    const joinbutton = document.createElement('button')
    joinbutton.className = 'join'
    joinbutton.textContent = 'join'
    parEvent.appendChild(descriptionEvent)
    descriptionEvent.appendChild(joinbutton)
    eventDiv.appendChild(parEvent)
    joinbutton.addEventListener('click', () => registerCustomer(event._id))
  }

  elementPadre.appendChild(eventDiv)
}
