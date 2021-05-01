const { Router } = require('express');

const companiesController = require('./controllers/CompaniesController');
const unitsController = require('./controllers/UnitsController');
const usersController = require('./controllers/UsersController');
const assetsController = require('./controllers/AssetsController');

const routes = Router();

// CRUD Company
routes.get('/companies', companiesController.index);
routes.get('/company/:_id', companiesController.show);
routes.post('/create-company', companiesController.store);
routes.put('/update-company/:_id', companiesController.update);
routes.delete('/delete-company/:_id', companiesController.destroy);

// CRUD Units
routes.get('/list-unity/:_id', unitsController.show);
routes.get('/list-units/:company_id', unitsController.index);
routes.post('/create-unity/:company_id', unitsController.store);
routes.put('/update-unity/:_id', unitsController.update);
routes.delete('/delete-unity/:_id', unitsController.destroy);

// CRUD Users
routes.get('/list-user/:company_id', usersController.index);
routes.post('/create-user/:company_id', usersController.store);
routes.put('/update-user/:_id', usersController.update);
routes.delete('/delete-user/:_id', usersController.destroy);

// CRUD Assets
routes.get('/list-assets/:unity_id', assetsController.index);
routes.get('/list-active/:_id', assetsController.show);
routes.post('/create-active/:unity_id', assetsController.store);
routes.put('/update-active/:_id', assetsController.update);
routes.delete('/delete-active/:_id', assetsController.destroy);


module.exports = routes;
