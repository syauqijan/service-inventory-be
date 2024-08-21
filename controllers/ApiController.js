import ApiModel from "../models/ApiModel.js";
import ServiceApi from "../models/ServiceApiModel.js";
import { Op } from "sequelize";

// SELECT * FROM API TABLE AND THEIR SEARCH
export const getAPI = async (req, res) => {
    try {
      const { count, rows: api } = await ApiModel.findAndCountAll({
        include: 
        [
          {
            model: ServiceApi,
            as: "service_api",
            attributes: ["name", "id"], 
          },
        ],
      });
  
      res.status(200).json({ api, total: count });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Server Error" });
    }
  };

// CREATING NEW SERVICE WEB 
export const createAPI = async(req, res) =>{
    const {service_api_id, endpoint, description, method, status, version, platform} = req.body;
    try {
        await ApiModel.create({
            service_api_id: service_api_id,
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
      const response = await ApiModel.findAndCountAll({
          where:{
            service_api_id: req.params.id
          },
          include: 
          [
            {
              model: ServiceApi,
              as: "service_api",
              attributes: ["name"], 
            },
          ],
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
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

//DELETE API VIA ID
export const deleteAPI = async (req, res) => {
  try {
      const serviceId = req.params.id;
      if (!serviceId) {
          return res.status(400).json({ msg: "API ID is required" });
      }

      await ApiModel.destroy({
          where: {
              id: serviceId
          }
      });

      res.status(200).json({ msg: "API Deleted" });
  } catch (error) {
      console.error('Error deleting API:', error.message);
      res.status(500).json({ msg: "Failed to delete API" });
  }
};