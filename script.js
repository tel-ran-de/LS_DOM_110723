const form = document.querySelector('form') // по тегу
const root = document.querySelector('#root') // по id #
const nameInput = document.querySelector('#name')
const ageInput = document.querySelector('#age')
const usersContainer = document.createElement('div')
usersContainer.classList.add('user-container')
root.append(usersContainer)

const buttonTheme = document.querySelector('#change-theme')
const currentTheme = localStorage.getItem('theme')

if (currentTheme) {
  document.body.classList.add(currentTheme)
}
const userFromStorage = JSON.parse(localStorage.getItem('userData'))

if (userFromStorage) {
  nameInput.value = userFromStorage.name
  ageInput.value = userFromStorage.age
}

buttonTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme')
  localStorage.setItem('theme', document.body.classList)
})

const userArray = JSON.parse(localStorage.getItem('userArray')) || []

const showUsers = (arr) => {
  usersContainer.innerHTML = ''
  arr.forEach((user) => {
    const userCard = document.createElement('div')
    userCard.classList.add('user-card')
    const userName = document.createElement('h2')
    userName.innerText = user.name
    const userAge = document.createElement('p')
    userAge.innerText = user.age
    userCard.append(userName, userAge)
    usersContainer.append(userCard)
  })
}

showUsers(userArray)

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const user = {
    name: nameInput.value,
    age: ageInput.value,
  }
  localStorage.setItem('userData', JSON.stringify(user))
  userArray.push(user)
  localStorage.setItem('userArray', JSON.stringify(userArray))
  showUsers(userArray)
  nameInput.value = ''
  ageInput.value = ''
})

// SEARCH INPUT
const searchLabel = document.createElement('label')
searchLabel.setAttribute('for', 'search')
searchLabel.innerText = 'search'
root.prepend(searchLabel)

const searchInput = document.createElement('input')
searchInput.type = 'text'
searchInput.id = 'search'
root.prepend(searchInput)

searchInput.addEventListener('input', (event) => {
  // ... spread operator - создаем копию массива
  // копия для того чтобы не мутировать исходный массив
  // const newArray = [...userArray]

  const filteredArray = userArray.filter((user) =>
    user.name.toLowerCase().includes(event.target.value.toLowerCase())
  )

  showUsers(filteredArray)
  // при вводе данных проверяем содержит ли наш элемент(его имя) подстроку
  // и результат перерисовываем
})
