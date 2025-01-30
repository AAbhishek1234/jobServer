import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { secretKey } from '../constants/auth.js';
// Register user
export const register = async (req, res) => {
    const { fullname, email, password, role, phoneNumber } = req.body;
    
    if (!fullname || !email || !password || !role || !phoneNumber) {
        return res.status(400).json({ msg: "Something is missing" });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(409).json({ msg: "Email already exists!" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            role,
            phoneNumber
        });

        await newUser.save();
        res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};

// Login user

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ msg: "Something is missing", success: false });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "Incorrect email or password", success: false });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ msg: "Incorrect email or password", success: false });
        }

        if (role !== user.role) {
            return res.status(403).json({ msg: "Account does not match the current role", success: false });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            secretKey,  // Use the same secretKey here
            { expiresIn: "365d" }
        );

        res.status(200).json({
            msg: "Login successful",
            success: true,
            token,  // Return the token
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber,
                profile: user.profile,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ msg: "Internal server error", success: false });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        if (!fullname || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({ message: "Something is missing", success: false });
        }

        const skillsArray = skills.split(",");
        const userId = req.user.userId;

        console.log("Authenticated User ID:", userId);

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false }); // ✅ Use 404 for not found
        }

        // Update user data
        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillsArray;

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile,
            },
        });
    } catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};




