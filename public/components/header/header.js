import { mainheaderdata } from '../../data/mainheader'
import { createlogin } from '../../pages/login/login'
import './header.css'
export const createheader = () => {
  const header = document.createElement('header')
  header.className = 'headercontainer'
  // Logo
  const logoimg = document.createElement('img')
  logoimg.className = 'logo'
  logoimg.src = './assets/logo.png'
  header.appendChild(logoimg)
  // Navigation
  const navcontainer = document.createElement('nav')
  navcontainer.className = 'navcontainer'
  const ulcontainer = document.createElement('ul')
  ulcontainer.className = 'ulcontainer'
  const menu_desplagable = document.createElement('img')
  menu_desplagable.src = './assets/menu desplagable.png'
  menu_desplagable.className = 'menu_desplagable'
  // Toggle Menu
  menu_desplagable.addEventListener('click', () => {
    ulcontainer.classList.toggle('menu_vertical')
  })
  menu_desplagable.addEventListener('click', () => {
    if (ulcontainer.classList.contains('menu_vertical')) {
      if (ulcontainer.classList.contains('show')) {
        ulcontainer.classList.remove('show')
        ulcontainer.classList.add('hide')
      } else {
        ulcontainer.classList.remove('hide')
        ulcontainer.classList.add('show')
      }
    } else {
      ulcontainer.classList.add('menu_vertical', 'show')
    }
  })
  // Create menu items
  for (const data of mainheaderdata) {
    const licontainer = document.createElement('li')
    licontainer.className = 'pages'
    const anchor = document.createElement('a')
    anchor.href = data.url
    anchor.textContent = data.texto
    // Close menu when clicking a menu item
    licontainer.addEventListener('click', () => {
      if (ulcontainer.classList.contains('menu_vertical')) {
        ulcontainer.classList.remove('show')
        ulcontainer.classList.add('hide')
        setTimeout(() => ulcontainer.classList.remove('menu_vertical'), 300)
      }
    })
    // Add active class for "home"
    if (anchor.textContent.toLowerCase() === 'home') {
      anchor.classList.add('active')
    }
    // Handle Login/Logout functionality
    if (data.texto.toLowerCase() === 'login') {
      if (localStorage.getItem('token')) {
        anchor.textContent = 'Logout'
        anchor.addEventListener('click', () => {
          localStorage.clear()
          anchor.textContent = 'Login'
          document.querySelector('.admin_button')?.remove()
          createheader()
          window.location.reload()
        })
      } else {
        anchor.addEventListener('click', () => {
          createlogin()
        })
      }
    } else {
      // Handle page navigation
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
  header.appendChild(menu_desplagable)
  header.appendChild(navcontainer)
  document.body.appendChild(header)
  return header
}
