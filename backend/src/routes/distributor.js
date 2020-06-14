const express = require('express');

const distributor_controller = require('../controllers/distributorController');

const routes = express.Router();

routes.get('/', distributor_controller.index);

routes.get('/index', distributor_controller.index);

routes.post('/new', distributor_controller.create_distributor);

routes.post('/login', distributor_controller.login);

module.exports = routes;