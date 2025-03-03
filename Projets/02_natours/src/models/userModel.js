const mongoose = require("mongoose")
const validtor = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

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
        role: {
            type: String,
            enum: ["user", "guide", "lead-guide", "admin"],
            default: 'user'
        },
        photo: {
            type: String,
            default: "default.jpg"
        },
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
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active: {
            type: Boolean,
            default: true,
            select: false
        }

    }
)


// ========================== Middelware save : =================================

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();

})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000; // pour assuret que passwordChangetAt < JWTTimeStep => JWT valide 
    next();
})


// ===================== Middelware find ======================

userSchema.pre(/^find/, function (next) {
    // this pointe to : query 

    this.find({ active: { $ne: false } });
    next();
})


// ===========================  Méthodes :  ===================================== 


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


userSchema.methods.createPasswordResetToken = function () {

    const token = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 min 

    return token;
}


const User = mongoose.model('User', userSchema);

module.exports = User;