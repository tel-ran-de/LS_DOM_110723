const form = document.querySelector('form') // по тегу
const root = document.querySelector('#root') // по id #
const nameInput = document.querySelector('#name')
const ageInput = document.querySelector('#age')
const usersContainer = document.createElement('div')
usersContainer.classList.add('user-container')
root.append(usersContainer)

const userArray = []

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

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const user = {
    name: nameInput.value,
    age: ageInput.value,
  }
  userArray.push(user)
  showUsers(userArray)
  nameInput.value = ''
  ageInput.value = ''
})
