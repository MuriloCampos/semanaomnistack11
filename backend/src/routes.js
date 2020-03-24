const express = require('express');
const NgoController = require('./controllers/NgoController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.store);

routes.get('/ongs', NgoController.index);

routes.post('/ongs', NgoController.store);

routes.get('/perfil', ProfileController.index);

routes.post('/casos', IncidentController.store);
routes.get('/casos', IncidentController.index);
routes.delete('/casos/:id', IncidentController.destroy);

module.exports = routes;
