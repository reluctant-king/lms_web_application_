const mongoose = require("mongoose")

const userScheme = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    password: String,
    role: String,
    isLogin: {
        type: Boolean,
        default: false,
    },
    
    // Instructor Approval Fields
    isApproved: {
        type: Boolean,
        default: function() {
            return this.role === 'student'; 
        }
    },
    verificationStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: function() {
            return this.role === 'instructor' ? 'pending' : 'approved';
        }
    },
    rejectionReason: String,
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    approvedAt: Date,
    expertise: String,
    
},{ timestamps: true });

const userModal = mongoose.model("users", userScheme)
module.exports = userModal
