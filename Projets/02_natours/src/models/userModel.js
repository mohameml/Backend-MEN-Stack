const mongoose = require("mongoose")
const validtor = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please tell us your name !'],
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            validate: [validtor.isEmail, 'Please provide a valid email : {VALUE}']
        },
        photo: String,
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 8,
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                validator: function (val) {
                    return val === this.password
                },
                message: "Passwords are not the same"
            }
        },
        passwordChangedAt: Date

    }
)


userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();

})


userSchema.methods.verifyPassword = async (candidatePassword, realPassword) => {

    return await bcrypt.compare(candidatePassword, realPassword);
}

userSchema.methods.isPasswordChanged = function (JWTTimestep) {

    if (this.passwordChangedAt) {
        const changedTimestep = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        return JWTTimestep < changedTimestep;
    }

    return false;
}

const User = mongoose.model('User', userSchema);

module.exports = User;