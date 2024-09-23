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
  const user = JSON.parse(localStorage.getItem('user')).id
  formData.set('eventorganizer', user)

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  try {
    const res = await fetch(
      'https://eventbackend-zcqb.vercel.app/api/v1/events/createevent',
      options
    )

    while (messageContainer.firstChild) {
      messageContainer.removeChild(messageContainer.firstChild)
    }

    console.log('Response status:', res.status)

    const responseText = await res.text() // Read response as text
    console.log('Response text:', responseText) // Log full response

    if (!res.ok) {
      let errorData = { message: 'Unknown error' }

      try {
        errorData = JSON.parse(responseText)
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError)
      }

      console.error('Error data:', errorData)

      const pError = document.createElement('p')
      pError.classList.add('error')
      pError.textContent = `Error: ${res.status}. ${
        errorData.message || 'An unknown error occurred.'
      }`
      pError.style.color = 'red'
      messageContainer.appendChild(pError)
      return
    }

    const responseData = JSON.parse(responseText)
    console.log('Response data:', responseData)

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
