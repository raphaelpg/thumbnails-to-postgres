"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_controller_1 = __importDefault(require("../controller/image.controller"));
let router = express_1.Router();
router.post('/image', image_controller_1.default.saveImage);
router.get('/image/:imageId', image_controller_1.default.getImageById);
router.get('/images', image_controller_1.default.getAllImages);
exports.default = router;
