import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './router/router';
import config from './config/config';

const PORT = config.server.port;

const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));