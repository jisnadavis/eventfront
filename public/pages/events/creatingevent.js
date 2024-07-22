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
      <input type="text" id="eventorganizer" name="eventorganizer"  class="hidden-input" readonly value="${
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

  const opciones = {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
    // Removing headers for proper FormData submission
  }

  try {
    const res = await fetch('http://localhost:3000/api/v1/events/', opciones)

    messageContainer.innerHTML = ''
    console.log('Response status:', res.status)

    if (res.status === 400) {
      const errorData = await res.json()
      console.error('Error data:', errorData)
      const pError = document.createElement('p')
      pError.classList.add('error')
      pError.textContent =
        'Bad request. Please check your data. Unable to create the event'
      pError.style.color = 'red'
      messageContainer.appendChild(pError)
      return
    }

    const respuestaFinal = await res.json()
    console.log('Response data:', respuestaFinal)
    const messageP = document.createElement('p')
    messageP.className = 'messageCustomer'
    messageP.textContent = `You have successfully created the event: ${respuestaFinal.title}`
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