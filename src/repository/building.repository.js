const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    // database: process.env.BD_DATABASE,
    database: process.env.BD_DATABASE_TESTING,
    port: process.env.BD_PORT
});

const getAllBuildingsDB = async () => {
    try {
        const response = await pool.query(
            'SELECT * FROM building ORDER BY id ASC');
        return response.rows;
    } catch(err) {
        throw err;
    }
   
}

const createNewBuildingDB = async (name, floors, latitude, longitude) => {
    try {
        await pool.query(
            'INSERT INTO building (name, floors, latitude, longitude) VALUES ($1, $2, $3, $4)',
            [name, floors, latitude, longitude]);
        return;
    } catch(err) {
        throw err;
    }
    
}

const updateBuildingDB = async (id, name, floors, latitude, longitude) => {
    try {
        await pool.query(
            'UPDATE building SET name = $1, floors = $2, latitude = $3, longitude = $4 WHERE id = $5',
            [
                name,
                floors,
                latitude,
                longitude,
                id
            ]);
        return;
    } catch(err) {
        throw err;
    }
}

const deleteBuildingDB = async (id) => {
    try {
        await pool.query('DELETE FROM building WHERE id = $1', [id]);
    } catch(err) {
        throw err;
    }
}

module.exports = {
    getAllBuildingsDB,
    createNewBuildingDB,
    updateBuildingDB,
    deleteBuildingDB
}