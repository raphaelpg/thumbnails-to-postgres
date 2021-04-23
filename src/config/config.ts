const SERVER = {
  port: 8080,
};

const POSTGRES = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'thumbnails_to_postgres'
};

const STORAGE = {
  fieldNameSize: 100,
  fileSize: 60000000,
  uploadFolder: './build/src/public/uploads/'
};

//thumbnails size in px, each size will generate a new thumbnail
const THUMBNAILS = [
  200,
  100,
  50
];

const config = {
  server: SERVER,
  postgres: POSTGRES,
  storage: STORAGE,
  thumbnails: THUMBNAILS,
};

export default config;