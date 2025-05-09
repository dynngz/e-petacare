const Mascota = require('../models/Mascota');
const slugify = require('slugify');

exports.getMascotas = async (req, res) => {
  try {
    const mascotas = await Mascota.find({ estado: 'disponible' });
    res.status(200).json({
      success: true,
      count: mascotas.length,
      data: mascotas
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

exports.getMascotaBySlug = async (req, res) => {
  try {
    const mascota = await Mascota.findOne({ slug: req.params.slug });
    if (!mascota) {
      return res.status(404).json({
        success: false,
        error: 'No se encontró la mascota'
      });
    }
    res.status(200).json({
      success: true,
      data: mascota
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

exports.createMascota = async (req, res) => {
  try {
    const {
      nombre,
      edad,
      imagen,
      historia,
      genero,
      tamaño,
      peso,
      personalidad,
      salud,
      estado
    } = req.body;

    const lastMascota = await Mascota.findOne().sort({ id: -1 });
    const newId = lastMascota ? lastMascota.id + 1 : 1;

    const slugBase = slugify(nombre, {
      lower: true,
      strict: true
    });
    const slug = `${slugBase}-${Math.random().toString(36).substring(2, 7)}`;

    const mascota = new Mascota({
      id: newId,
      nombre,
      slug,
      edad,
      imagen,
      historia,
      genero,
      tamaño,
      peso,
      personalidad,
      salud,
      estado
    });

    await mascota.save();

    res.status(201).json({
      success: true,
      data: mascota,
      message: 'Mascota creada exitosamente'
    });
  } catch (error) {
    console.error('Error al crear mascota:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error del servidor',
      error: error.message
    });
  }
};


exports.updateMascota = async (req, res) => {
  try {
    if (req.body.nombre) {
      req.body.slug = slugify(req.body.nombre, { lower: true });
    }

    const mascota = await Mascota.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!mascota) {
      return res.status(404).json({
        success: false,
        error: 'No se encontró la mascota'
      });
    }

    res.status(200).json({
      success: true,
      data: mascota
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Error del servidor'
      });
    }
  }
};

exports.deleteMascota = async (req, res) => {
  try {
    const mascota = await Mascota.findByIdAndDelete(req.params.id);
    if (!mascota) {
      return res.status(404).json({
        success: false,
        error: 'No se encontró la mascota'
      });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

exports.getFeaturedMascotas = async (req, res) => {
  try {
    const mascotas = await Mascota.find({ estado: 'disponible' }).limit(4);
    res.status(200).json({
      success: true,
      count: mascotas.length,
      data: mascotas
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

// vista previa para interfaz
exports.addMascotasPreview = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const mascotas = await Mascota.find({ estado: 'disponible' })
      .select('id nombre slug image') // Solo lo necesario
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Mascota.countDocuments({ estado: 'disponible' });

    res.status(200).json({
      success: true,
      data: mascotas,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasMore: page * limit < total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cargar mascotas',
      error: error.message
    });
  }
};
