const mongoose = require("mongoose")

const feeStructore = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    totalFee: {
        type: String,
        required: true
    },
    feeBreakDown: {
        tuition: { type: String },
        exam: { type: String },
        library: { type: String },
        lab: { type: String },
        other: { type: String }
    },
    installment: {
        type: String,
    },
})

const feeStructoreModal = mongoose.model("feesStructore", feeStructore)

module.exports = feeStructoreModal
