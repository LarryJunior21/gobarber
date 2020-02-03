import { Router } from 'express';

//IMPORT CONTROLADORAS
import UserController from './app/controllers/userController';
import SessionController from './app/controllers/sessionController';
import FileController from './app/controllers/fileController';
import ProviderController from './app/controllers/providerController';

//IMPORT AUTENTICAÇÃO USUARIO TOKEN
import authMiddleware from './app/middlewares/auth';

//IMPORT UPLOAD DE IMAGEM
import multer from 'multer';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);


//ROTAS
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

//A PARTIR DESTA ROTA A AUTENTICAÇÃO É UTILIZADA
routes.use(authMiddleware);

routes.put('/update', UserController.update);

routes.get('/providers', ProviderController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
