const Blog = require('../models/Blog');

exports.addArticle = async(req, res) => {
    try {
        const highestIdArticle = await Blog.findOne().sort('-id');
        const nextId = highestIdArticle ? highestIdArticle.id + 1 : 1;

        const article = new Blog({
            id: nextId,
            title: req.body.title,
            image: req.body.image,
            content: req.body.content,
            category: req.body.category,
        });
        await article.save();
        console.log("Article saved:", article.title);

        return res.status(201).json({
            success: true,
            article: article,
            message: "Article added successfully"
        });

    } catch (error) {
        console.error("Error adding article:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to add article",
            error: error.message
        });
    }
};

exports.getAllArticles = async(req, res) => {
    try {
        const articles = await Blog.find()
            .sort({ date: -1 })
            .populate('category', 'name slug') 
            .exec();
            
        return res.status(200).json({
            success: true,
            count: articles.length,
            articles: articles
        });
        
    } catch (error) {
        console.error("Error fetching articles:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch articles",
            error: error.message
        });
    }
};

exports.getArticleById = async(req, res) => {
    try {
        const article = await Blog.findOne({ id: req.params.id })
            .populate('category', 'name slug')
            .exec();
        
        if (!article) {
            return res.status(404).json({
                success: false,
                message: "Article not found"
            });
        }
        
        return res.status(200).json({
            success: true,
            article: article
        });
    } catch (error) {
        console.error("Error fetching article:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch article",
            error: error.message
        });
    }
};

exports.getArticlesByCategory = async(req, res) => {
    try {
        const Category = require('../models/Categoria');
        const category = await Category.findOne({ slug: req.params.categorySlug });
        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        
        const articles = await Blog.find({ 
            category: category._id 
        })
        .sort({ date: -1 })
        .populate('category', 'name slug')
        .exec();
        
        return res.status(200).json({
            success: true,
            count: articles.length,
            articles: articles
        });
    } catch (error) {
        console.error("Error fetching articles by category:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch articles by category",
            error: error.message
        });
    }
};

exports.updateArticle = async(req, res) => {
    try {
        const article = await Blog.findOne({ id: req.params.id });
        
        if (!article) {
            return res.status(404).json({
                success: false,
                message: "Article not found"
            });
        }
        
        if (req.body.title) article.title = req.body.title;
        if (req.body.image) article.image = req.body.image;
        if (req.body.content) article.content = req.body.content;
        if (req.body.category) article.category = req.body.category;

        
        await article.save();
        
        // populated article
        const updatedArticle = await Blog.findOne({ id: article.id })
            .populate('category', 'name slug')
            .exec();
        
        return res.status(200).json({
            success: true,
            article: updatedArticle,
            message: "Article updated successfully"
        });
    } catch (error) {
        console.error("Error updating article:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update article",
            error: error.message
        });
    }
};

exports.deleteArticle = async(req, res) => {
    try {
        const article = await Blog.findOneAndDelete({ id: req.params.id });
        
        if (!article) {
            return res.status(404).json({
                success: false,
                message: "Article not found"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Article deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting article:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete article",
            error: error.message
        });
    }
};

exports.getLatestArticles = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 2;
  
      const articles = await Blog.find()
        .sort({ date: -1 })
        .limit(limit)
        .populate('category', 'name slug')
        .exec();
  
      // verificar si algún artículo no tiene slug
      articles.forEach(article => {
        if (!article.slug) {
          console.error(`ERROR: Article with ID ${article.title} is missing a slug.`);
        }
      });
  
      return res.status(200).json({
        success: true,
        count: articles.length,
        articles: articles
      });
  
    } catch (error) {
      console.error("Error fetching latest articles:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch latest articles",
        error: error.message
      });
    }
  };
  