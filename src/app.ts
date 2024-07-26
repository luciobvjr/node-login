import { Server } from './common/server';
import { authRouter } from './routers/auth.router';
import { privateRouter } from './routers/private.router';

const server = new Server();
const routers = [
  authRouter,
  privateRouter
];

server.bootstrap(routers)
  .then(() => {
    console.log('Server is running on port 4200');
  })
  .catch((error) => {
    console.error('Error starting server:', error);
  });