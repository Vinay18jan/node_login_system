const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create(req.body);
        if (user) {
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                token
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Info Required'
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        //authenticate passport login


        const user = { username: req.body.name, email: req.body.email };
        const token = jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET);
        let options = { httpOnly: true, expires: new Date(Date.now + 2 * 60 * 60 * 1000) }
        res.status(200).cookie('token', token, options).json({
            success: true,
            message: 'Login successful',
            token
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.getLoggedInUserDetails = async (req, res, next) => {
    try {
        const user = await User.findOne({ emai: req.email });
        res.status(200).json({ success: true, message: user });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.authenticate = async (req, res, next) => {
    try {
        let token;
        token = req.headers && req.headers.authorization?.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : req.cookies?.token;
        console.log(req.cookies);
        if (!token) res.status(401).json({ success: false, message: 'Token not valid!!!' });
        else {
            const user = await jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
            if (!user) res.status(401).json({ success: false, message: 'Token not authenticated!!!' });
            else req.user = user;
            next();
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}