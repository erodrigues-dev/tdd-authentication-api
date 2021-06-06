const routes = require('express').Router();

const dashboardController = require('./app/controllers/DashboardController')
const sessionController = require('./app/controllers/SessionController') 

routes.get('/dashboard', dashboardController.check)
routes.post('/sessions', sessionController.authenticate)

module.exports = routes;