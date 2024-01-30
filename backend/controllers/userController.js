import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Authenticate user/ set token
// @route POST /api/users/auth
// @access public
const authuser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    }
    else {
        res.status(401);
        throw new Error("Invalid Email / Password")
    }
})

// @desc Register user
// @route POST /api/users
// @access public
const registeruser = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        username, email, password
    })
    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    }
    else {
        res.status(400);
        throw new Error("Invalid user data")
    }
})

// @desc logout user
// @route POST /api/users/logout
// @access public
const logoutuser = asyncHandler(async (req, res) => {
    res.cookie("jwt", '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'Logged out successfully' });
})

// @desc Get user profile
// @route GET /api/users/profile
// @access private
const getuserprofile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.username,
        emai: req.user.email
    }
    res.status(200).json(user);
})

// @desc Update user profile
// @route PUT /api/users/profile
// @access private
const updateuserprofile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.username = req.body.name || user.username
        user.emai = req.body.emai || user.emai
        if (req.body.password) {
            user.password = req.body.password
        }
        const updateduser = await user.save();
        res.status(200).json({
            _id: updateduser._id,
            name: updateduser.username,
            email: updateduser.email
        })

    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
})










export { authuser, registeruser, updateuserprofile, getuserprofile, logoutuser }