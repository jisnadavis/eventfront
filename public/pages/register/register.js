import fetchurl from '../../../fetchurluser'
import './register.css'
export const createregister = () => {
  const divapp = document.querySelector('#app')
  divapp.innerHTML = ''

  const registerdiv = document.createElement('div')
  registerdiv.className = 'registerdiv'
  registerdiv.innerHTML = `
    <form id="registerForm">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" placeholder="Enter your name" required>
      
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" placeholder="Enter your email" required>
      
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" placeholder="Enter your password" required>
      
      <label for="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required>
      
      <button type="submit" id="userregister">Register</button>
    </form>
    <div id="messageContainer"></div>
  `

  divapp.appendChild(registerdiv)

  const form = document.querySelector('#registerForm')
  const messageContainer = document.querySelector('#messageContainer')

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    await register(form, messageContainer)
  })
}

const register = async (form, messageContainer) => {
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  if (data.password !== data.confirmPassword) {
    messageContainer.innerHTML = ''
    const pError = document.createElement('p')
    pError.classList.add('error')
    pError.textContent = 'Passwords do not match.'
    pError.style.color = 'red'
    messageContainer.appendChild(pError)
    return
  }

  const objectFinal = JSON.stringify(data)
  console.log('Sending data:', objectFinal)

  const opciones = {
    method: 'POST',
    body: objectFinal,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const res = await fetchurl('/api/v1/users/', opciones)

  messageContainer.innerHTML = ''
  console.log('Response status:', res.status)

  if (res.status === 400) {
    const errorData = res
    console.error('Error data:', errorData)
    const pError = document.createElement('p')
    pError.classList.add('error')
    pError.textContent = 'Bad request. Please check your data.'
    pError.style.color = 'red'
    messageContainer.appendChild(pError)
    return
  }

  if (res.status === 409) {
    const pError = document.createElement('p')
    pError.classList.add('error')
    pError.textContent = 'Email already registered.'
    pError.style.color = 'red'
    messageContainer.appendChild(pError)
    return
  }

  const respuestaFinal = res.resdata
  console.log('Response data:', respuestaFinal)
  const messageP = document.createElement('p')
  messageP.className = 'messageCustomer'
  messageP.textContent = 'You have successfully registered.'
  messageContainer.appendChild(messageP)
}
