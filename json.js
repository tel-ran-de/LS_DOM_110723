console.log('hello' + user)

console.log(Object.toString({ name: 'peter' }))

console.log(user.name)
console.log(String(user))

// LS - все данные в строковом режиме
// общаем с сервером и LS через строки string (текстовый формат)
// чтобы передать объект или массив
// мы должны использовать JSON формат
// JSON строка которая выглядит как объект

const user = {
  name: 'peter',
  email: '@maiu',
  adress: {
    city: 'berlin',
  },
}
const userToJSON = JSON.stringify(user)
console.log(userToJSON)
