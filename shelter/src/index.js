const stringData = `[
  {
    "name": "Jennifer",
    "img": "./src/img/pets/pets-jennifer.png",
    "type": "Dog",
    "breed": "Labrador",
    "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    "age": "2 months",
    "inoculations": ["none"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Sophia",
    "img": "./src/img/pets/pets-sophia.png",
    "type": "Dog",
    "breed": "Shih tzu",
    "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    "age": "1 month",
    "inoculations": ["parvovirus"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Woody",
    "img": "./src/img/pets/pets-woody.png",
    "type": "Dog",
    "breed": "Golden Retriever",
    "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    "age": "3 years 6 months",
    "inoculations": ["adenovirus", "distemper"],
    "diseases": ["right back leg mobility reduced"],
    "parasites": ["none"]
  },
  {
    "name": "Scarlett",
    "img": "./src/img/pets/pets-scarlett.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    "age": "3 months",
    "inoculations": ["parainfluenza"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Katrine",
    "img": "./src/img/pets/pets-katrine.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    "age": "6 months",
    "inoculations": ["panleukopenia"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Timmy",
    "img": "./src/img/pets/pets-timmy.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    "age": "2 years 3 months",
    "inoculations": ["calicivirus", "viral rhinotracheitis"],
    "diseases": ["kidney stones"],
    "parasites": ["none"]
  },
  {
    "name": "Freddie",
    "img": "./src/img/pets/pets-freddie.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    "age": "2 months",
    "inoculations": ["rabies"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Charly",
    "img": "./src/img/pets/pets-charly.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    "age": "8 years",
    "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
    "diseases": ["deafness", "blindness"],
    "parasites": ["lice", "fleas"]
  }   
]`

const data = {
  pets: JSON.parse(stringData),
  interface: {
    isBurgerOpen: false,
    isBlackoutShow: false,
    slider: {
      pastArr: [],
      curArr: [],
      nextArr: [],
    }
  }
}
class Card {
  constructor({ name, img, type, breed, description,
    age, inoculations, diseases, parasites, ...rest }) {
    this.name = name
    this.img = img
    this.type = type
    this.breed = breed
    this.description = description
    this.age = age
    this.inoculations = inoculations
    this.diseases = diseases
    this.parasites = parasites
  }

  generateCard() {
    let template = ''
    let card = document.createElement('article')
    card.className = 'card'
    card.setAttribute('data-name', this.name)

    this.img && this.name &&
      (template += `<img class="card__img" src=${this.img} alt=${this.name}>
    <div class="card__title">${this.name}</div>
    <button class="button card__button">Learn more</button>`)

    card.innerHTML = template
    return card
  }
}

class Modal {
  constructor(classes) {
    this.modal = ''
  }

  generateModal(petData) {
    let modal = document.createElement('div')
    modal.className = 'modal'
    modal.innerHTML = `
    <img src="${petData.img}" alt="${petData.name}" class="modal__img">
    <div class="modal__content">
      <div class="title modal__title">${petData.name}</div>
      <div class="modal__subtitle">
      <span>${petData.type}</span> -
      <span>${petData.breed}</span>
    </div>
      <div class="modal__desc">${petData.description}</div>
      <ul class="modal__list">
        <li class="modal__list-item"><span>Age: </span>${petData.age}</li>
        <li class="modal__list-item"><span>Inoculations: </span>${petData.inoculations}</li>
        <li class="modal__list-item"><span>Diseases: </span>${petData.diseases}</li>
        <li class="modal__list-item"><span>Parasites: </span>${petData.parasites}</li>
      </ul>
    </div>
    <button class="button button_round modal__button"></button>`
    return modal
  }
}

window.onload = function () {

  if (data.pets) {
    renderCardsToPetsPage()
    initSlider()
    renderSlider()
  }

  addBurgerClickHandler()
  addBlackoutClickHandler()
  addCardClickHandler()
  addSliderClickHandler()
}

const addBlackout = () => {
  const blackout = document.querySelector('.blackout')
  blackout.classList.add('blackout_show')
  data.interface.isBlackoutShow = true
}
const removeBlackout = () => {
  const blackout = document.querySelector('.blackout')
  blackout.classList.remove('blackout_show')
  data.interface.isBlackoutShow = false
}
const addModalShow = () => {
  const modalWrapper = getWrapper('.modal-wrapper')
  modalWrapper.classList.add('modal_show')
}
const removeModalShow = () => {
  const modalWrapper = getWrapper('.modal-wrapper')
  modalWrapper.classList.remove('modal_show')
}
const addOpenMenu = () => {
  const header = document.querySelector('.header__wrapper')
  header.classList.add('open-menu')
  data.interface.isBurgerOpen = true

}
const removeOpenMenu = () => {
  const header = document.querySelector('.header__wrapper')
  header.classList.remove('open-menu')
  data.interface.isBurgerOpen = false
}
const addStopScroll = () => {
  const body = document.querySelector('body')
  body.classList.add('stop-scroll')
}
const removeStopScroll = () => {
  const body = document.querySelector('body')
  body.classList.remove('stop-scroll')
}

// ============ BURGER ============== //

const addBlackoutClickHandler = () => {
  const blackout = document.querySelector('.blackout')
  blackout.addEventListener('click', () => {
    removeBlackout()
    removeModalShow()
    removeOpenMenu()
    removeStopScroll()
  })
}

const addBurgerClickHandler = () => {
  const burger = document.querySelector('.burger')
  const navList = document.querySelector('.nav__list')

  burger.addEventListener('click', () => {
    if (data.interface.isBurgerOpen) {
      removeOpenMenu()
      removeBlackout()
      removeStopScroll()
    } else {
      addBlackout()
      addOpenMenu()
      addStopScroll()
    }
  })

  navList.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav__link')) {
      removeBlackout()
      removeOpenMenu()
      removeStopScroll()
    }
  })
}

const getWrapper = (selector) => {
  const container = document.querySelector(selector)
  container && (container.innerHTML = '')
  return container
}
// ============ CARDS ============== //

const renderCardsToPetsPage = () => {
  const cardsWrapper = getWrapper('.pets__cards')
  cardsWrapper && (generateCards(data.pets).forEach(card => {
    cardsWrapper.append(card.generateCard())
  }))
}

const generateCards = (data) => {
  let cards = []
  data.forEach(card => {
    cards.push(new Card(card))
  });
  return cards
}

// ============ MODAL ============== //

const addCardClickHandler = () => {
  const cards = document.querySelectorAll('.card')

  for (const card of cards) {
    card.addEventListener('click', (e) => {
      renderModalWindow(findPet(data.pets, card.dataset.name))
    })
  }
}

const findPet = (data, name) => {
  return data.find(pet => pet.name === name)
}

const renderModalWindow = (petData) => {
  const modalWrapper = getWrapper('.modal-wrapper')
  let modal = new Modal('modal')
  addBlackout()
  addModalShow()
  addStopScroll()
  modalWrapper.append(modal.generateModal(petData))

  const modalBtn = document.querySelector('.modal__button')
  modalBtn.addEventListener('click', () => {
    removeBlackout()
    removeModalShow()
    removeStopScroll()
  })
}

// ============ SLIDER ============== //

const initSlider = () => {

  forwardSliderMove()
  forwardSliderMove()
  forwardSliderMove()
}

const forwardSliderMove = () => {
  data.interface.slider.pastArr = data.interface.slider.curArr
  data.interface.slider.curArr = data.interface.slider.nextArr
  data.interface.slider.nextArr = generateNumberArr(data.interface.slider.curArr)
  renderSlider()
}

const backwardSliderMove = () => {
  data.interface.slider.nextArr = data.interface.slider.curArr
  data.interface.slider.curArr = data.interface.slider.pastArr
  data.interface.slider.pastArr = generateNumberArr(data.interface.slider.curArr)
  renderSlider()
}

const generateNumberArr = (curArr) => {
  let result = []
  
  for (let i = 0; i < 3; i++) {
    const generateRandomNumber = () => {
      number = Math.floor(Math.random() * 8)
      if (result.includes(number) || curArr?.includes(number)) {
        generateRandomNumber()
      } else {
        result.push(number)
      }
    }
    generateRandomNumber()
  }
  
  return result
}

const renderSlider = () => {
  const sliderLeftWrapper = getWrapper('.slider__cards-left')
  const sliderMiddleWrapper = getWrapper('.slider__cards-middle')
  const sliderRightWrapper = getWrapper('.slider__cards-right')
  const pastData = []
  const curData = []
  const nextData = []
  data.interface.slider.pastArr.forEach(e => {
    pastData.push(data.pets[e])
  })
  data.interface.slider.curArr.forEach(e => {
    curData.push(data.pets[e])
  })
  data.interface.slider.nextArr.forEach(e => {
    nextData.push(data.pets[e])
  })

  sliderLeftWrapper && (generateCards(pastData).forEach(card => {
    sliderLeftWrapper.append(card.generateCard())
  }))
  sliderMiddleWrapper && (generateCards(curData).forEach(card => {
    sliderMiddleWrapper.append(card.generateCard())
  }))
  sliderRightWrapper && (generateCards(nextData).forEach(card => {
    sliderRightWrapper.append(card.generateCard())
  }))
}

const addSliderClickHandler = () => {
  const slider = document.querySelector('.slider__cards')
  const leftBtn = document.querySelector('.slider__button-left')
  const rightBtn = document.querySelector('.slider__button-right')


  const moveLeft = () => {
    slider.classList.add('transition-left')
    leftBtn.removeEventListener('click', moveLeft)
    rightBtn.removeEventListener('click', moveRight)

    setTimeout(backwardSliderMove, 1500)
  }

  const moveRight = () => {
    slider.classList.add('transition-right')
    rightBtn.removeEventListener('click', moveRight)
    leftBtn.removeEventListener('click', moveLeft)

    setTimeout(forwardSliderMove, 1500)
  }

  leftBtn?.addEventListener('click', moveLeft)
  rightBtn?.addEventListener('click', moveRight)

  slider?.addEventListener('animationend', (event) => {
    if (event.animationName === 'move-left') {
      slider.classList.remove('transition-left')
    } else {
      slider.classList.remove('transition-right')
    }
    leftBtn?.addEventListener('click', moveLeft)
    rightBtn?.addEventListener('click', moveRight)
  })
}
