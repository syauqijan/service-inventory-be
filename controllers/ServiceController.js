import ServiceWeb from "../models/ServiceWebModel.js";
import { Op } from "sequelize";


export const getService = async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
    const whereCondition = search
        ? {
            [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            ],
        }
        : {};

    const { count, rows: services } = await ServiceWeb.findAndCountAll({
        where: whereCondition,
        limit: parseInt(limit),
        offset: parseInt(offset),
    });

    res.status(200).json({ services, total: count });
    } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
    }
};


export const createService = async (req, res) => {
    try {
        const { name, gitlabUrl, description, preprodUrl, preprodUrlStatus, prodUrl, prodUrlStatus, userId } = req.body;

        const existingService = await ServiceWeb.findOne({
            where: {
                [Op.or]: [
                    { name },
                    { gitlabUrl },
                    { preprodUrl },
                    { prodUrl }
                ]
            }
        });

        if (existingService) {
            let errors = {};
            if (existingService.name === name) errors.name = 'Service name must not be duplicated';
            if (existingService.gitlabUrl === gitlabUrl) errors.gitlabUrl = 'Gitlab URL must not be duplicated';
            if (existingService.preprodUrl === preprodUrl) errors.preprodUrl = 'Pre-Prod URL must not be duplicated';
            if (existingService.prodUrl === prodUrl) errors.prodUrl = 'Prod URL must not be duplicated';

            return res.status(400).json({ errors });
        }

        const newService = await ServiceWeb.create({
            name, gitlabUrl, description, preprodUrl, preprodUrlStatus, prodUrl, prodUrlStatus, userId
        });

        res.status(201).json(newService);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to create service" });
    }
};

export const getServiceById = async(req, res) =>{
    try {
        const response = await ServiceWeb.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteService = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!Array.isArray(ids) || !ids.length) {
            return res.status(400).json({ msg: "No IDs provided or invalid format" });
        }

        await ServiceWeb.destroy({
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
};

export const updateService = async(req, res) =>{
    try {
        await ServiceWeb.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Service Web Updated"});
    } catch (error) {
        console.log(error.message);
    }
}
