const express = require('express');
const router = express.Router();
const {
  getAllFormations,
  getFormationById,
  createFormation,
  updateFormation,
  deleteFormation,

} = require('../controllers/FormationController');
router.get('/', getAllFormations);
router.get('/:id', getFormationById);
router.post('/', createFormation);
router.put('/:id', updateFormation);
router.delete('/:id', deleteFormation);

module.exports = router;