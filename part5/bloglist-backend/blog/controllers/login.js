const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) =>{

  const { username, password } = request.body

  const user = await User.findOne({username}) //retur user with the posted username
  const passwordCorrect = user === null  //if not such user in the User collection
    ? false
  //compare the entered password to the one saved in the database
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  //token contains the username and the user id in a digitally signed form
  // only parties who know the secret can generate a valid token
  const token = jwt.sign(userForToken, process.env.SECRET)


  response
    .status(200)
    .send({ token, username: user.username, name: user.name })

})

module.exports = loginRouter
