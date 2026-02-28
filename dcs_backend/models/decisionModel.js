const mongoose = require('mongoose');

const decisionSchema = new mongoose.Schema({

    item: {
        type: String,
        required: true
    },

    criteria: {
        type:Object
    },

    options: [
        {
            id: Number,
            name: String
        }
    ],

    scores: {
        type: Object
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    userMail: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Decision", decisionSchema);
