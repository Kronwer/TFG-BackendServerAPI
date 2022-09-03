const { Pool } = require('pg');
require('dotenv').config();

// Avoid timedate getting converted to Date
const pg = require('pg');
var types = pg.types;
    types.setTypeParser(1114, function(stringValue) {
    return stringValue;
});

const pool = new Pool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE,
    // database: process.env.BD_DATABASE_TESTING,
    port: process.env.BD_PORT
});

const getCoordinatesDB = async (building, startDate, endDate) => {
    try {
        const response = await pool.query(
            'SELECT * FROM coordinate WHERE building = $1 AND timestamp >= $2 AND timestamp < $3',
            [building, startDate, endDate]
        );
        return response.rows;
    } catch(err) {
        throw err;
    }
}

const createNewCoordinateDB = async (building, floornumber, latitude, longitude, timestamp) => {
    try {
        await pool.query(
            'INSERT INTO coordinate (building, floornumber, latitude, longitude, timestamp) VALUES ($1, $2, $3, $4, $5)',
            [building, floornumber, latitude, longitude, timestamp]
        );
        return;
    } catch(err) {
        throw err;
    }
}

const deleteCoordinatesFromBuildingBD = async (id) => {
    try {
        await pool.query(
            'DELETE FROM coordinate WHERE building = $1',
            [id]
        );
    } catch(err) {
        throw err;
    }
}

module.exports = {
    getCoordinatesDB,
    createNewCoordinateDB,
    deleteCoordinatesFromBuildingBD
}