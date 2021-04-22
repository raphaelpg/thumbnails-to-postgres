import multer from 'multer';
import { Request, Response } from 'express';
import config from '../config/config';

const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.storage.uploadFolder)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const saveFile = async (req: Request, res: Response ,filename: string, callback: (file: any) => void) => {
  const upload = multer({
    storage: localStorage,
    limits: {
      fieldNameSize: config.storage.fieldNameSize,
      fileSize: config.storage.fileSize
    }
  }).single(filename)
  
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
    callback(req.file);
  })
}

export default {
  saveFile
}