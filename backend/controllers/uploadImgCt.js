const fs = require('fs');
const path = require('path');

const createResponse = (success, res, data = {}) => {
  if (success) {
    return res.status(200).json({
      success: true,
      ...data
    });
  } else {
    return res.status(data.statusCode || 500).json({
      success: false,
      ...data
    });
  }
};
//upload generic function
const handleImageUpload = (req, res, type) => {
  try {
    if (!req.file) {
      return createResponse(false, res, {
        statusCode: 400,
        message: "No file uploaded"
      });
    }
    
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    
    return createResponse(true, res, {
      image_url: imageUrl,
      message: `${type} image uploaded successfully`
    });
  } catch (error) {
    console.error(`Error uploading ${type} image:`, error);
    return createResponse(false, res, {
      message: `Failed to upload ${type} image`,
      error: error.message
    });
  }
};

exports.uploadProductImage = (req, res) => handleImageUpload(req, res, 'Product');
exports.uploadBlogImage = (req, res) => handleImageUpload(req, res, 'Blog');
exports.uploadMascotaImage = (req, res) => handleImageUpload(req, res, 'Mascota');

const getFilesRecursively = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
        
        const basePath = path.join(__dirname, '..', 'upload');
        const relativePath = fullPath.replace(basePath, '');
        results.push(relativePath);
      }
    }
  });
  
  return results;
};

exports.getAllUploadedImages = (req, res) => {
  try {
    const baseUploadDir = path.join(__dirname, '..', 'upload');
    const imageDir = path.join(baseUploadDir, 'images');
    
    if (!fs.existsSync(imageDir)) {
      console.log(`Image directory doesn't exist: ${imageDir}`);
      return createResponse(true, res, {
        count: 0,
        images: [],
        message: "Upload directory doesn't exist yet"
      });
    }

    let searchDir = imageDir;
    let typeFilter = null;
    
    if (req.imageType) {
      searchDir = path.join(imageDir, req.imageType);
      typeFilter = req.imageType;
      
      if (!fs.existsSync(searchDir)) {
        console.log(`Specific image directory doesn't exist: ${searchDir}`);
        return createResponse(true, res, {
          count: 0,
          images: [],
          message: `No images found for type: ${typeFilter}`
        });
      }
    }

    try {
      const relativePaths = getFilesRecursively(searchDir);
      
      const imageUrls = relativePaths.map(relativePath => {
        return `${req.protocol}://${req.get('host')}${relativePath}`;
      });

      console.log(`Found ${imageUrls.length} images in ${searchDir}`);
      
      return createResponse(true, res, {
        count: imageUrls.length,
        images: imageUrls,
        directory: searchDir, //debug
        type: typeFilter || 'all'
      });
    } catch (dirError) {
      console.error("Error reading image directory:", dirError);
      return createResponse(false, res, {
        message: "Error reading image directory",
        error: dirError.message
      });
    }
  } catch (error) {
    console.error("Error getting image URLs:", error);
    return createResponse(false, res, {
      message: "Failed to get image URLs",
      error: error.message
    });
  }
};