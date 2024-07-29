import fetchurl from '../../../fetchurluser'
import './deleteevnt.css'

export const deleteEvent = () => {
  const token = localStorage.getItem('token')
  const divapp = document.querySelector('#app')
  divapp.innerHTML = ''
  const deleteeventdiv = document.createElement('div')
  deleteeventdiv.className = 'deleteevent'

  const eventsTodelete = async () => {
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
          eventselect(event._id, event)
        })
        ulevent.appendChild(lievent)
      })

      listevent.appendChild(ulevent)
      deleteeventdiv.append(listevent)
    } catch (error) {
      console.error('Error fetching events:', error.message)
      deleteeventdiv.innerHTML = 'Failed to load events.'
    }
  }

  const eventselect = async (eventid, event) => {
    deleteeventdiv.innerHTML = ''
    const selectedp = document.createElement('p')
    selectedp.textContent = `You have selected the event: ${event.title}. If you want to delete the event, please click on the delete button.`
    const deletebutton = document.createElement('button')
    deletebutton.textContent = 'Delete'
    deleteeventdiv.append(selectedp)
    deleteeventdiv.append(deletebutton)

    deletebutton.addEventListener('click', (e) => {
      e.preventDefault()
      eventdeletion(eventid)
    })
  }

  const eventdeletion = async (eventid) => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const res = await fetchurl(`/api/v1/events/${eventid}`, options)
      const errormessage = document.createElement('p')
      errormessage.className = 'errorp'
      if (res.status === 403) {
        errormessage.textContent = 'You are not authorized to delete the event.'
      } else if (res.status === 200) {
        errormessage.textContent = 'You successfully deleted the event.'
      } else {
        errormessage.textContent = 'Failed to delete the event.'
      }
      divapp.innerHTML = ''
      divapp.append(errormessage)
    } catch (error) {
      console.error('Error deleting event:', error.message)
      const errormessage = document.createElement('p')
      errormessage.textContent = 'An error occurred while deleting the event.'
      divapp.innerHTML = ''
      divapp.append(errormessage)
    }
  }

  eventsTodelete()
  divapp.append(deleteeventdiv)
}
