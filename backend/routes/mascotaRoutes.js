const express = require('express');
const {
  getMascotas,
  getMascotaBySlug,
  createMascota,
  updateMascota,
  deleteMascota,
  getFeaturedMascotas,
  addMascotasPreview
} = require('../controllers/mascotaCt');

const router = express.Router();

// Rutas públicas
router.get('/', getMascotas);
router.get('/featured', getFeaturedMascotas);
router.get('/preview', addMascotasPreview);
router.get('/:slug', getMascotaBySlug);

// Rutas de administración (sin autenticación, para desarrollo)
router.post('/', createMascota);
router.put('/:id', updateMascota);
router.delete('/:id', deleteMascota);

// autenticación
// router.post('/', protect, authorize('admin'), createMascota);
// router.put('/:id', protect, authorize('admin'), updateMascota);
// router.delete('/:id', protect, authorize('admin'), deleteMascota);

module.exports = router;
