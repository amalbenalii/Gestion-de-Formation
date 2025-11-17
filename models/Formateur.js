const mongoose = require('mongoose');
const formateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
    trim: true,
    minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
  },
  specialite: {
    type: String,
    required: [true, 'La spécialité est obligatoire'],
    trim: true,
    minlength: [3, 'La spécialité doit contenir au moins 3 caractères'],
    maxlength: [100, 'La spécialité ne peut pas dépasser 100 caractères']
  },
  email: {
    type: String,
    required: [true, 'L\'email est obligatoire'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Format d\'email invalide']
  },
  anneesExperience: {
    type: Number,
    default: 0,
    min: [0, 'Les années d\'expérience ne peuvent pas être négatives'],
    max: [50, 'Les années d\'expérience ne peuvent pas dépasser 50']
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Formateur', formateurSchema);