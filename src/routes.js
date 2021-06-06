const routes = require('express').Router();
const { User } = require('./app/models')

User.create({
    name: 'Elton Rodrigues',
    email: 'erodrigues.dev@gmail.com',
    password_hash: '1234'
})


module.exports = routes;