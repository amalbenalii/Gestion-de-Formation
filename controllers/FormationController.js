const Formation = require('../models/Formation');

// @desc    Récupérer toutes les formations avec les détails du formateur
// @route   GET /api/formations
const getAllFormations = async (req, res) => {
  try {
    const formations = await Formation.find().populate('formateur');
    res.status(200).json({
      success: true,
      count: formations.length,
      data: formations
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Erreur lors de la récupération des formations", 
      error: err.message 
    });
  }
};

// @desc    Récupérer une formation par son ID
// @route   GET /api/formations/:id
const getFormationById = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id).populate('formateur');
    
    if (!formation) {
      return res.status(404).json({ 
        success: false,
        message: "Formation non trouvée" 
      });
    }
    
    res.status(200).json({
      success: true,
      data: formation
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Erreur serveur", 
      error: err.message 
    });
  }
};

// @desc    Créer une nouvelle formation
// @route   POST /api/formations
const createFormation = async (req, res) => {
  try {
    const newFormation = new Formation(req.body);
    const savedFormation = await newFormation.save();
    
    // Populate pour retourner les détails du formateur
    await savedFormation.populate('formateur');
    
    res.status(201).json({
      success: true,
      message: "Formation créée avec succès",
      data: savedFormation
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: "Erreur lors de la création de la formation", 
      error: err.message 
    });
  }
};

// @desc    Mettre à jour une formation
// @route   PUT /api/formations/:id
const updateFormation = async (req, res) => {
  try {
    const updatedFormation = await Formation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    ).populate('formateur');

    if (!updatedFormation) {
      return res.status(404).json({ 
        success: false,
        message: "Formation non trouvée" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Formation mise à jour avec succès",
      data: updatedFormation
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: "Erreur lors de la mise à jour", 
      error: err.message 
    });
  }
};

// @desc    Supprimer une formation
// @route   DELETE /api/formations/:id
const deleteFormation = async (req, res) => {
  try {
    const deletedFormation = await Formation.findByIdAndDelete(req.params.id);
    
    if (!deletedFormation) {
      return res.status(404).json({ 
        success: false,
        message: "Formation non trouvée" 
      });
    }
    
    res.status(200).json({ 
      success: true,
      message: "Formation supprimée avec succès", 
      data: { id: req.params.id }
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: "Erreur serveur", 
      error: err.message 
    });
  }
};

module.exports = {
  getAllFormations,
  getFormationById,
  createFormation,
  updateFormation,
  deleteFormation,

};