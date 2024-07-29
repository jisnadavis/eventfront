import fetchurl from '../../../fetchurluser'
import './getattendees.css'
export const getAttendees = () => {
  const divapp = document.querySelector('#app')
  divapp.innerHTML = ''

  const attendessdiv = document.createElement('div')
  const attendeesconfirmed = async (element) => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const res = await fetchurl(`/api/v1/attende/`, options)
    element.innerHTML = ''
    const errorDiv = document.createElement('div')
    errorDiv.className = 'errordiv'
    const errormessage = document.createElement('p')
    errorDiv.appendChild(errormessage)
    element.append(errorDiv)

    if (res.status === 401) {
      errormessage.textContent = 'You are not an organizer'
      return // Exit the function if unauthorized
    }

    const confirmedattendee = await res.resdata
    errorDiv.innerHTML = ''
    if (confirmedattendee.length == 0) {
      alert('there is nobody registerd for the event')
    }
    if (res.status === 200) {
      const ulcustomer = document.createElement('ul')
      for (const customer of confirmedattendee) {
        const customerli = document.createElement('li')
        const eventTitle = customer.eventId[0]?.title || 'No event title'

        customerli.textContent = `The attendee confirmed: ${customer.name}   for the event :  ${eventTitle}`

        ulcustomer.appendChild(customerli)
      }
      errorDiv.appendChild(ulcustomer)
    }
  }

  attendeesconfirmed(divapp)
  divapp.appendChild(attendessdiv)
}
