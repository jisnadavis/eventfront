import './home.css'

export const createhome = () => {
  const divApp = document.querySelector('#app')
  divApp.innerHTML = ''

  const homeDiv = document.createElement('div')
  homeDiv.className = 'home'

  const titleH1 = document.createElement('h1')
  titleH1.className = 'tittle'
  titleH1.textContent =
    "We don't remember days; we remember moments! Come and enjoy."

  const imageDiv = document.createElement('div')
  imageDiv.className = 'imagediv'

  homeDiv.appendChild(titleH1)
  homeDiv.appendChild(imageDiv)
  divApp.append(homeDiv)
}
