import { createbutton } from '../../components/button/button'
import { deleteAttendees } from '../attendeeregister/deleteattendee'
import { getAttendees } from '../attendeeregister/getattendees'
import { createEvent } from '../events/creatingevent'
import { deleteEvent } from '../events/deleteevent'
import { updateEvent } from '../events/updateevent'
import { updateUserRole } from '../register/updateuserrole'

import './admin.css'
export const adminpage = () => {
  const divapp = document.querySelector('#app')
  divapp.innerHTML = ''
  const buttonContainer = document.createElement('div')
  buttonContainer.className = 'admin_function'
  buttonContainer.innerHTML = `
  <button id="createEventButton" class="adminButton">Create Event</button>
  <button id="updateEventButton" class="adminButton">Update Event</button>
  <button id="updateUserRoleButton" class="adminButton">Update User Role</button>
  <button id="deleteEventButton" class="adminButton">Delete Event</button>
  <button id="getAttendeesButton" class="adminButton">Get Attendees</button>
  <button id="deleteAttendeesButton" class="adminButton">Delete Attendees</button>
`
  divapp.append(buttonContainer)
  document
    .getElementById('createEventButton')
    .addEventListener('click', createEvent)
  document
    .getElementById('updateEventButton')
    .addEventListener('click', updateEvent)
  document
    .getElementById('updateUserRoleButton')
    .addEventListener('click', updateUserRole)
  document
    .getElementById('deleteEventButton')
    .addEventListener('click', deleteEvent)
  document
    .getElementById('getAttendeesButton')
    .addEventListener('click', getAttendees)
  document
    .getElementById('deleteAttendeesButton')
    .addEventListener('click', deleteAttendees)
  return
}
