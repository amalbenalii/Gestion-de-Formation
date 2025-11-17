const express = require('express');
const router = express.Router();
const {
  getAllFormateurs,
  getFormateurById,
  createFormateur,
  updateFormateur,
  deleteFormateur,
  getFormateursBySpecialite,
  getFormateurStats
} = require('../controllers/FormateurController');
router.get('/', getAllFormateurs);
router.post('/', createFormateur);
router.put('/:id', updateFormateur);
router.get('/:id', getFormateurById);
router.delete('/:id', deleteFormateur);
router.get('/specialite/:specialite', getFormateursBySpecialite);


module.exports = router;