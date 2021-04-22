const SERVER = {
  port: 8080,
}

const POSTGRES = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'thumbnails_to_postgres'
}

const config = {
  server: SERVER,
  postgres: POSTGRES
}

export default config;