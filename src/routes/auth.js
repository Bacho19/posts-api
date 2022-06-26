const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password, fullName, avatarUrl } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        

        res.json(hashedPassword);
    } catch (e) {
        res.status(500).json('something went wrong, please try again');
    }
});

module.exports = router;
