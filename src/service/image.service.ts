import { Request, Response } from 'express';
import db from '../functions/db';
import resize from '../functions/resize';
import storage from '../functions/storage';

const saveImage = async (req: Request, res: Response) => {
  storage.saveFile(req, res, 'imageToUpload', async (requestFile) => {
    const mediumThumbnailPath = resize.resizeImage(requestFile, 200, 200)
    const smallThumbnailPath = resize.resizeImage(requestFile, 100, 100)
  
    try {
      const url = requestFile.destination + requestFile.originalname;
      const newImage = await db.saveOriginalFile(url);
      if (newImage) {
        await db.saveThumbnail(newImage, mediumThumbnailPath)
        await db.saveThumbnail(newImage, smallThumbnailPath)
      }
      return "file saved";
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