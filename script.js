const form = document.querySelector('form')
const header = document.querySelector('header')
const root = document.querySelector('#root')
const nameInput = document.querySelector('#name')
const ageInput = document.querySelector('#age')
const usersContainer = document.createElement('div')
usersContainer.classList.add('user-container')
root.append(usersContainer)

// THEME
const buttonTheme = document.querySelector('#change-theme')
const currentTheme = localStorage.getItem('theme')

buttonTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme')
  localStorage.setItem('theme', document.body.classList)
})

if (currentTheme) {
  document.body.classList.add(currentTheme)
}

// SEARCH INPUT
const searchLabel = document.createElement('label')
searchLabel.setAttribute('for', 'search')
searchLabel.innerText = 'search'
header.append(searchLabel)

const searchInput = document.createElement('input')
searchInput.type = 'text'
searchInput.id = 'search'
header.append(searchInput)

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

  userArray.push(user)
  localStorage.setItem('userArray', JSON.stringify(userArray))
  showUsers(userArray)
  nameInput.value = ''
  ageInput.value = ''
})

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
