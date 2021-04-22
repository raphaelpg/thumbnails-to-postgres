import { Request, Response } from 'express';
import { Pool } from 'pg';
import 'dotenv/config';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'thumbnails_to_postgres'
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './build/src/public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ 
  storage: storage,
  limits: {
    fieldNameSize: 100,
    fileSize: 60000000
  }
}).single('imageToUpload');

const saveImage = async (req: Request, res: Response) => {
  upload(req, res, async (err: any) => {
    if (!req.file) {
        return res.send('Please select an image to upload');
    }
    else if (err instanceof multer.MulterError) {
        return res.send(err);
    }
    else if (err) {
        return res.send(err);
    }

    const mediumThumbnailPath = './build/src/public/thumbnails/' + path.parse(req.file.originalname).name + '-resized-200x200' + path.extname(req.file.originalname);
    const smallThumbnailPath = './build/src/public/thumbnails/' + path.parse(req.file.originalname).name + '-resized-100x100' + path.extname(req.file.originalname);

    sharp(req.file.path)
      .resize(200, 200)
      .toFile(mediumThumbnailPath)

    sharp(req.file.path)
      .resize(100, 100)
      .toFile(smallThumbnailPath)

    try {
      const url = req.file.destination + req.file.originalname;
      const newImage = await pool.query(
        "INSERT INTO images (image_url) VALUES($1) RETURNING *",
        [url]
      );

      await pool.query(
        "INSERT INTO thumbnails (image_id, thumbnail_url) VALUES ($1, $2) RETURNING *",
        [newImage.rows[0].image_id, mediumThumbnailPath]
      )

      await pool.query(
        "INSERT INTO thumbnails (image_id, thumbnail_url) VALUES ($1, $2) RETURNING *",
        [newImage.rows[0].image_id, smallThumbnailPath]
      )
      return
    } catch (err) {
      console.error(err.message)
    }
  });
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