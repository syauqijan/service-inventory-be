import User from "../models/UserModel.js";
import Role from "../models/RoleModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
    try {
      let { search, page = 1, limit = 10, status = 'enable' } = req.query;
  
      // Pastikan 'page' dan 'limit' adalah angka valid
      page = parseInt(page);
      limit = parseInt(limit);
  
      if (isNaN(page) || page < 1) page = 1;
      if (isNaN(limit) || limit < 1) limit = 10;
  
      const offset = (page - 1) * limit;
  
      const whereCondition = {
        status,
      };
  
      if (search) {
        whereCondition[Op.or] = [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { "$role.name$": { [Op.like]: `%${search}%` } },
        ];
      }
  
      const { count, rows: users } = await User.findAndCountAll({
        where: whereCondition,
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["name"],
          },
        ],
        limit,
        offset,
      });
  
      // Logging untuk memeriksa hasil query
      console.log('Users found:', users.length);
      console.log('Total count:', count);
  
      res.status(200).json({ users, total: count });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Server Error" });
    }
  };
  

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
    const {name, email, password, roleId} = req.body;
    const salt = await bcrypt.genSalt();  
    const hashedPassword = await bcrypt.hash(password, salt);


    try {
        await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            roleId: roleId,
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
            where: { 
                email,
                status: 'enable' 
            }
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
                name: user.name,
            },
            process.env.JWT_KEY,
            { expiresIn: '1d' } 
        );

        const expiresIn = 86400; 

        res.cookie('authToken', token, { maxAge: expiresIn * 1000, httpOnly: true, secure: process.env.NODE_ENV !== 'development' });

        res.status(200).json({
            msg: "Auth Successful",
            token: token,
            expiresIn: expiresIn
        });
    } catch (error) {
        res.status(401).json({ msg: "Auth Failed" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, password, roleId, status } = req.body;

        const updateData = { name, email, roleId, status };

        if (password) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            updateData.password = hashedPassword;
        }

        await User.update(updateData, {
            where: {
                id: userId
            }
        });

        res.status(200).json({ msg: 'User Updated' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};
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