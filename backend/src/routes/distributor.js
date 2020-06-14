const express = require('express');

const distributor_controller = require('../controllers/distributorController');
const distributor_validator = require('../middlewares/distributorValidator');
const { validate } = require('../middlewares/validate');

const routes = express.Router();

routes.get('/', distributor_controller.index);

routes.get('/index', distributor_controller.index);

routes.post('/new', distributor_validator.registration, validate, distributor_controller.create);

routes.post('/login', distributor_validator.login, validate, distributor_controller.login);

module.exports = routes;