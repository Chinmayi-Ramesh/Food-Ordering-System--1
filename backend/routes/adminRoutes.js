import express from "express";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(400).json({ success: false, message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

        const token = jwt.sign({ id: admin._id, role: "admin" }, "secretkey", { expiresIn: "1h" });
        res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get("/dashboard", async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ success: false, message: "Not authorized" });
        
        const decoded = jwt.verify(token, "secretkey");
        if (decoded.role !== "admin") return res.status(403).json({ success: false, message: "Forbidden" });

        const users = await User.find({}, "-password");
        const orders = await Order.find();

        res.json({ success: true, users, orders });
    } catch (err) {
        res.status(401).json({ success: false, message: "Not authorized" });
    }
});

export default router;
