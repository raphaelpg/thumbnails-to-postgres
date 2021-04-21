import { Request, Response } from 'express';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: 'Sql2021!%!%**',
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

const getImageById = () => {
  return;
};

const getImages = () => {
  return;
};

export default {
  saveImage,
  getImageById,
  getImages
}