const express = require('express');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {registrationValedator, loginValidator} = require('../validations/auth');
const {isAuth} = require('../middlewares/auth');
const User = require('../models/User');

const router = express.Router();

router.post('/register', registrationValedator, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, fullName, avatarUrl } = req.body;

        const candidateUser = await User.findOne({ email });
        if (candidateUser) {
            return res.status(400).json({ message: 'user with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            email,
            password: hashedPassword,
            fullName,
            avatarUrl,
        });

        user.save();

        const token = jwt.sign({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
        }, process.env.MONGO_SECRET, { expiresIn: '1d' });

        const resUser = {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            token,
        }

        res.status(200).json(resUser);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

router.post('/login', loginValidator, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const {email, password} = req.body;
    
        const candidateUser = await User.findOne({ email });
    
        if (!candidateUser) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isValidPassword = await bcrypt.compare(password, candidateUser.password);

        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({
            _id: candidateUser._id,
            email: candidateUser.email,
            fullName: candidateUser.fullName,
        }, process.env.MONGO_SECRET, { expiresIn: '1d' });

        const resUser = {
            _id: candidateUser._id,
            email: candidateUser.email,
            fullName: candidateUser.fullName,
            createdAt: candidateUser.createdAt,
            updatedAt: candidateUser.updatedAt,
            token,
        };

        res.json(resUser);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

router.get('/me', isAuth, async (req, res) => {
    try {
        const tokenFields = jwt.verify(req.token, process.env.MONGO_SECRET);
        
        const user = await User.findOne({ _id: tokenFields._id });

        res.json(user);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
});

module.exports = router;
