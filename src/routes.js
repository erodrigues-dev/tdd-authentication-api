const routes = require('express').Router();

const auth = require('./app/midlewares/auth');
const sessionController = require('./app/controllers/SessionController'); 
const dashboardController = require('./app/controllers/DashboardController')

routes.post('/sessions', sessionController.authenticate)

routes.use(auth)
routes.get('/dashboard', dashboardController.check)

module.exports = routes;