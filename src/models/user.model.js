const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    tokens:[{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
});

// Hash the plain text password before saving
userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')|| user.isNew) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// Generate JWT token for user
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

module.exports = mongoose.model('User', userSchema);
