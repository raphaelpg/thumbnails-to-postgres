# thumbnails-to-postgres
NodeJS+Postgres+Sharp

Upload an image to a local server, create thumbnails and save the urls to a postgres database.

## Features
* Generate thumbnails via [Sharp](https://sharp.pixelplumbing.com/)

## Running Locally

#### Prerequisites
* [Git](https://git-scm.com/downloads)
* [Node JS](https://nodejs.org/en/)
* [Postgres](https://www.postgresql.org/)


#### 1. Clone the repo and install dependencies
```bash
git clone 
cd thumbnails-to-postgres
npm i
```

#### 2. Modify the .env file
Save `sampledotenv` as `.env` and then add your database user and password.

#### 3. Modify the .env file
Customize the setups in the config file '/src/config/config.ts'.

#### 4. Startup your Postgres
Start your postgres and run the commands contained in the database.sql file.

#### 5. Start the server
Compile with Typescript and run command npm start.

#### 6. Open html and test
Go to http://localhost:8080 with your favorite browser and try the functions.