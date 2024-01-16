import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/login", 
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password with 6 or more characters required").isLength({
            min:6,
        })
    ], 
    async (req: Request, res: Response) => {
        const errors = validationResult(req);       //store any error in validation as per mentioned aboved the rules.
        if(!errors.isEmpty()) {     //if there is error...
            return res.status(400).json({message: errors.array()});
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({email});
            if(!user) {
                return res.status(400).json({message: "Wrong Credentials"});
            }

            const isMatched = await bcrypt.compare(password, user.password);

            if(!isMatched){
                return res.status(400).json({message: "Wrong Credentials"});
            }

            const token = jwt.sign(
                {userId: user.id}, 
                process.env.JWT_SECRET_KEY as string, {
                    expiresIn: "1d"
                }
            );

            res.cookie("auth_token", token, {
                httpOnly:true,  //can only access in server
                secure: process.env.NODE_ENV === "production", //secure is for https, false for development
                maxAge: 86400000,
            });

            res.status(200).json({userId: user._id});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Something went wrong"});
        }
});

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    res.status(200).send({userId: req.userId});
});

router.post("/logout", (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });

    res.send();
    
});

export default router;