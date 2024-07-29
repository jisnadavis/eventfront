import fetchurl from '../../../fetchurluser'
import './delete.css'
export const deleteAttendees = () => {
  const divapp = document.querySelector('#app')
  divapp.innerHTML = ''

  const deleteattendeediv = document.createElement('div')
  deleteattendeediv.className = 'deleteattende'

  const createp = document.createElement('p')
  createp.textContent = 'Attendees registered for the event'
  deleteattendeediv.appendChild(createp)

  const fetchattendee = async () => {
    const token = localStorage.getItem('token')

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const res = await fetchurl(`/api/v1/attende/`, options)
      const confirmedattendee = res.resdata

      if (confirmedattendee.length === 0) {
        alert('Nobody registered for the event')
        return
      }

      const ulcustomer = document.createElement('ul')
      for (const customer of confirmedattendee) {
        const customerdelete = document.createElement('div')

        const li = document.createElement('li')
        li.textContent = customer.name

        const deletebutton = document.createElement('button')
        deletebutton.textContent = 'Delete'
        deletebutton.onclick = async () => {
          await deleteCustomer(customer._id)
          deleteattendeediv.innerHTML = ''
          fetchattendee()
        }

        customerdelete.appendChild(li)
        customerdelete.appendChild(deletebutton)
        ulcustomer.appendChild(customerdelete)
      }
      deleteattendeediv.appendChild(ulcustomer)
    } catch (error) {
      console.error('Error fetching attendees:', error)
      alert('Error fetching attendees')
    }
  }

  const deleteCustomer = async (id) => {
    const token = localStorage.getItem('token')

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {
      console.log(`Attempting to delete attendee with ID: ${id}`)
      const res = await fetchurl(`/api/v1/attende/${id}`, options)
      if (res.status === 200) {
        alert('Attendee deleted successfully')
      } else if (res.status === 403) {
        const errorData = res.resdata
        console.error('Unauthorized access:', errorData)
        alert(
          'Unauthorized: You do not have permission to delete this attendee'
        )
      } else if (res.status === 404) {
        const errorData = await res.json()
        console.error('Attendee not found:', errorData)
        alert('Attendee not found')
      } else {
        const errorData = res.resdata
        console.error('Error deleting attendee:', errorData)
        alert(`Error deleting attendee: ${errorData.message || res.statusText}`)
      }
    } catch (error) {
      console.error('Network error:', error)
      alert('Network error occurred while deleting attendee')
    }
  }

  fetchattendee()
  divapp.append(deleteattendeediv)
}
