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

export const login = async(req, res) =>{
    try {
        const user = await User.findAll({
            where:{
                email: req.body.email
            }
        });
        console.log("hai1");

        if(user.length < 1){
            return res.status(401).json({msg: "No User Found"});
        }
        console.log("hai2");

        const validPassword = await bcrypt.compare(req.body.password, user[0].password);
        if(!validPassword){
            return res.status(401).json({msg: "Wrong Password"});
        }
        console.log("hai3");
        console.log(user[0]);
        const token = jwt.sign({
            email: user[0].email,
            userId: user[0].id,
            name: user[0].name
        }, process.env.JWT_KEY,{
            expiresIn: "1h"
        });
        // console.log("hai4");
        res.status(200).json({msg: "Auth Successful", token: token});
    }
    catch (error) {
        res.status(401).json({msg: "Auth Failed"});


    }
}

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