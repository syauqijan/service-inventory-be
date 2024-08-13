import Api from "../models/ApiModel.js";
import ServiceApi from "../models/ServiceApiModel.js";
import ServiceApiDetail from "../models/ServiceApiDetailModel.js";
import { Op } from "sequelize";

export const createServiceApiDetail = async (req, res) => {
    const {serviceId, apiId, userId} = req.body;
    try {
        await ServiceApiDetail.create({
            serviceId: serviceId,
            apiId: apiId,
            userId: userId,
        });
        res.status(201).json({msg: "Service API Detail Created"});
    } catch (error) {
        console.log(error.message);
    }
};

export const getServiceApiDetail = async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
  
    try {
      const whereCondition = search
        ? {
            [Op.or]: [
                { "$service_api.name$": { [Op.like]: `%${search}%` } },
                { "$api.method$": { [Op.like]: `%${search}%` } },
                { "$api.endpoint$": { [Op.like]: `%${search}%` } },
                { "$api.status$": { [Op.like]: `%${search}%` } },
                { "$api.version$": { [Op.like]: `%${search}%` } },
                { "$api.platform$": { [Op.like]: `%${search}%` } },
            ],
          }
        : {};
  
      const { count, rows: serviceApiDetail } = await ServiceApiDetail.findAndCountAll({
        where: whereCondition,
        include: 
        [
          {
            model: ServiceApi,
            as: "service_api",
            attributes: ["name"], 
          },
          {
            model: Api,
            as: "api",
            attributes: ["id", "method", "endpoint", "status", "version", "platform"], 
          }
        ],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });
  
      res.status(200).json({ serviceApiDetail, total: count });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Server Error" });
    }
  };

  // GET API VIA SERVICE API ID
  export const getApiByServiceId = async(req, res) =>{
    try {
        const response = await ServiceApiDetail.findAndCountAll({
            where:{
                serviceId: req.params.id
            },
            include: 
            [
              {
                model: ServiceApi,
                as: "service_api",
                attributes: ["name"], 
              },
              {
                model: Api,
                as: "api",
                attributes: ["id", "method", "endpoint", "status", "version", "platform"], 
              }
            ],
            });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
  }