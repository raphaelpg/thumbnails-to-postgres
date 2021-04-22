import sharp from 'sharp';
import path from 'path';

const resizeImage = (file: any, width: number, height: number) => {
  const outputPath = './build/src/public/thumbnails/' + path.parse(file.originalname).name + `-resized-${width}x${height}` + path.extname(file.originalname);
  sharp(file.path)
  .resize(width, height)
  .toFile(outputPath);
  return outputPath;
};

export default {
  resizeImage
};