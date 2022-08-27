const { getAllBuildingsDB, createNewBuildingDB, updateBuildingDB, deleteBuildingDB } = require('../repository/building.repository');
const { deleteCoordinatesFromBuildingBD } = require('../repository/coordinate.repository');

const getBuildings = async (req, res) => {
    try {
        const response = await getAllBuildingsDB();
        res.status(200).json(response);
    } catch(err) {
        res.status(500).send('An error has occurred');
    }
}

const createBuilding = async (req, res) => {
    const { name, floors, latitude, longitude } = req.body;
    try {
        await createNewBuildingDB(name, floors, latitude, longitude);
        res.status(200).json({
            message: 'Building added succesfully',
            building: {
                name, floors, latitude, longitude
            }
        });
    } catch(err) {
        res.status(500).send('An error has occurred');
    }
}

const updateBuilding = async(req, res) => {
    const id = req.params.id;
    const { name, floors, latitude, longitude } = req.body;
    try {
        await updateBuildingDB(id, name, floors, latitude, longitude);
        res.status(200).json({
            message: 'Building updated successfully',
            building: {
                name, floors, latitude, longitude
            }
        });
    } catch(err) {
        res.status(500).send('An error has occurred');
    }
    
}

const deleteBuilding = async (req, res) => {
    const id = req.params.id;
    try {
        await deleteCoordinatesFromBuildingBD(id);
        await deleteBuildingDB(id);
        res.status(200).send('Building deleted successfully');
    } catch(err) {
        res.status(500).send('An error has occurred');
    }
    
}

module.exports = {
    getBuildings,
    updateBuilding,
    createBuilding,
    deleteBuilding
}