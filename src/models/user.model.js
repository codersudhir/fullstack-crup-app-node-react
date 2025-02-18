const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/dhqpgwpgq/image/upload/v1710145179/default_avatar.jpg"
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    verified:{
        type:Boolean,
        default:false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user'
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
