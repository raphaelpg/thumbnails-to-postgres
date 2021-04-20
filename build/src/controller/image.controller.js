"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_service_1 = __importDefault(require("../service/image.service"));
const saveImage = (req, res) => {
    if (true) {
        image_service_1.default.saveImage();
        return res.status(200).json({ msg: "posted image saved" });
    }
};
const getImageById = (req, res) => {
    if (true) {
        image_service_1.default.getImageById();
        return res.status(200).json({ msg: "get image by id", id: req.params });
    }
};
const getAllImages = (req, res) => {
    if (true) {
        image_service_1.default.getImages();
        return res.status(200).json({ msg: "get all images" });
    }
};
exports.default = {
    saveImage,
    getImageById,
    getAllImages
};
