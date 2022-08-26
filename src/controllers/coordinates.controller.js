const { getCoordinatesDB, createNewCoordinateDB } = require('../repository/coordinate.repository');

const getCoordinates = async (req, res) => {
    const building = req.query.building;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const response = await getCoordinatesDB(building, startDate, endDate);
    res.status(200).json(response);
}

const createCoordinate = async (req, res) => {
    const { building, floornumber, latitude, longitude, timestamp } = req.body;
    if ((latitude >= -90 &&  latitude <= 90) && (longitude >= -180 && longitude <= 180)) {
        try {
            await createNewCoordinateDB(building, floornumber, latitude, longitude, timestamp);
            res.json({
                message: 'Coordinate added succesfully',
                body: {
                    coordinate: { building, latitude, longitude, timestamp, floornumber }
            }
        })
        } catch(err) {
            console.error(err);
            res.status(500).send(`Couldn't create coordinate, please check the attributes are correct`);
        }
    } else {
        res.status(400).send('Invalid values for latitude and longitude');
    }
    
}

module.exports = {
    getCoordinates,
    createCoordinate
}