const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    sparse: true
  },
  instructorId: {
    type: String,
    unique: true
  },
  accountRegisteredEmail: {
    type: String,
    unique: true,
    sparse: true
  },
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  bio: String,
  image: String,
  expertise: String,
  specialization: String,
  experience: Number,
  qualification: String,
  linkedin: String,
  github: String,
  website: String
}, {
  timestamps: true
});

const instructorModel = mongoose.model("Instructor", instructorSchema);
module.exports = instructorModel;
