const mongoose = require('mongoose');
const slugify = require('slugify');

const MascotaSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
}, 
  nombre: {
    type: String,
    required: [true, 'Por favor ingrese el nombre de la mascota'],
    trim: true,
    maxlength: [50, 'El nombre no puede tener más de 50 caracteres']
  },
  slug: String,
  imagen: {
    type: String,
    required: [true, 'Por favor ingrese la URL de la imagen de la mascota']
  },
  genero: {
    type: String,
    required: [true, 'Por favor especifique el género de la mascota'],
    enum: ['Macho', 'Hembra']
  },
  edad: {
    type: Number,
    required: [true, 'Por favor ingrese la edad de la mascota']
  },
  tamaño: {
    type: String,
    required: [true, 'Por favor especifique el tamaño de la mascota'],
    enum: ['pequeño', 'mediano', 'grande']
  },
  peso: {
    type: Number,
    required: [false, 'Por favor ingrese el peso de la mascota en kilos']
  },
  personalidad: {
    type: [String],
    required: [true, 'Por favor ingrese al menos un rasgo de personalidad']
  },
  salud: {
    type: String,
    default: 'Sano, vacunado y castrado'
  },
  historia: {
    type: String,
    required: [true, 'Por favor ingrese la historia de la mascota']
  },
  estado: {
    type: String,
    enum: ['disponible', 'adoptado', 'en proceso'],
    default: 'disponible'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

MascotaSchema.pre('save', function(next) {
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

module.exports = mongoose.model('Mascota', MascotaSchema);