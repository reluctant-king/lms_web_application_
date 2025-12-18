const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  sender_role: { 
    type: String, 
    enum: ['student', 'instructor', 'admin', 'institution'],
    required: true 
  },
  message: { type: String, required: true },
  seen: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
