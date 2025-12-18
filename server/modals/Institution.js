const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema(
    {
        institutionName: {
            type: String,
            required: true,
            trim: true,
        },
        adminFullName: {
            type: String,
            required: true,
            trim: true,
        },
        adminEmail: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        adminPassword: {
            type: String,
            required: true,
            minlength: 6,
        },
        websiteUrl: {
            type: String,
            default: "",
        },
        image: {
            type: [String],
            required: true,

        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },

        
        address: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        gstin: {
            type: String
        },
        accreditation: {
            type: String
        },
        founded: {
            type: String
        },
        courses: [String],
        students: {
            type: String
        },
        placement: {
            type: String
        },
        facilities: [String],
    },

    { timestamps: true }
);

const Institution = mongoose.model("Institution", institutionSchema);

module.exports = Institution;

