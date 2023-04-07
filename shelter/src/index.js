const data = {
  interface: {
    isBurgerOpen: false
  }
}

window.onload = function () {
  console.log('meow');

  addBurgerClickHandler() 

}

const addBurgerClickHandler = () => {
  const burger = document.querySelector('.burger')
  const header = document.querySelector('.header__wrapper')
  const blackout = document.querySelector('.blackout')

  burger.addEventListener('click', () => {
    if (data.interface.isBurgerOpen) {
      header.classList.remove('open-menu')
    }else{
      header.classList.add('open-menu')
    }
    data.interface.isBurgerOpen = !data.interface.isBurgerOpen
  })

  blackout.addEventListener('click', () => {
    data.interface.isBurgerOpen = false
    header.classList.remove('open-menu')
  })
}