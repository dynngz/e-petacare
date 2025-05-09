const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    }, 
    name: {
        type: String,
        required: true,
    }, 
    age: {
        type: Number,
        required: true,
    }, 
    image: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    }, 
    date: {
        type: Date,
        default: Date.now,
    }, 
});

blogchema.pre('save', function(next) {
    if (this.isModified('title') || !this.slug) {
        this.slug = slugify(this.title, {
            lower: true,           
            strict: true,          
            remove: /[*+~.()'"!:@]/g,  
            replace: /[^\w\-]+/g
        });
        
        this.slug = `${this.slug}-${Math.random().toString(36).substring(2, 7)}`;
    }
    next();
});

module.exports = mongoose.model("User", userSchema);