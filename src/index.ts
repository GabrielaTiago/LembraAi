import express, { json } from 'express';
import cors from 'cors';
import config from './config/config';
import router from './routes/routes';

const server = express();

server.use(cors(), json());
server.use(router);

const PORT = config.port;

server.listen(PORT, () => {
    console.log(`The server is up and runnig on port ${PORT}`);
});

export default server;
