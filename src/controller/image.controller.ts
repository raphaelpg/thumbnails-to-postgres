import { Request, Response } from 'express';
import imageServices from '../service/image.service';

const saveImage = async (req: Request, res: Response) => {
  if (true) {
    const result = await imageServices.saveImage(req, res);
    return res.status(200).json({ msg: "posted image saved", response: result })
  }
};

const getImageById = (req: Request, res: Response) => {
  if (true) {
    imageServices.getImageById();
    return res.status(200).json({ msg: "get image by id", id: req.params })
  }
};

const getAllImages = (req: Request, res: Response) => {
  if (true) {
    imageServices.getImages();
    return res.status(200).json({ msg: "get all images", parameters: req.params })
  }
};

export default {
  saveImage,
  getImageById,
  getAllImages
}
