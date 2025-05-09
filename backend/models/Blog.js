const mongoose = require('mongoose');
const slugify = require('slugify');
const blogSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    }, 
    title: {
        type: String,
        required: true,
    }, 
    slug: {
        type: String,
        unique: true,
      },
    image: {
        type: String,
        required: false,
    }, 
    content: {
        type: String,
        required: true,
    }, 
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true },
    date: {
        type: Date,
        default: Date.now,
    }, 
    
});

blogSchema.pre('save', function(next) {
    if (this.isModified('title') || !this.slug) {
        this.slug = slugify(this.title, {
            lower: true,           
            strict: true,          
            remove: /[*+~.()'"!:@]/g,  
            replace: /[^\w\-]+/g
        });
        
        this.slug = `${this.slug}-${Math.random().toString(36).substring(2, 7)}`;
    }
    
    if (this.isModified('category')) {
        this.category_slug = slugify(this.category, {
            lower: true,
            strict: true
        });
    }
    
    next();
});

module.exports = mongoose.model("Blog", blogSchema);