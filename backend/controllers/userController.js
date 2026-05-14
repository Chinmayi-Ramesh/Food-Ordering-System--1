import userModel from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// create token function
const createToken = (id) => {
    return jwt.sign({ id }, "secretkey", { expiresIn: "30d" }); // Note: you should use an env var for secretkey
}

// register user
export const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Name, email and password are required" });
    }

    try {
        // checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({ success: true, token, name: user.name });
    } catch (error) {
        console.error("REGISTER_USER_ERROR:", error);
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: "Email is already registered" });
        }
        res.status(500).json({ success: false, message: error.message || "Error" });
    }
}

// login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token, name: user.name });
    } catch (error) {
        console.error("LOGIN_USER_ERROR:", error);
        res.status(500).json({ success: false, message: error.message || "Error" });
    }
}
