const routes = require('express').Router();

const sessionController = require('./app/controllers/SessionController') 

routes.post('/sessions', sessionController.authenticate)

module.exports = routes;