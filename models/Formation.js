const mongoose = require('mongoose');
const formationSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  duree: {
    type: Number, // en heures
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
  formateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Formateur',
    required: true
  },
  dateDebut: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Formation', formationSchema);