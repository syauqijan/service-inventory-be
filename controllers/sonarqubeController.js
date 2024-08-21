import SonarqubeModel from "../models/SonarqubeModel.js";

export const createSonarqube = async (req, res) => {
    const {qualityGateStatus, bugs, vulnerabilities, codesmell, coverage, duplication} = req.body;
    try {
        // Buat entitas Sonarqube di database
        const newSonarqube = await SonarqubeModel.create({
            qualityGateStatus: qualityGateStatus,
            bugs: bugs,
            vulnerabilities: vulnerabilities,
            codesmell: codesmell,
            coverage: coverage,
            duplication: duplication
        });

        // Mengembalikan ID dari entitas yang baru saja dibuat beserta pesan sukses
        res.status(201).json({
            id: newSonarqube.id,
            msg: "Sonar Qube Testing Created"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: error.message});
    }
}


export const getSonarqubeById = async(req, res) =>{
    try {
        const response = await SonarqubeModel.findOne({
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
export const deleteSonarqube = async(req, res) =>{
    try {
        await SonarqubeModel.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "API Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

//Update API Via ID
export const updateSonarqube = async(req, res) =>{
    try {
        await SonarqubeModel.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Sonar Qube Updated"});
    } catch (error) {
        console.log(error.message);
    }
}