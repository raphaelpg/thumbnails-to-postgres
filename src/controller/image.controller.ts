import { Request, Response } from 'express';
import imageServices from '../service/image.service';

const saveImage = async (req: Request, res: Response) => {
  //control the the request here...
  return await imageServices.saveImage(req, res);
};

const getImageById = async (req: Request, res: Response) => {
  //control the request here...
  const result = await imageServices.getImageById(req, res);
  return res.status(200).json({ msg: "get image by id", response: result });
};

const getAllImages = async (req: Request, res: Response) => {
  //control the request here...
  const result = await imageServices.getImages();
  return res.status(200).json({ msg: "get all images", response: result });
};

export default {
  saveImage,
  getImageById,
  getAllImages
};