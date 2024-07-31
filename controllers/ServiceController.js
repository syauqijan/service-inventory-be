import ServiceWeb from "../models/ServiceWebModel.js";

// SELECT * FROM SERVICEWEB TABLE
export const getService = async(req, res) =>{
    try {
        const ServiceWebs = await ServiceWeb.findAll({

        });
        res.status(200).json(ServiceWebs);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Server Error"});
    }
}

// CREATING NEW SERVICE WEB 
export const createService = async(req, res) =>{
    const {name, gitlabUrl, description, preprodUrl, preprodUrlStatus, prodUrl, prodUrlStatus, userId} = req.body;
    try {
        await ServiceWeb.create({
            name: name,
            gitlabUrl: gitlabUrl,
            description: description,
            preprodUrl: preprodUrl,
            preprodUrlStatus: preprodUrlStatus,
            prodUrl: prodUrl,
            prodUrlStatus: prodUrlStatus,
            userId: userId,
        });
        res.status(201).json({msg: "Service Created"});
    } catch (error) {
        console.log(error.message);
    }
}

// Select Service Web via their ID
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

//Delete Service Data Via ID
export const deleteService = async(req, res) =>{
    try {
        await ServiceWeb.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Service Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

//Update Service WEB Via ID
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