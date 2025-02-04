import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { secretKey } from "../constants/auth.js";
// Register user
export const register = async (req, res) => {
  const { fullname, email, password, role, phoneNumber } = req.body;

  if (!fullname || !email || !password || !role || !phoneNumber) {
    return res
      .status(400)
      .json({ msg: "Something is missing", success: false });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(409)
        .json({ msg: "Email already exists!", success: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      secretKey,
      {
        expiresIn: "365d",
      }
    );

    res
      .status(201)
      .json({
        msg: "User registered successfully",
        success: true,
        jwtToken: token,
      });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Login user

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }
    if (user.role !== role) {
      return res.status(400).json({ message: "Role mismatch", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      "this-is-secret-key", // Make sure this matches the one in `authenticateToken.js`
      { expiresIn: "365d" } // Token expires in 7 days
    );

    return res
      .status(200)
      .json({ message: "Login successful", jwtToken: token, success: true });
    e;
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    let skillsArray;

    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.user.userId;
    console.log("Authenticated User ID:", userId);

    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skillsArray) user.profile.skills = skillsArray;

    if (user.profile.fullname) {
      delete user.profile.fullname;
    }

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

export const logout = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
