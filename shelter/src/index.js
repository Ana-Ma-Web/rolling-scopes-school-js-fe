const data = {
  interface: {
    isBurgerOpen: false
  }
}

window.onload = function () {
  addBurgerClickHandler()
}

const addBurgerClickHandler = () => {
  const header = document.querySelector('.header__wrapper')
  const burger = document.querySelector('.burger')
  const blackout = document.querySelector('.blackout')
  const navList = document.querySelector('.nav__list')
  const body = document.querySelector('body')

  burger.addEventListener('click', () => {
    if (data.interface.isBurgerOpen) {
      header.classList.remove('open-menu')
      body.classList.remove('stop-scroll')
    } else {
      header.classList.add('open-menu')
      body.classList.add('stop-scroll')
    }
    data.interface.isBurgerOpen = !data.interface.isBurgerOpen
  })

  blackout.addEventListener('click', () => {
    data.interface.isBurgerOpen = false
    header.classList.remove('open-menu')
    body.classList.remove('stop-scroll')
  })

  navList.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav__link')) {
      data.interface.isBurgerOpen = false
      header.classList.remove('open-menu')
      body.classList.remove('stop-scroll')
    }
  })
}