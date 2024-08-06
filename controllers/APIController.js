import ApiModel from "../models/ApiModel.js";
import { Op } from "sequelize";

// SELECT * FROM API TABLE AND THEIR SEARCH
export const getAPI = async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
  
    try {
      const whereCondition = search
        ? {
            [Op.or]: [
              { id: { [Op.like]: `%${search}%` } },
              { method: { [Op.like]: `%${search}%` } },
              { endpoint: { [Op.like]: `%${search}%` } },
              { status: { [Op.like]: `%${search}%` } },
              { version: { [Op.like]: `%${search}%` } },
              { platform: { [Op.like]: `%${search}%` } },
            ],
          }
        : {};
  
      const { count, rows: api } = await ApiModel.findAndCountAll({
        where: whereCondition,
        limit: parseInt(limit),
        offset: parseInt(offset),
      });
  
      res.status(200).json({ api, total: count });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Server Error" });
    }
  };

// CREATING NEW SERVICE WEB 
export const createAPI = async(req, res) =>{
    const {endpoint, description, method, status, version, platform} = req.body;
    try {
        await ApiModel.create({
            endpoint: endpoint,
            description: description,
            method: method,
            status: status,
            version: version,
            platform: platform,
        });
        res.status(201).json({msg: "API Created"});
    } catch (error) {
        console.log(error.message);
    }
}

// GET API VIA ID
export const getApiById = async(req, res) =>{
  try {
      const response = await ApiModel.findOne({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}

//DELETE API VIA ID
export const deleteAPI = async(req, res) =>{
  try {
    const ids = req.body.ids;
    if (!Array.isArray(ids) || !ids.length) {
        return res.status(400).json({ msg: "No IDs provided or invalid format" });
    }

    await ApiModel.destroy({
        where: {
            id: {
                [Op.in]: ids
            }
        }
    });

    res.status(200).json({ msg: "Services Deleted" });
} catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Failed to delete services" });
}
}


//Update API Via ID
export const updateAPI = async(req, res) =>{
  try {
      await ApiModel.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "API Web Updated"});
  } catch (error) {
      console.log(error.message);
  }
}