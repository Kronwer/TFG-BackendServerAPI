const { Pool } = require('pg');

// Avoid timedate getting converted to Date
const pg = require('pg');
var types = pg.types;
    types.setTypeParser(1114, function(stringValue) {
    return stringValue;
});

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'tfg',
    port: '5432'
});

const getCoordinates = async (req, res) => {
    const building = req.query.building;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const response = await pool.query('SELECT * FROM coordinate WHERE building = $1 AND timestamp >= $2 AND timestamp < $3', [building, startDate, endDate]);
    res.status(200).json(response.rows);
}

const createCoordinate = async (req, res) => {
    const { building, latitude, longitude, timestamp, floorNumber } = req.body;
    if ((latitude >= -90 &&  latitude <= 90) && (longitude >= -180 && longitude <= 180)) {
        try {
            await pool.query('INSERT INTO coordinate (building, latitude, longitude, timestamp, floorNumber) VALUES ($1, $2, $3, $4, $5)', [building, latitude, longitude, timestamp, floorNumber]);
            res.json({
                message: 'Coordinate Added Succesfully',
                body: {
                    coordinate: { building, latitude, longitude, timestamp, floorNumber }
            }
        })
        } catch(err) {
            res.status(500).send(`Couldn't create coordinate, please check the attributes are correct`);
            console.error('Error while creating a new coordinate');
        }
    } else {
        res.status(400).send('Invalid values for latitude and longitude, please check');
        console.error('Invalid range of values for latitude and longitude');
    }
    
}

module.exports = {
    getCoordinates,
    createCoordinate
}