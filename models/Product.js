const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    id: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    created: {
        type: String,
        lastActiveAt: Date,
        required: true
    },
    usersLiked: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Product', productSchema)