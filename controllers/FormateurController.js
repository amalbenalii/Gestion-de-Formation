const asyncHandler = require('express-async-handler');
const Formateur = require('../models/Formateur');
const Formation = require('../models/Formation');

// @desc    Récupérer tous les formateurs
// @route   GET /api/formateurs
const getAllFormateurs = asyncHandler(async (req, res) => {
  const formateurs = await Formateur.find();
  res.status(200).json({
    success: true,
    count: formateurs.length,
    data: formateurs
  });
});

// @desc    Récupérer un formateur par son ID
// @route   GET /api/formateurs/:id
const getFormateurById = asyncHandler(async (req, res) => {
  const formateur = await Formateur.findById(req.params.id);
  
  if (!formateur) {
    res.status(404);
    throw new Error('Formateur non trouvé');
  }
  
  res.status(200).json({
    success: true,
    data: formateur
  });
});

// @desc    Créer un nouveau formateur
// @route   POST /api/formateurs
const createFormateur = asyncHandler(async (req, res) => {
  const { nom, specialite, email, anneesExperience } = req.body;

  // Validation manuelle en plus de Mongoose
  if (!nom || !specialite || !email) {
    res.status(400);
    throw new Error('Veuillez fournir un nom, une spécialité et un email');
  }

  const newFormateur = new Formateur({
    nom,
    specialite,
    email,
    anneesExperience: anneesExperience || 0
  });

  const savedFormateur = await newFormateur.save();
  
  res.status(201).json({
    success: true,
    message: "Formateur créé avec succès",
    data: savedFormateur
  });
});

// @desc    Mettre à jour un formateur
// @route   PUT /api/formateurs/:id
const updateFormateur = asyncHandler(async (req, res) => {
  const formateur = await Formateur.findById(req.params.id);

  if (!formateur) {
    res.status(404);
    throw new Error('Formateur non trouvé');
  }

  const updatedFormateur = await Formateur.findByIdAndUpdate(
    req.params.id,
    req.body,
    { 
      new: true, 
      runValidators: true 
    }
  );

  res.status(200).json({
    success: true,
    message: "Formateur mis à jour avec succès",
    data: updatedFormateur
  });
});

// @desc    Supprimer un formateur
// @route   DELETE /api/formateurs/:id
const deleteFormateur = asyncHandler(async (req, res) => {
  const formateur = await Formateur.findById(req.params.id);
  
  if (!formateur) {
    res.status(404);
    throw new Error('Formateur non trouvé');
  }

  // Vérifier si le formateur a des formations associées
  const formationsAssociees = await Formation.find({ formateur: req.params.id });
  
  if (formationsAssociees.length > 0) {
    res.status(400);
    throw new Error('Impossible de supprimer ce formateur car il a des formations associées');
  }
  
  await Formateur.findByIdAndDelete(req.params.id);
  
  res.status(200).json({ 
    success: true,
    message: "Formateur supprimé avec succès", 
    data: { id: req.params.id }
  });
});

// @desc    Récupérer les formateurs par spécialité
// @route   GET /api/formateurs/specialite/:specialite
const getFormateursBySpecialite = asyncHandler(async (req, res) => {
  const specialite = req.params.specialite;
  
  if (!specialite || specialite.length < 2) {
    res.status(400);
    throw new Error('La spécialité doit contenir au moins 2 caractères');
  }
  
  const formateurs = await Formateur.find({
    specialite: { $regex: specialite, $options: 'i' }
  });
  
  res.status(200).json({
    success: true,
    count: formateurs.length,
    specialite: specialite,
    data: formateurs
  });
});

module.exports = {
  getAllFormateurs,
  getFormateurById,
  createFormateur,
  updateFormateur,
  deleteFormateur,
  getFormateursBySpecialite
};