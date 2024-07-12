import { createbutton } from '../../components/button/button'
import { createheader } from '../../components/header/header'
import { adminpage } from '../admin/admin'
import './login.css'

export const createlogin = () => {
  const divapp = document.querySelector('#app')
  divapp.innerHTML = ''
  const logindiv = document.createElement('div')
  logindiv.className = 'logindiv'
  logindiv.innerHTML = `
  <form id="loginForm">
   <label for="email">Email:</label>
      <input type="email" id="email" name="email" placeholder="Enter your email" required>
       <label for="password">Password:</label>
      <input type="password" id="password" name="password" placeholder="Enter your password" required>
       <button type="submit" id="userlogin">Login</button>
    </form>
    <div id="messageLogin"></div>`

  divapp.appendChild(logindiv)
  const form = document.querySelector('#loginForm')
  const messageContainer = document.querySelector('#messageLogin')

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    await Login(form, messageContainer)
  })
}
const Login = async (form, messageContainer) => {
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())
  const objectFinal = JSON.stringify(data)
  console.log('Sending data:', objectFinal)

  const opciones = {
    method: 'POST',
    body: objectFinal,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const res = await fetch('http://localhost:3000/api/v1/users/login', opciones)

  messageContainer.innerHTML = ''
  console.log('Response status:', res.status)

  if (res.status === 400) {
    const errorData = await res.json()
    console.error('Error data:', errorData)
    const pError = document.createElement('p')
    pError.classList.add('error')
    pError.textContent = 'email o password is incorrect.'
    pError.style.color = 'red'
    messageContainer.appendChild(pError)
    return
  }
  const respuestaFinal = await res.json()
  console.log('Response data:', respuestaFinal)
  localStorage.setItem('token', respuestaFinal.token)
  localStorage.setItem('user', JSON.stringify(respuestaFinal.user))
  document.querySelector('header').remove()
  createheader()
  const admin = respuestaFinal.user.role
  console.log(admin)

  if (admin === 'organizer') {
    const divapp = document.querySelector('#app')
    divapp.innerHTML = ''
    const welcomelog = document.createElement('div')
    welcomelog.className = 'welcomelog'
    const welcomep = document.createElement('p')
    const userNameSpan = document.createElement('span')
    userNameSpan.textContent = `${respuestaFinal.user.name}`
    userNameSpan.style.color = 'blue'

    welcomep.textContent = 'welcome '
    welcomep.appendChild(userNameSpan)
    welcomep.appendChild(
      document.createTextNode(' please click on the admin button')
    )

    welcomelog.appendChild(welcomep)
    divapp.append(welcomelog)
    const adminbutton = createbutton('admin', document.body)
    adminbutton.className = 'admin_button'
    adminbutton.addEventListener('click', (event) => {
      event.preventDefault()
      adminpage()
    })
  }
  if (admin === 'staff') {
    const divapp = document.querySelector('#app')
    divapp.innerHTML = ''
    const welcomelog = document.createElement('div')
    welcomelog.className = 'welcomelog'
    const welcomep = document.createElement('p')
    const userNameSpan = document.createElement('span')
    userNameSpan.textContent = `${respuestaFinal.user.name}`
    userNameSpan.style.color = 'blue'

    welcomep.textContent = 'welcome '
    welcomep.appendChild(userNameSpan)
    welcomep.appendChild(
      document.createTextNode(
        'you are only staff of this event you cant make any update  '
      )
    )

    welcomelog.appendChild(welcomep)
    divapp.append(welcomelog)
  }
}
