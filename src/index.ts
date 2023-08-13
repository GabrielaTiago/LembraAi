import express, { json } from 'express';
import cors from 'cors';
import config from './config/config';

const server = express();

server.use(cors(), json());

const PORT = config.port;

server.listen(PORT, () => {
    console.log(`The server is up and runnig on port ${PORT}`);
});

export default server;
