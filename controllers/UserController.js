import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) =>{
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUserById = async(req, res) =>{
    try {
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
export const createUser = async(req, res) =>{
    const {name, email, password, role, last_login} = req.body;
    const salt = await bcrypt.genSalt();  
    const hashedPassword = await bcrypt.hash(password, salt);


    try {
        await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
            last_login: last_login
        });
        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ msg: 'No User Found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ msg: 'Wrong Password' });
        }

        const token = jwt.sign(
            {
                email: user.email,
                userId: user.id,
                name: user.name
            },
            process.env.JWT_KEY,
            { expiresIn: '1d' } 
        );

        const expiresIn = 86400; 

        res.status(200).json({
            msg: "Auth Successful",
            token: token,
            expiresIn: expiresIn
        });
    } catch (error) {
        res.status(401).json({ msg: "Auth Failed" });
    }
};

export const updateUser = async(req, res) =>{
    try {
        await User.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async(req, res) =>{
    try {
        await User.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}