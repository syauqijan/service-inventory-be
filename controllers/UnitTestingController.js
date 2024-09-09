import UnitTestingModel from "../models/UnitTestingModel.js";


export const createUnitTesting = async (req, res) => {
    const {coverageStatement, coverageBranch, coverageFunction, coverageLines, testCasePassed, testCaseFailed} = req.body;
    try {
        // Buat entitas UnitTesting di database
        const newUnitTesting = await UnitTestingModel.create({
            coverageStatement: coverageStatement,
            coverageBranch: coverageBranch,
            coverageFunction: coverageFunction,
            coverageLines: coverageLines,
            testCasePassed: testCasePassed,
            testCaseFailed: testCaseFailed
        });

        // Mengembalikan ID dari entitas yang baru saja dibuat beserta pesan sukses
        res.status(201).json({
            id: newUnitTesting.id,
            msg: "Unit Testing Created"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: error.message});
    }
}


export const getUnitTestingById = async(req, res) =>{
    try {
        const response = await UnitTestingModel.findOne({
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
export const deleteUnitTesting = async(req, res) =>{
    try {
        await UnitTestingModel.destroy({
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
export const updateUnitTesting = async(req, res) =>{
    try {
        await UnitTestingModel.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Unit Testing Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const getUnitTesting = async (req, res) => {
    try {
        const { count, rows: unitTesting } = await UnitTestingModel.findAndCountAll({});

        res.status(200).json({ unitTesting, total: count });
    } catch (error) {
        console.error('Error fetching services:', error.message);
        res.status(500).json({ message: "Server Error" });
    }
};