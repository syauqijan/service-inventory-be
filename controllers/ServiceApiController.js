import ServiceApiModel from "../models/ServiceApiModel.js";
import Sonarqube from "../models/SonarqubeModel.js"
import UnitTesting from "../models/UnitTestingModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

// CREATING NEW SERVICE API 
export const createService = async(req, res) =>{
    const {name, gitlabUrl, description, yamlSpec, serviceApiDetailId, sonarCubeId, unitTestingId} = req.body;
    try {
        // Buat entitas ServiceApi di database
        const newServiceApi = await ServiceApiModel.create({
            name: name,
            gitlabUrl: gitlabUrl,
            description: description,
            yamlSpec: yamlSpec,
            serviceApiDetailId: serviceApiDetailId,
            sonarCubeId: sonarCubeId,
            unitTestingId: unitTestingId
        });

        // Kembalikan ID dari entitas yang baru saja dibuat
        res.status(201).json({
            id: newServiceApi.id,  // ID yang dihasilkan oleh database
            msg: "Service Api Created"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Failed to create Service API"});
    }
}


// SELECT * FROM SERVICE API TABLE AND THEIR SEARCH
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

        const { count, rows: serviceapi } = await ServiceApiModel.findAndCountAll({
            where: whereCondition,
            limit: pageSize,
            offset: offset,
        });

        res.status(200).json({ serviceapi, total: count });
    } catch (error) {
        console.error('Error fetching services:', error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

// Deleting Service API via ID
export const deleteService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        if (!serviceId) {
            return res.status(400).json({ msg: "Service ID is required" });
        }

        await ServiceApiModel.destroy({
            where: {
                id: serviceId
            }
        });

        res.status(200).json({ msg: "Service Deleted" });
    } catch (error) {
        console.error('Error deleting service:', error.message);
        res.status(500).json({ msg: "Failed to delete service" });
    }
};

// Get Service API via ID
export const getServiceById = async (req, res) => {
    try {
        const response = await ServiceApiModel.findOne({
            where: {
                id: req.params.id
            },
            include: 
            [
                {
                    model: Sonarqube,
                    attributes: ['id', 'qualityGateStatus', 'bugs', 
                        'vulnerabilities', 'codesmell', 'coverage', 'duplication']
                },
                {
                    model: UnitTesting,
                    attributes: ['id', 'testCasePassed', 'testCaseFailed', 'coverageStatement', 
                    'CoverageBranch', 'coverageFunction', 'CoverageLines']
                },
                {
                    model: User,
                    attributes: ['id', 'name']
                }
            ]
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
