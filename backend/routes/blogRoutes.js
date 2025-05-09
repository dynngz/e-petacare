const express = require('express');
const router = express.Router();
const { 
    addArticle, 
    getAllArticles, 
    getArticleById,
    getArticlesByCategory,
    updateArticle,
    deleteArticle,
    getLatestArticles
} = require('../controllers/blogCt');

router.post('/addArticle', addArticle);
router.get('/articles', getAllArticles);
router.get('/article/:id', getArticleById);
router.get('/category/:categorySlug', getArticlesByCategory);
router.put('/editArticle/:id', updateArticle);
router.delete('/article/:id', deleteArticle);
router.get('/latest', getLatestArticles);

module.exports = router;