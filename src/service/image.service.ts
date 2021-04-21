import { Request, Response } from 'express';
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'thumbnails_to_postgres'
});

const saveImage = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const newImage = await pool.query(
      "INSERT INTO images (image_url) VALUES($1) RETURNING *",
      [name]
    );
    return newImage.rows[0];
  } catch (err) {
    console.error(err.message)
  }
};

const getImageById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const image = await pool.query(
      "SELECT * FROM images WHERE image_id = $1",
      [id]
    );
    return image.rows[0];
  } catch (err) {
    console.log(err.message)
  }
};

const getImages = async () => {
  try {
    const images = await pool.query(
      "SELECT * FROM images"
    )
    return images.rows;
  } catch (err) {
    console.log(err.message)
  }
};

export default {
  saveImage,
  getImageById,
  getImages
}