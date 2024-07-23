import Role from "../models/RoleModel.js";

export const getRoles = async(req, res) =>{
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Server Error"});
    }
}