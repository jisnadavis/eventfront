import './updateuser.css'
import { fetchUser } from '../events/updateevent'
import fetchurl from '../fetchurluser'

export const updateUserRole = async () => {
  const token = localStorage.getItem('token')
  const divapp = document.querySelector('#app')
  divapp.innerHTML = ''
  const updatediv = document.createElement('div')
  updatediv.className = 'updatediv'
  const createp = document.createElement('p')
  createp.textContent = 'Loading all users'
  updatediv.appendChild(createp)

  try {
    const userdetail = await fetchUser()
    const userselect = document.createElement('select')

    const defaultOption = document.createElement('option')

    defaultOption.textContent = 'Please select user'
    defaultOption.value = ''
    defaultOption.disabled = true
    defaultOption.selected = true
    userselect.appendChild(defaultOption)

    for (const user of userdetail) {
      const option = document.createElement('option')
      option.textContent = user.name
      option.value = user.id
      userselect.appendChild(option)
    }

    userselect.addEventListener('change', (e) => {
      e.preventDefault()
      const selectedOption = e.target.options[e.target.selectedIndex]
      populateuser(selectedOption.value, selectedOption.textContent)
    })

    updatediv.appendChild(userselect)
    divapp.appendChild(updatediv)
  } catch (error) {
    console.error('Error fetching user details:', error.message)
    const errorMessage = document.createElement('p')
    errorMessage.textContent = 'Failed to load users. Please try again later.'
    errorMessage.style.color = 'red'
    updatediv.appendChild(errorMessage)
    divapp.appendChild(updatediv)
  }
}

const populateuser = async (eventid, username) => {
  console.log('enterd into the populateuser')
  const populatediv = document.createElement('div')
  populatediv.innerHTML = `
    <form id="userFormm">
      <div>
        <!-- Username input field -->
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" value="${username}" readonly />

        <!-- Hidden event ID input field -->
        <input type="hidden" id="eventid" name="eventid" value="${eventid}" />

        <!-- Role select dropdown -->
        <label for="role">Select Role:</label>
        <select name="role" id="role">
          <option value="" disabled selected>Select role</option>
          <option value="staff">Staff</option>
          <option value="organizer">Organizer</option>
        </select>

        <!-- Submit button -->
        <button type="submit" id="submitUserButton">Submit</button>
      </div>
    </form>
  `
  const errormessage = document.createElement('p')
  errormessage.className = 'errormessage'

  const userForm = populatediv.querySelector('#userFormm')
  userForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(userForm)
    const eventid = formData.get('eventid')
    await submitUserForm(formData, eventid)
  })

  const divapp = document.querySelector('#app')
  divapp.innerHTML = ''
  divapp.appendChild(populatediv)
  divapp.append(errormessage)
}

const submitUserForm = async (formData, eventid) => {
  const token = localStorage.getItem('token')
  const options = {
    method: 'PUT',
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  const errormessage = document.querySelector('.errormessage')
  try {
    const res = await fetchurl(`/api/v1/users/${eventid}`, options)
    if (res.status == 400) {
      errormessage.textContent = 'invalid role '
    }
    if (res.status == 200) {
      errormessage.textContent =
        'you successfully change the role of the selected user'
    }
  } catch (error) {
    console.error('Error submitting form:', error.message)
  }
}
