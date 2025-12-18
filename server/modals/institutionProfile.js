const mongoose = require("mongoose")

const instititionProfileSchema = new mongoose.Schema({
    image: [String],
    instituteName: String,
    address: String,
    email: String,
    phone: String,
    website: String,
    gstin: String,
    accreditation: String,
    founded: String,
    courses: String,
    students: String,
    placement: String,
    facilities: String

});

const profile = mongoose.model("Institutiom_profile", instititionProfileSchema)

module.exports = profile
