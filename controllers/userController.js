import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateHashPassword } from '../utils/generateHash.js';

export const register = async (req, res) => {
    try {
        const { fullName, email, password, role, phoneNumber } = req.body;

        if (!fullName || !email || !password || !role || !phoneNumber) {
            return res.status(400).json({ msg: "Something is missing", success: false });
        }

        
        const userExists = await User.findOne({ email }).lean();
        if (userExists) {
            return res.status(409).json({ message: "Email already exists!", success: false });
        }

        const hashedPassword = await generateHashPassword(password);

        const savedUser = await User.create({
            fullName,
            email,
            password: hashedPassword, 
            role,
            phoneNumber,
        });

        res.status(201).json({ message: "User registered successfully", success: true, user: savedUser });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};





// export const login = async(req,res)=>{
//     try {
//         const {email,password,role} = req.body;
//         if (!email || !password || !role ) {
//             return res.status(400).json({ msg: "Something is missing", success: false });
//         }
        
// const user = await User.findOne({email});
// if(!user){
//     return res.status(400).json({msg:"incorrect email or password",success:false})
// }
//    const isPasswordMatch = await bcrypt.compare(password,user.password);
//    if(!isPasswordMatch){
//     return res.status(400).json({msg:"incorrect email or password",success:false})
//    }
//    if(role != user.role){
//     return res.status(400).json({msg:"account doest not with current role"})
//    }
//     } catch (error) {
//         return res.status(500).json({msg:"internal server error"})
//     }
// }






export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate the input
        if (!email || !password || !role) {
            return res.status(400).json({ msg: "Something is missing", success: false });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "Incorrect email or password", success: false }); // 401 Unauthorized
        }

        // Compare the password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ msg: "Incorrect email or password", success: false }); // 401 Unauthorized
        }

        // Check the role
        if (role !== user.role) {
            return res.status(403).json({ msg: "Account does not match the current role", success: false }); // 403 Forbidden
        }

        // Successful login
        res.status(200).json({
            msg: "Login successful",
            success: true,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ msg: "Internal server error", success: false });
    }
};





export const updateProfile = async(req,res)=>{
    try {
        const {fullName,email,phoneNumber,bio,skills}= req.body;
        if (!fullName || !email || !bio || !skills || !phoneNumber) {
            return res.status(400).json({ msg: "Something is missing", success: false });
        }
    const skillsArray = skills.split(",");
    const userId = req.id;
    let user = await User.findById(userId);
    if(!user){
        return res.status(404).json({message:"user not found",success:false})
    }
    user.fullName = fullName,
    user.email = email,
    user.phoneNumber = phoneNumber,
    user.profile.bio = bio,
    user.profile.skills = skillsArray
    } catch (error) {
        
    }
}