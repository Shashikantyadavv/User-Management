const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    // console.log(req);
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, "mySecretKey", { expiresIn: "1h" });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
};

const deleteUser = async (req, res) => {
    console.log(req.params.id);
    try {
        const user = await User.findById(req.params.id);
        console.log(user);
        if (!user) {
            console.log("hello1");
            return res.status(404).json({ error: "User not found" });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User removed" });
    } catch (error) {
        console.log("hello2");
        res.status(500).json({ error: "Failed to delete user" });
    }
};

module.exports = { signup, login, getUsers, updateUser, deleteUser };

