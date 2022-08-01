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
    console.log('NEW QUERY');
    console.log('Building Id = ' + building);
    console.log('Start Date = ' + startDate);
    console.log('End Date = ' + endDate);
    // const response = await pool.query('SELECT * FROM coordinate WHERE timestamp >= $1 AND timestamp < $2', [startDate, endDate]);
    const response = await pool.query('SELECT * FROM coordinate');
    res.status(200).json(response.rows);
}

const getCoordinateById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM coordinate WHERE id = $1', [id]);
    res.json(response.rows.at(0));
}

const createCoordinate = async (req, res) => {
    const { latitude, longitude } = req.body;
    const response = await pool.query('INSERT INTO coordinate (latitude, longitude) VALUES ($1, $2)', [latitude, longitude]);
    res.json({
        message: 'Coordinate Added Succesfully',
        body: {
            coordinate: { latitude, longitude }
        }
    })
}

const updateCoordinate = async (req, res) => {
    const id = req.params.id;
    const { latitude, longitude } = req.body;
    const response = await pool.query('UPDATE coordinate SET latitude = $1, longitude = $2 WHERE id = $3',[
        latitude,
        longitude,
        id
    ]);
    res.send('Coordinate updated successfully');
}

const deleteCoordinate = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM coordinate WHERE id = $1', [id]);
    console.log(response);
    res.json(`Coordinate ${id} deleted suceessfully`);
}

module.exports = {
    getCoordinates,
    getCoordinateById,
    createCoordinate,
    updateCoordinate,
    deleteCoordinate
}