import { Router } from 'express';
import imageController from '../controller/image.controller';

let router: Router = Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: './build/src/public'});
});
router.post('/image', imageController.saveImage);
router.get('/image/:id', imageController.getImageById);
router.get('/images', imageController.getAllImages);

export default router;