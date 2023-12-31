const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, likes: 1 })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  if (!id) response.status(404).send('User not found')

  const user = await User.findById(id).populate('blogs', { title: 1, likes: 1 })
  response.json(user)
})

usersRouter.post('/', async (request, response) => {
  if (!request.body.username || !request.body.password) return response.status(400).send('Username and password are required')
  const { username, name, password } = request.body

  if (password.length < 3) return response.status(400).send('Password must be at least 3 characters long')

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})


module.exports = usersRouter