import { createheader } from './public/components/header/header'
import { createhome } from './public/pages/home/home'
import './style.css'
const divapp = document.querySelector('#app')
divapp.innerHTML = ''
createheader()
createhome()
