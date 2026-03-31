import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//Helper function to create a token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'});
};

export const registerUser = async(req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id),
        });

    } catch(error) {
       return res.status(500).json({ message: "Server error during registration" });
    }
};

export const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        //Compare entered password with hashed password in DB
        if(user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error during login" });
    }
};