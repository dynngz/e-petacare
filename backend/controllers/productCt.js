const Product = require('../models/Producto');
const Category = require('../models/Categoria');
const mongoose = require('mongoose');

exports.addProduct = async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({
        success: true,
        data: product
      });
    } catch (error) {
      console.error(error);
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({
          success: false,
          error: messages
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
    }
  };
  
  exports.updateProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  };
  
  
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid category ID'
      });
    }
    
    const products = await Product.find({ category: categoryId }).populate('category');
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const product = await Product.findOne({ slug }).populate('category');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      details: error.message
    });
  }
};

exports.getProductsByCategorySlug = async (req, res) => {
  try {
    const categorySlug = req.params.categorySlug;
    
    const category = await Category.findOne({ slug: categorySlug });
    
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }
    
    const products = await Product.find({ category: category._id }).populate('category');
    
    res.status(200).json({
      success: true,
      count: products.length,
      category: category,
      data: products
    });
  } catch (error) {
    console.error("Error fetching products by category slug:", error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      details: error.message
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find()
      .sort({ createdAt: -1 })  
      .limit(3)               
      .populate('category');
    
    res.status(200).json({
      success: true,
      count: featuredProducts.length,
      data: featuredProducts
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      details: error.message
    });
  }
};
