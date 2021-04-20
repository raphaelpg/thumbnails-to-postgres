import { Request, Response } from 'express';
import imageServices from '../service/image.service';

const saveImage = (req: Request, res: Response) => {
  if (true) {
    imageServices.saveImage()
    return res.status(200).json({msg: "posted image saved"})
  }
};

const getImageById = (req: Request, res: Response) => {
  if (true) {
    imageServices.getImageById();
    return res.status(200).json({msg: "get image by id", id: req.params})
  }
};

const getAllImages = (req: Request, res: Response) => {
  if (true) {
    imageServices.getImages();
    return res.status(200).json({msg: "get all images"})
  }
};

export default {
  saveImage,
  getImageById,
  getAllImages
}
