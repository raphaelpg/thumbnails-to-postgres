import express from 'express';
import router from './router/router';

const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));