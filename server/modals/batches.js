const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  batchName: String,
  batchCode: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },

  // Only one students array
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],

  mode: String,             
  maxSeats: Number,
  status: String,          

  startDate: Date,
  endDate: Date,
  duration: String,         
  daysOfWeek: [String],     
  classStart: String,      
  classEnd: String,         
  timeZone: String,        

  venue: String,
  address: String,
  mapsLink: String,

  description: String,
  notes: String,            
  banner: String,   

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Batch = mongoose.model("Batch", batchSchema);
module.exports = Batch;
