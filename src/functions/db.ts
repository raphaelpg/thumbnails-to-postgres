import { Pool, QueryResult } from 'pg';
import 'dotenv/config';
import config from '../config/config';

const pool = new Pool({
  user: config.postgres.user,
  password: config.postgres.password,
  host: config.postgres.host,
  port: config.postgres.port,
  database: config.postgres.database
});

const saveOriginalFile = async (url: string) => {
  try {
    const newImage = await pool.query(
      "INSERT INTO images (image_url) VALUES($1) RETURNING *",
      [url]
    );
    return newImage;
  } catch (error) {
    return error;
  };
};

const saveThumbnail = async (newImage: QueryResult<any>, path: string) => {
  try {
    await pool.query(
      "INSERT INTO thumbnails (image_id, thumbnail_url) VALUES ($1, $2) RETURNING *",
      [newImage.rows[0].image_id, path]
    );
  } catch (error) {
    return error;
  };
};

const returnAllImages = async () => {
    const images = await pool.query(
      "SELECT * FROM images"
    );
    return images.rows;
};

const returnImageById = async (id: string) => {
  try {
    const image = await pool.query(
      "SELECT images.image_id, images.image_url, thumbnails.thumbnail_id, thumbnails.thumbnail_url FROM images LEFT JOIN thumbnails ON images.image_id = thumbnails.image_id WHERE images.image_id = $1",
      [id]
    );
    return image.rows;
  } catch (error) {
    return(error);
  };
};

export default {
  saveOriginalFile,
  saveThumbnail,
  returnAllImages,
  returnImageById
};