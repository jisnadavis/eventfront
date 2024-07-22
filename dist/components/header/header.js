import { mainheaderdata } from '../../data/mainheader'
import { createlogin } from '../../pages/login/login'
import './header.css'
export const createheader = () => {
  const header = document.createElement('header')
  header.className = 'headercontainer'
  const logoimg = document.createElement('img')
  logoimg.className = 'logo'
  logoimg.src = './assets/logo.png'
  header.appendChild(logoimg)
  const navcontainer = document.createElement('nav')
  const ulcontainer = document.createElement('ul')
  ulcontainer.className = 'ulcontainer'
  for (const data of mainheaderdata) {
    const licontainer = document.createElement('li')
    licontainer.className = 'pages'

    const anchor = document.createElement('a')
    anchor.href = data.url
    anchor.textContent = data.texto
    if (anchor.textContent.toLowerCase() === 'home') {
      anchor.classList.add('active')
    }

    if (data.texto.toLowerCase() === 'login') {
      if (localStorage.getItem('token')) {
        anchor.textContent = 'Logout'
        anchor.addEventListener('click', () => {
          localStorage.clear()
          anchor.textContent = 'Login'
          document.querySelector('.admin_button')?.remove()
          createheader() // Recreate header to update the UI

          window.location.reload() // Refresh the page to reflect the logout
        })
      } else {
        anchor.addEventListener('click', () => {
          createlogin() // Redirect to the login page
        })
      }
    } else {
      anchor.addEventListener('click', (event) => {
        event.preventDefault()

        document.querySelectorAll('.pages a').forEach((anchor) => {
          anchor.classList.remove('active')
        })
        anchor.classList.add('active')
        if (typeof data.page === 'function') {
          data.page()
        }
      })
    }
    licontainer.appendChild(anchor)
    ulcontainer.appendChild(licontainer)
  }

  navcontainer.appendChild(ulcontainer)
  header.appendChild(navcontainer)
  document.body.appendChild(header)

  return header
}
