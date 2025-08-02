import userModel  from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password){
            return res.json({success: false, message: "Please fill all the fields"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const user = await userModel.find({ email });
        if (user.length > 0) {
            return res.json({success: false, message: "User already exists"});
        }

        const newUser = await userModel.create(userData);
        const token = jwt.sign({
            id: newUser._id
        }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({
            success: true,
            message: "User created successfully",
            token
        });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "User registration failed", error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid){
            return res.json({
                success: false,
                message: "Invalid password"
            })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({
            success: true,
            message: "User logged in successfully",
            token
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "User login failed", error });
    }
}

const userCredits = async (req, res) => {
    try {
        const userId = req.user.id; // Get from req.user instead of req.body

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            credits: user.creditBalance,
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.json({ success: false, message: "Failed to retrieve user credits", error: error.message });
    }
}

export {registerUser, loginUser, userCredits};