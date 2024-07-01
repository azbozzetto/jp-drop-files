const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    childName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    paymentStatus: { type: Boolean, default: false },
    amountVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Upload', uploadSchema);