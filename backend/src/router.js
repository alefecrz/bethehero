import { Router } from 'express';

import OngController from './app/controllers/OngController';
import IncidentController from './app/controllers/IncidentController';

const routes = Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.store);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.destroy);

export default routes;
