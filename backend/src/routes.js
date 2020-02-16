import { Router } from 'express';

// IMPORT UPLOAD DE IMAGEM
import multer from 'multer';
import multerConfig from './config/multer';

// IMPORT CONTROLADORAS
import UserController from './app/controllers/userController';
import SessionController from './app/controllers/sessionController';
import FileController from './app/controllers/fileController';
import ProviderController from './app/controllers/providerController';
import appointmentController from './app/controllers/appointmentController';
import scheduleController from './app/controllers/scheduleController';
import NotificationController from './app/controllers/notificationController';
import AvailableController from './app/controllers/availableController';

// IMPORT AUTENTICAÇÃO USUARIO TOKEN
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);


// ROTAS
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// A PARTIR DESTA ROTA A AUTENTICAÇÃO É UTILIZADA
routes.use(authMiddleware);

routes.put('/update', UserController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);


routes.get('/appointments', appointmentController.index);
routes.post('/appointments', appointmentController.store);
routes.delete('/appointments/:id', appointmentController.delete);

routes.get('/schedule', scheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
