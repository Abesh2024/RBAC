import UserModel from "../model/UserModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import tokenGenerate from "../utils/tokenGenerate.js";


const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
    
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email",
            });
        }
    
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists, please login",
            });
        }
        const salt = await bcrypt.genSalt(7);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Register the user
        const registeredUser = await UserModel.create({
            username,
            email,
            password: hashedPassword,

        });
    
      if(registeredUser) {
         tokenGenerate (registeredUser._id, res);
         res.status(200).json({
            success: true,
            message: "User registered successfully",
            registeredUser,
        });
      } else {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
      }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
            error: error.message 
        });
    };
    }

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        const user = await UserModel.findOne({ email });
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist, please register",
            });
        }
        const confirmPassword = await bcrypt.compare(password, user.password);
        if(!confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        tokenGenerate(user._id, res);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong. Please try again later${error.message}`
        });
    }
}

const logout = (req, res) => {

    try {
		res.clearCookie("token", {
            path: "/",
            httpOnly: true,
        });
		res.status(200).json({ message: "User logged out successfully" });	
     } catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
  };

const getUser = async (req, res, next) => {
    const users = await UserModel.find();
    // console.log(users, "Abesh sarkar");

    res.status(200).json({
        success: true,
        message: "Test Middleware is tested",
        users
    })
}

const deleteUser = async (req, res) => {  
    try {  
        const adminId = req.user._id.toString(); // Admin's ID from the authenticated user
        const userId = req.params.id; // User ID to delete from route params

        // Check if the authenticated user is trying to delete their own account
        if (adminId === userId) {
            return res.status(400).json({
                status: false,
                message: "You cannot delete your own account.",
            });
        }

        // Find the user to be deleted
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found.",
            });
        }

        // Delete the user
        await UserModel.findByIdAndDelete(userId);

        res.status(200).json({
            status: true,
            message: `User with ID ${userId} deleted successfully.`,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}
export {register, login, getUser, logout, deleteUser}