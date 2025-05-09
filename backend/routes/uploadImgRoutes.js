const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadController = require('../controllers/uploadImgCt');

//ver si existe sino crear directtory
const baseUploadDir = './upload/images';
const uploadDirs = [
  baseUploadDir,
  path.join(baseUploadDir, 'products'),
  path.join(baseUploadDir, 'blogs'),
  path.join(baseUploadDir, 'mascotas')
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir = baseUploadDir;
    
    //subdirectory
    if (req.originalUrl.includes('/product')) {
      uploadDir = path.join(baseUploadDir, 'products');
    } else if (req.originalUrl.includes('/blog')) {
      uploadDir = path.join(baseUploadDir, 'blogs');
    } else if (req.originalUrl.includes('/mascota')) {
      uploadDir = path.join(baseUploadDir, 'mascotas');
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const typePrefix = req.originalUrl.includes('/product') ? 'product' :
                      req.originalUrl.includes('/blog') ? 'blog' :
                      req.originalUrl.includes('/mascota') ? 'mascota' : 'image';
                      
    const sanitizedName = path.basename(file.originalname, path.extname(file.originalname))
                             .replace(/[^a-zA-Z0-9]/g, '_')
                             .substring(0, 20); // Limit length
                             
    const finalName = `${typePrefix}_${sanitizedName}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, finalName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Only image files (jpg, jpeg, png, gif) are allowed!'), false);
    }
    cb(null, true);
  }
});

router.post('/product', (req, res, next) => {
  upload.single('product')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    uploadController.uploadProductImage(req, res);
  });
});

router.post('/blog', (req, res, next) => {
  upload.single('blog')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    uploadController.uploadBlogImage(req, res);
  });
});

router.post('/mascota', (req, res, next) => {
  upload.single('mascota')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    uploadController.uploadMascotaImage(req, res);
  });
});

router.get('/list', uploadController.getAllUploadedImages);

router.get('/list/products', (req, res) => {
  req.imageType = 'products';
  uploadController.getAllUploadedImages(req, res);
});

router.get('/list/blogs', (req, res) => {
  req.imageType = 'blogs';
  uploadController.getAllUploadedImages(req, res);
});

router.get('/list/mascotas', (req, res) => {
  req.imageType = 'mascotas';
  uploadController.getAllUploadedImages(req, res);
});

module.exports = router;