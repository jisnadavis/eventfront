import { createbutton } from '../../components/button/button'
import fetchurl from '../fetchurluser'
import { updatecustomer } from '../updatecustomer/customerudate'
import './attendee.css'

export const registerCustomer = (eventid) => {
  const divApp = document.querySelector('#app')
  divApp.innerHTML = ''

  const registerDiv = document.createElement('div')
  registerDiv.className = 'registerdiv'
  registerDiv.innerHTML = `
    <form id="registerFormcustomer">
     
     <input type="text" name="name" placeholder="Enter your name" required>
      <input type="text" name="emailId" placeholder="Enter your emailid" required>
      <input type="number" id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" pattern="[0-9]{10}" maxlength="10" required>
      <input type="hidden" name="eventId" value="${eventid}">
      <button type="submit" class="register">Register</button>
    </form>
    <div id="messageContainer"></div>
  `

  divApp.append(registerDiv)

  const form = document.querySelector('#registerFormcustomer')
  const phoneNumberInput = form.querySelector('#phoneNumber')

  phoneNumberInput.addEventListener('input', () => {
    if (phoneNumberInput.value.length > 10) {
      phoneNumberInput.value = phoneNumberInput.value.slice(0, 10)
    }
  })

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    await submit(form, eventid)
  })
}

const submit = async (form, eventid) => {
  const text = 'update'
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())
  const objectFinal = JSON.stringify(data)
  const opciones = {
    method: 'POST',
    body: objectFinal,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const res = await fetchurl('/api/v1/attende/', opciones)
  const messageContainer = document.querySelector('#messageContainer')

  messageContainer.innerHTML = ''

  if (res.status === 400) {
    const pError = document.createElement('p')
    pError.classList.add('error')
    pError.textContent =
      'The phone number is already registered. If you want to make any changes, please click on the update button.'
    pError.style.color = 'red'

    messageContainer.appendChild(pError)
    const updatebutton = createbutton(text, messageContainer)
    if (updatebutton) {
      updatebutton.addEventListener('click', () => {
        updatecustomer(eventid)
      })
    } else {
      console.error('createbutton did not return a valid button element')
    }
    return
  }

  const respuestaFinal = res.resdata

  const messageP = document.createElement('p')
  messageP.className = 'messageCustomer'
  messageP.textContent =
    'You have successfully joined the party, ' +
    respuestaFinal.name +
    ' .need any change  please click updatebutton'

  messageContainer.appendChild(messageP)
  const updatebutton = createbutton(text, messageContainer)
  if (updatebutton) {
    updatebutton.addEventListener('click', () => {
      updatecustomer(eventid)
    })
  } else {
    console.error('createbutton did not return a valid button element')
  }
}
