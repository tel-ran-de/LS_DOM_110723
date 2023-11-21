const form = document.querySelector('form')
const header = document.querySelector('header')
const root = document.querySelector('#root')
const nameInput = document.querySelector('#name')
const ageInput = document.querySelector('#age')
const usersContainer = document.createElement('div')
usersContainer.classList.add('user-container')
root.append(usersContainer)
//<i class="fa-brands fa-facebook-f"></i>
const iconFacebook = document.createElement('i')

iconFacebook.classList.add('fa-brands')
iconFacebook.classList.add('fa-facebook-f')
header.append(iconFacebook)
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

// SELECT FOR SORTING
const selectInput = document.createElement('select')
header.append(selectInput)

const ascOption = document.createElement('option')
ascOption.value = 'asc'
ascOption.innerText = 'По возрастанию'
selectInput.append(ascOption)

const descOption = document.createElement('option')
descOption.value = 'desc'
descOption.innerText = 'По убыванию'
selectInput.append(descOption)

// USERS FROM LS
const userArray = JSON.parse(localStorage.getItem('userArray')) || []

const showUsers = (arr) => {
  usersContainer.innerHTML = ''
  arr.forEach((user) => {
    if (user.show) {
      const userCard = document.createElement('div')
      userCard.classList.add('user-card')
      const userName = document.createElement('h2')
      userName.innerText = user.name
      const userAge = document.createElement('p')
      userAge.innerText = user.age
      userCard.append(userName, userAge)
      usersContainer.append(userCard)
    }
  })
}

const filterArray = () => {
  const searchTerm = searchInput.value.toLowerCase()
  const optionTerm = selectInput.value

  const filteredArray = userArray.map((user) => ({
    ...user,
    show: user.name.toLowerCase().includes(searchTerm),
  }))

  optionTerm === 'asc'
    ? filteredArray.sort((a, b) => a.age - b.age)
    : filteredArray.sort((a, b) => b.age - a.age)

  showUsers(filteredArray)
}

filterArray()

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const searchTerm = searchInput.value.toLowerCase()
  const user = {
    name: nameInput.value,
    age: ageInput.value,
    show: nameInput.value.toLowerCase().includes(searchTerm),
  }

  userArray.push(user)
  localStorage.setItem('userArray', JSON.stringify(userArray))
  filterArray() // было showUsers()
  nameInput.value = ''
  ageInput.value = ''
})

searchInput.addEventListener('input', () => filterArray())
selectInput.addEventListener('change', () => filterArray())

// 1. мы поменяли c filter на map
// 2. мы прошлись по массиву и добавили в него новое свойство show
// 3. в функции showUser добавили условие user.show()
// 4. заходим в форму
// 5. условие show чтобы удовлетворяло поиску
// 6. в форме вызываем не функцию отрисовки, а функцию сортировки
// 7. Чтобы вызывалась правильно мы ее ставим перед формой
