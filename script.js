const form = document.querySelector('form') // по тегу
const root = document.querySelector('#root') // по id #
const nameInput = document.querySelector('#name')
const ageInput = document.querySelector('#age')
const usersContainer = document.createElement('div')
usersContainer.classList.add('user-container')
root.append(usersContainer)

const buttonTheme = document.querySelector('#change-theme')
// get - получить взять брать
const currentTheme = localStorage.getItem('theme')

if (currentTheme) {
  document.body.classList.add(currentTheme)
}
// parse из JSON конвертировать в обычный объект
const userFromStorage = JSON.parse(localStorage.getItem('userData'))

if (userFromStorage) {
  nameInput.value = userFromStorage.name
  ageInput.value = userFromStorage.age
}

buttonTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme')
  localStorage.setItem('theme', document.body.classList)
})

// надо достать данные массива по ключу, распарсить и занести в переменную
// если у нас в LS ничего нет по ключу то подставляем пустой массив
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

  userArray.push(user) // изменяю массив
  // добавляю в LS
  localStorage.setItem('userArray', JSON.stringify(userArray))

  showUsers(userArray)
  nameInput.value = ''
  ageInput.value = ''
})

// setItem => stringify - добавляем в LS (в LS только строки)
// getItem => parse() - получаем из LS
