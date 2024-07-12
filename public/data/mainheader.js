import { createevent } from '../pages/events/event'
import { createhome } from '../pages/home/home'
import { createlogin } from '../pages/login/login'
import { createregister } from '../pages/register/register'

export const mainheaderdata = [
  {
    texto: 'Home',
    url: '#home',
    page: createhome
  },
  {
    texto: 'Events',
    url: '#events',
    page: createevent
  },
  {
    texto: 'Register',
    url: '#register',
    page: createregister
  },
  {
    texto: 'Login',
    url: '#login',
    page: createlogin
  }
]
