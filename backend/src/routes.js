const express = require('express');

const AdminController = require('./controllers/AdminController');
const UsersController = require('./controllers/UsersController');
const RentController = require('./controllers/RentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/admin', AdminController.index);
routes.post('/admin', AdminController.create);

routes.get('/profile', ProfileController.index);

routes.get('/users', UsersController.index);
routes.post('/users', UsersController.create);

routes.delete('/users/:id', UsersController.delete);

routes.get('/rent', RentController.index);
routes.post('/rent', RentController.create);

routes.delete('/rent/:id', RentController.delete);

module.exports = routes;