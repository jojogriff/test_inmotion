const faker = require('faker')

const newUser = {
  email: faker.internet.email().toLowerCase(),
  password: 'ASecretSoBigNoOneCanBreak'
}

module.exports = newUser
