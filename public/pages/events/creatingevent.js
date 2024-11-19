import fetchurl from '../fetchurluser'
import './createevent.css'

export const createEvent = () => {
  const divapp = document.querySelector('#app')
  divapp.innerHTML = ''

  const eventCreateDiv = document.createElement('div')
  eventCreateDiv.innerHTML = `
    <form id="eventForm">
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" required placeholder="Enter event title">
      <label for="date">Date:</label>
      <input type="date" id="date" name="date" required placeholder="yyyy-mm-dd">
      <label for="location">Location:</label>
      <input type="text" id="location" name="location" required placeholder="Enter event location">
      <label for="description">Description:</label>
      <textarea id="description" name="description" required placeholder="Enter event description"></textarea>
       <label for="eventimg">Event Images:</label>
      <input type="file" id="eventimg" name="eventimg" multiple required placeholder="Upload event images">

      <label for="eventorganizer">Event Organizer:</label>
      <input type="text" id="eventorganizer" name="eventorganizer" class="hidden-input" readonly value="${
        JSON.parse(localStorage.getItem('user')).id
      }">
      <button type="submit" id="submitEventButton">Submit</button>
    </form>
    <div id="messageevent"></div>
  `

  divapp.append(eventCreateDiv)

  const form = document.querySelector('#eventForm')
  const messageContainer = document.querySelector('#messageevent')

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const dateInput = document.getElementById('date')
    const dateValue = dateInput.value
    const datePattern = /^\d{4}-\d{2}-\d{2}$/

    if (!datePattern.test(dateValue)) {
      alert('Date must be in yyyy-mm-dd format.')
      return
    }

    creatingEvent(form, messageContainer)
  })
}

const creatingEvent = async (form, messageContainer) => {
  const formData = new FormData(form)
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))._id
  formData.set('eventorganizer', user)

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  try {
    const res = await fetchurl('/api/v1/events/createevent', options)

    // Clear previous messages
    while (messageContainer.firstChild) {
      messageContainer.removeChild(messageContainer.firstChild)
    }

    console.log('Response status:', res.status)

    // Since fetchurl returns {status, resdata}, we access resdata
    const responseData = res.resdata
    console.log('Response data:', responseData)

    // Handle error if the status is not in the 2xx range
    if (res.status < 200 || res.status >= 300) {
      let errorMessage = 'An unknown error occurred.'

      // If it's an error response, handle accordingly
      if (typeof responseData === 'string') {
        errorMessage = responseData
      } else if (responseData && responseData.message) {
        errorMessage = responseData.message
      }

      const pError = document.createElement('p')
      pError.classList.add('error')
      pError.textContent = `Error: ${res.status}. ${errorMessage}`
      pError.style.color = 'red'
      messageContainer.appendChild(pError)
      return
    }

    // Success: display a success message
    const messageP = document.createElement('p')
    messageP.className = 'messageCustomer'
    messageP.textContent = `You have successfully created the event: ${responseData.title}`
    messageContainer.appendChild(messageP)
  } catch (error) {
    console.error('Error:', error)

    const pError = document.createElement('p')
    pError.classList.add('error')
    pError.textContent = 'An error occurred while creating the event.'
    pError.style.color = 'red'
    messageContainer.appendChild(pError)
  }
}
