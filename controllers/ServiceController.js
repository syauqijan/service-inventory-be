import ServiceWeb from "../models/ServiceWebModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getService = async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);
    const offset = (pageNumber - 1) * pageSize;

    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(pageSize) || pageSize < 1) {
        return res.status(400).json({ message: 'Invalid pagination parameters' });
    }

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
            limit: pageSize,
            offset: offset,
        });

        res.status(200).json({ services, total: count });
    } catch (error) {
        console.error('Error fetching services:', error.message);
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
        console.error('Error creating service:', error.message);
        res.status(500).json({ message: "Failed to create service" });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const response = await ServiceWeb.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: User,
                attributes: ['name']
            }]
        });
        
        if (!response) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching service by ID:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteService = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!Array.isArray(ids) || !ids.length) {
            return res.status(400).json({ message: "No IDs provided or invalid format" });
        }

        await ServiceWeb.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        });

        res.status(200).json({ message: "Services Deleted" });
    } catch (error) {
        console.error('Error deleting services:', error.message);
        res.status(500).json({ message: "Failed to delete services" });
    }
};

export const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, gitlabUrl, description, preprodUrl, preprodUrlStatus, prodUrl, prodUrlStatus, userId } = req.body;

        const existingService = await ServiceWeb.findOne({
            where: {
                [Op.or]: [
                    { name },
                    { gitlabUrl },
                    { preprodUrl },
                    { prodUrl }
                ],
                id: { [Op.ne]: id }  
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

        await ServiceWeb.update(
            { name, gitlabUrl, description, preprodUrl, preprodUrlStatus, prodUrl, prodUrlStatus, userId },
            { where: { id } }
        );

        res.status(200).json({ message: "Service Web Updated" });
    } catch (error) {
        console.error('Error updating service:', error.message);
        res.status(500).json({ message: "Failed to update service" });
    }
};
