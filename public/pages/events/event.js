import { registerCustomer } from '../attendeeregister/attendee'
import fetchurl from '../fetchurluser'
import './event.css'

export const createevent = async () => {
  const divApp = document.querySelector('#app')
  divApp.innerHTML = ''

  const res = await fetchurl('/api/v1/events/')
  const events = res.resdata

  printEvents(events, divApp)
}

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
