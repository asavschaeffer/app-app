const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    ideaName: {
        type: String,
        required: true,
        trim: true
    },
    ideaDifficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    ideaAuthors: [{
        type: String,
        required: true
    }],
    ideaDescription: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Fields for future features
    category: String,
    tags: [String],
    likes: {
        type: Number,
        default: 0
    },
    bounty: {
        amount: Number,
        currency: String,
        active: Boolean
    },
    teamSize: {
        min: Number,
        max: Number
    }
});

// Add indexes for faster querying
ideaSchema.index({ ideaName: 'text', ideaDescription: 'text' });
ideaSchema.index({ createdAt: -1 });
ideaSchema.index({ likes: -1 });

module.exports = mongoose.model('Idea', ideaSchema);
