# Cour : **authController : "JWT && password-email"**


## 1. **Qu'est-ce qu'un `authController` ?**  

- Un **`authController`** (Authentication Controller) est un fichier dans une application backend (souvent en Node.js avec Express) qui gère toute la logique d'**authentification** et d'**autorisation** des utilisateurs.  

- **Il est souvent utilisé pour** :

    - L'inscription (`signup`)
    - La connexion (`login`)
    - La protection des routes (`protect`)
    - La gestion des rôles (`restrictTo`)
    - Le changement et la réinitialisation de mot de passe (`updatePassword`, `forgotPassword`, `resetPassword`)


    | Fonction | Description |
    |----------|------------|
    | `signup` | Crée un nouvel utilisateur et génère un token JWT |
    | `login` | Vérifie les identifiants et envoie un token |
    | `protect` | Protège les routes en s'assurant que l'utilisateur est connecté |
    | `restrictTo` | Vérifie si l'utilisateur a le bon rôle (ex: admin, user) |
    | `forgotPassword` | Génère un token pour réinitialiser le mot de passe et l'envoie par email |
    | `resetPassword` | Vérifie le token et met à jour le mot de passe |
    | `updatePassword` | Modifie le mot de passe d'un utilisateur connecté |


## 2. **Structure d'un `authController`**

Un fichier `authController.js` regroupe les fonctions liées à l'authentification des utilisateurs.

```js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../Error/AppError');

// 🔹 Génère un JWT
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

// 🔹 Envoie le JWT au client
const createAndSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    res.status(statusCode).json({
        status: 'success',
        token,
        data: { user }
    });
};

// 1️⃣ **Inscription (Signup)**
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    createAndSendToken(newUser, 201, res);
});

// 2️⃣ **Connexion (Login)**
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Veuillez fournir un email et un mot de passe !", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    const isValidPassword = await user?.verifyPassword(password, user?.password);

    if (!user || !isValidPassword) {
        return next(new AppError("Email ou mot de passe incorrect", 401));
    }

    createAndSendToken(user, 200, res);
});

// 3️⃣ **Protection des routes**
exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new AppError("Vous devez être connecté pour accéder à cette ressource", 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
        return next(new AppError("L'utilisateur n'existe plus", 401));
    }

    if (user.isPasswordChanged(decoded.iat)) {
        return next(new AppError("Mot de passe modifié récemment. Veuillez vous reconnecter.", 401));
    }

    req.user = user;
    next();
});

// 4️⃣ **Restriction par rôle**
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("Vous n'avez pas les permissions pour effectuer cette action", 403));
        }
        next();
    };
};

// 5️⃣ **Réinitialisation du mot de passe (Forgot Password)**
exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new AppError("Aucun utilisateur trouvé avec cet email", 404));
    }

    const token = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${token}`;
    const message = `Réinitialisez votre mot de passe en envoyant une requête PATCH à : ${resetURL}`;

    try {
        await emailService.sendEmail({ email: user.email, subject: "Réinitialisation du mot de passe", message });
        res.status(200).json({ status: 'success', message: "Token envoyé par email" });
    } catch (e) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new AppError("Erreur lors de l'envoi de l'email", 500));
    }
});

// 6️⃣ **Réinitialisation du mot de passe avec Token**
exports.resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });

    if (!user) {
        return next(new AppError("Token invalide ou expiré", 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    createAndSendToken(user, 200, res);
});

// 7️⃣ **Mise à jour du mot de passe**
exports.updatePassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordValid = await user.verifyPassword(req.body.passwordCurrent, user.password);
    if (!isPasswordValid) {
        return next(new AppError("Mot de passe actuel incorrect", 401));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    createAndSendToken(user, 200, res);
});
```



- **userModel:**


```js

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


userSchema.pre(/^find/, function (next) {
    // this pointe to : query 

    this.find({ active: { $ne: false } });
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


userSchema.methods.createPasswordResetToken = function () {

    const token = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 min 

    return token;
}


const User = mongoose.model('User', userSchema);

module.exports = User;


```



## 3. **Comment utiliser ce `authController` dans Express ?**

- Dans votre fichier **`routes/userRoutes.js`**, vous pouvez l'utiliser comme ceci :

```js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updatePassword', authController.protect, authController.updatePassword);

module.exports = router;
```

- Ensuite, dans **`app.js`** :

```js
const userRoutes = require('./routes/userRoutes');
app.use('/api/v1/users', userRoutes);
```

