import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TaskController from './app/controllers/TaskController';

import { sequelize } from './database';

const routes = new Router();

routes.get('/test', (req, res) => {
  return res.json({ message: 'API TodoList fonctionne correctement!' });
});

routes.get('/test-db', async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie!');
    return res.json({ 
      message: 'Connexion à la base de données réussie!',
      db_config: {
        host: sequelize.config.host,
        port: sequelize.config.port,
        database: sequelize.config.database,
        username: sequelize.config.username
      }
    });
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return res.status(500).json({ 
      error: 'Erreur de connexion à la base de données',
      details: error.message,
      db_config: {
        host: sequelize.config.host,
        port: sequelize.config.port,
        database: sequelize.config.database,
        username: sequelize.config.username
      }
    });
  }
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/tasks', TaskController.store);
routes.get('/tasks', TaskController.index);
routes.put('/tasks/:task_id', TaskController.update);
routes.delete('/tasks/:task_id', TaskController.delete);

export default routes;