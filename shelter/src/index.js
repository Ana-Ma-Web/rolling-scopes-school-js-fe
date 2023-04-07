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
  const nav = document.querySelector('.nav')
  const header = document.querySelector('.header__wrapper')
  


  burger.addEventListener('click', () => {
    
    if (data.interface.isBurgerOpen) {
      header.classList.remove('open-menu')
    }else{
      header.classList.add('open-menu')
    }
    data.interface.isBurgerOpen = !data.interface.isBurgerOpen
    console.log(data.interface.isBurgerOpen);
  })
}