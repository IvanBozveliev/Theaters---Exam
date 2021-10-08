const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /[a-zA-Z0-9]{3,}/.test(value);
            },
            message: () => `Username must be at least 3 characters long and consist only latin letters and digits`
        }
    },
    password: {
        type: String,
        required: true,
    },
    likedPlays: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }],
})

module.exports = mongoose.model('User', userSchema)