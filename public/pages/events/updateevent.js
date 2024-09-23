import fetchurl from '../fetchurluser'
import './updateevent.css'

export const updateEvent = () => {
  const token = localStorage.getItem('token')
  const divapp = document.querySelector('#app')
  divapp.innerHTML = ''
  const eventlistdiv = document.createElement('div')
  eventlistdiv.id = 'eventlist'
  eventlistdiv.innerHTML = 'Loading the events...'
  fetchEvents(eventlistdiv)

  divapp.append(eventlistdiv)
}

// Function to fetch events from the server
export const fetchEvents = async (parent) => {
  try {
    const res = await fetchurl('/api/v1/events/')
    const events = res.resdata

    const listevent = document.createElement('div')
    listevent.id = 'listevent'
    const ulevent = document.createElement('ul')

    events.forEach((event) => {
      const lievent = document.createElement('li')
      lievent.textContent = event.title
      lievent.dataset.id = event._id
      lievent.addEventListener('click', () => {
        selectEvent(event._id, event)
      })
      ulevent.appendChild(lievent)
    })

    listevent.appendChild(ulevent)
    parent.append(listevent)
  } catch (error) {
    console.error('Error fetching events:', error.message)
    parent.innerHTML = 'Failed to load events.'
  }
}

// Function to select and display event details
export const selectEvent = async (eventId, event) => {
  const token = localStorage.getItem('token')
  try {
    const res = await fetchurl(`/api/v1/events/${eventId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const eventDetails = res.resdata
    console.log(eventDetails)
    populateForm(event)
  } catch (error) {
    console.error('Error selecting event:', error.message)
  }
}

export const fetchUser = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No logged-in user found')
    }

    const res = await fetchurl('/api/v1/users/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (res.status !== 200) {
      throw new Error(`Failed to fetch user: ${res.status}`)
    }

    const userData = res.resdata
    return userData.map((user) => ({
      name: user.name,
      id: user._id
    }))
  } catch (error) {
    console.error('Error fetching user:', error.message)
    return null
  }
}

// Function to populate the form with event details

const populateForm = async (event) => {
  try {
    const user_id = await fetchUser()
    if (!user_id) {
      throw new Error('Failed to fetch logged-in user details')
    }

    const eventCreateDiv = document.createElement('div')
    eventCreateDiv.id = 'eventCreateDiv'

    const form = document.createElement('form')
    form.id = 'eventForm'

    // Hidden input for event ID
    const eventIdInput = document.createElement('input')
    eventIdInput.type = 'hidden'
    eventIdInput.id = 'id'
    eventIdInput.name = 'id'
    eventIdInput.value = event._id
    form.appendChild(eventIdInput)

    // Title input
    const titleLabel = document.createElement('label')
    titleLabel.setAttribute('for', 'title')
    titleLabel.textContent = 'Title:'
    form.appendChild(titleLabel)

    const titleInput = document.createElement('input')
    titleInput.type = 'text'
    titleInput.id = 'title'
    titleInput.name = 'title'
    titleInput.required = true
    titleInput.value = event.title
    form.appendChild(titleInput)

    // Date input
    const dateLabel = document.createElement('label')
    dateLabel.setAttribute('for', 'date')
    dateLabel.textContent = 'Date:'
    form.appendChild(dateLabel)

    const dateInput = document.createElement('input')
    dateInput.type = 'date'
    dateInput.id = 'date'
    dateInput.name = 'date'
    dateInput.required = true
    dateInput.value = event.date
    form.appendChild(dateInput)

    // Location input
    const locationLabel = document.createElement('label')
    locationLabel.setAttribute('for', 'location')
    locationLabel.textContent = 'Location:'
    form.appendChild(locationLabel)

    const locationInput = document.createElement('input')
    locationInput.type = 'text'
    locationInput.id = 'location'
    locationInput.name = 'location'
    locationInput.required = true
    locationInput.value = event.location
    form.appendChild(locationInput)

    // Description input
    const descriptionLabel = document.createElement('label')
    descriptionLabel.setAttribute('for', 'description')
    descriptionLabel.textContent = 'Description:'
    form.appendChild(descriptionLabel)

    const descriptionTextarea = document.createElement('textarea')
    descriptionTextarea.id = 'description'
    descriptionTextarea.name = 'description'
    descriptionTextarea.required = true
    descriptionTextarea.textContent = event.description
    form.appendChild(descriptionTextarea)

    // Event images input
    const eventimgLabel = document.createElement('label')
    eventimgLabel.setAttribute('for', 'eventimg')
    eventimgLabel.textContent = 'Event Images:'
    form.appendChild(eventimgLabel)

    const eventimgInput = document.createElement('input')
    eventimgInput.type = 'file'
    eventimgInput.id = 'eventimg'
    eventimgInput.name = 'eventimg'
    eventimgInput.multiple = true
    form.appendChild(eventimgInput)
    const informationp = document.createElement('p')
    informationp.textContent =
      'if you want to add any eventorganizer please select from the list if  you dont want please select your name itself'
    informationp.className = 'inform'
    informationp.style.color = 'blue'
    form.appendChild(informationp)
    // Event organizer input
    const eventorganizerLabel = document.createElement('label')
    eventorganizerLabel.setAttribute('for', 'eventorganizer')
    eventorganizerLabel.textContent = 'Event Organizer:'
    form.appendChild(eventorganizerLabel)

    const selecteventorg = document.createElement('select')
    selecteventorg.id = 'eventorganizer'
    selecteventorg.name = 'eventorganizer'

    user_id.forEach((user) => {
      const option = document.createElement('option')
      option.textContent = user.name
      option.value = user.id
      selecteventorg.appendChild(option)
    })

    form.appendChild(selecteventorg)

    const eventorganizerInput = document.createElement('input')
    eventorganizerInput.type = 'hidden'
    eventorganizerInput.id = 'eventorganizerHidden'
    eventorganizerInput.name = 'eventorganizer'
    eventorganizerInput.value = JSON.stringify([user_id[0].id])
    form.appendChild(eventorganizerInput)

    selecteventorg.addEventListener('change', (e) => {
      const selectedValue = e.target.value
      eventorganizerInput.value = JSON.stringify([selectedValue]) // Ensure it's an array
      console.log('Selected event organizer:', eventorganizerInput.value)
    })

    // Submit button
    const submitButton = document.createElement('button')
    submitButton.type = 'submit'
    submitButton.id = 'submitEventButton'
    submitButton.textContent = 'Update'
    form.appendChild(submitButton)

    eventCreateDiv.appendChild(form)

    // Message container
    const messageDiv = document.createElement('div')
    messageDiv.id = 'messageevent'
    eventCreateDiv.appendChild(messageDiv)

    // Append form to #app element
    const appDiv = document.querySelector('#app')
    appDiv.innerHTML = ''
    appDiv.appendChild(eventCreateDiv)

    // Form submit event listener
    form.addEventListener('submit', async (e) => {
      e.preventDefault()

      await updateEventDetails(event._id, event)
    })
  } catch (error) {
    console.error('Error populating form:', error.message)
    const divapp = document.querySelector('#app')
    const errorDiv = document.createElement('div')
    errorDiv.textContent = 'Failed to populate form: ' + error.message
    errorDiv.style.color = 'red'
    divapp.appendChild(errorDiv)
  }
}
const updateEventDetails = async (eventId, eventDetails) => {
  const form = document.querySelector('#eventForm')
  if (!form) {
    console.error('Form not found')
    return
  }

  const formData = new FormData(form)

  // Retrieve eventorganizer value from FormData
  let eventorganizerValue = formData.get('eventorganizer')

  // Log the initial value for debugging
  console.log('Initial eventorganizer value:', eventorganizerValue)

  try {
    // Attempt to parse eventorganizerValue as JSON
    const parsedEventOrganizer = [eventorganizerValue]
    console.log('Parsed event organizer:', parsedEventOrganizer)

    // Update formData with properly formatted eventorganizerValue
    formData.set('eventorganizer', JSON.stringify(parsedEventOrganizer))
  } catch (error) {
    console.error('Error parsing event organizer:', error.message)
    return // Exit function early
  }

  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`)
  }

  const token = localStorage.getItem('token')
  if (!token) {
    console.error('No token found in localStorage')
    return
  }

  const options = {
    method: 'PUT',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  try {
    const res = await fetchurl(`/api/v1/events/${eventId}`, options)

    const messageContainer = document.querySelector('#messageevent')
    messageContainer.innerHTML = ''
    console.log('Response:', res)
    if (res.status !== 200) {
      console.log('Response status:', res.status)
      console.log('Response headers:', res.headers)

      const errorData = res.resdata
      console.log('Error data:', errorData)

      if (res.status === 400) {
        const pError = document.createElement('p')
        pError.classList.add('error')
        pError.textContent =
          'Bad request. Please check your data. Unable to update the event.'
        pError.style.color = 'red'
        messageContainer.appendChild(pError)
      } else if (res.status === 401 || res.status === 403) {
        const pError = document.createElement('p')
        pError.classList.add('error')
        pError.textContent = 'You are not authorized to perform this action.'
        pError.style.color = 'red'
        messageContainer.appendChild(pError)
      } else {
        const pError = document.createElement('p')
        pError.classList.add('error')
        pError.textContent = `Unexpected error: ${res.status}`
        pError.style.color = 'red'
        messageContainer.appendChild(pError)
      }
      return
    }

    const finalResponse = res.resdata
    console.log('Final response:', finalResponse)
    const messageP = document.createElement('p')
    messageP.className = 'messageCustomer'
    messageP.textContent = `You have successfully updated the event: ${finalResponse.title}`
    messageContainer.appendChild(messageP)
  } catch (error) {
    console.error('Error updating event:', error.message)
  }
}

const isValidObjectId = (id) => {
  const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$')
  return checkForHexRegExp.test(id)
}
