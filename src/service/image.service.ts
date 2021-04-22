import { Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import db from '../functions/db';

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
      const newImage = await db.saveOriginalFile(url);
      if (newImage) {
        await db.saveThumbnail(newImage, mediumThumbnailPath)
        await db.saveThumbnail(newImage, smallThumbnailPath)
      }
      return
    } catch (err) {
      console.error(err.message)
    }
  });
};

const getImageById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    return db.returnImageById(id);
  } catch (error) {
    console.log(error.message)
  }
};

const getImages = async () => {
  try {
    return db.returnAllImages();
  } catch (error) {
    console.log(error.message)    
  }
};

export default {
  saveImage,
  getImageById,
  getImages
}