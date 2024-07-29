import fetchurl from '../../../fetchurluser'
import './customer.css'

export const updatecustomer = (eventid) => {
  const divapp = document.querySelector('#app')
  divapp.innerHTML = ''
  const updateDiv = document.createElement('div')
  updateDiv.innerHTML = `
    <form id="updateForm">
      <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" pattern="[0-9{5,10}" minlength="5" maxlength="10" required>
      <input type="text" name="name" placeholder="Enter your name" required>
      <input type="email" name="emailId" placeholder="Enter your email" required>
      <input type="hidden" name="eventId" value="${eventid}">
      <button type="submit">Update</button>
    </form>
    <div id="messageContainer"></div>
  `
  divapp.append(updateDiv)

  const form = document.querySelector('#updateForm')
  const phoneNumberInput = form.querySelector('#phoneNumber')
  const messageContainer = document.querySelector('#messageContainer')

  phoneNumberInput.addEventListener('input', () => {
    if (phoneNumberInput.value.length > 10) {
      phoneNumberInput.value = phoneNumberInput.value.slice(0, 10)
    }
  })

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    await update(form, messageContainer)
  })
}

const update = async (form, messageContainer) => {
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())
  const objectFinal = JSON.stringify(data)
  console.log('Sending data:', objectFinal) // Debug statement

  const opciones = {
    method: 'PUT',
    body: objectFinal,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const res = await fetchurl(`/api/v1/attende/${data.phoneNumber}`, opciones)
  const refinal = res.resdata
  console.log(refinal.name)

  messageContainer.innerHTML = ''
  console.log('Response status:', res.status) // Debug statement

  if (res.status === 404) {
    const pError = document.createElement('p')
    pError.classList.add('error')
    pError.textContent = 'The phone number is not registered.'
    pError.style.color = 'red'
    messageContainer.appendChild(pError)
    return
  }

  if (res.status === 400) {
    const errorData = await res.json()
    console.error('Error data:', errorData)
    const pError = document.createElement('p')
    pError.classList.add('error')
    pError.textContent = 'Bad request. Please check your data.'
    pError.style.color = 'red'
    messageContainer.appendChild(pError)
    return
  }

  console.log('Response data:', refinal) // Debug statement
  const messageP = document.createElement('p')
  messageP.className = 'messageCustomer'
  messageP.textContent = 'You have updated your details.'
  messageContainer.appendChild(messageP)
}
