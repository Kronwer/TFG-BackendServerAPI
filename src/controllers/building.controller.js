const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'tfg',
    port: '5432'
});

const getBuildings = async (req, res) => {
    const response = await pool.query('SELECT * FROM building ORDER BY id ASC');
    res.status(200).json(response.rows);
}

const createBuilding = async (req, res) => {
    const { name, floors, latitude, longitude } = req.body;
    await pool.query('INSERT INTO building (name, floors, latitude, longitude) VALUES ($1, $2, $3, $4)', [name, floors, latitude, longitude]);
    res.status(200).json({
        message: 'Building Added Suuccesfully',
        body: {
            building: { name, floors, latitude, longitude }
        }
    });
}

const updateBuilding = async(req, res) => {
    console.log('Received updateBuilding request');
    const id = req.params.id;
    const { name, floors, latitude, longitude } = req.body;
    const response = await pool.query('UPDATE building SET name = $1, floors = $2, latitude = $3, longitude = $4 WHERE id = $5',[
        name,
        floors,
        latitude,
        longitude,
        id
    ]);
    res.status(200).send('Building updated successfully');
}

const deleteBuilding = async (req, res) => {
    const id = req.params.id;
    await pool.query('DELETE FROM coordinate WHERE building = $1', [id]);
    await pool.query('DELETE FROM building WHERE id = $1', [id]);
    res.json(`Building ${id} deleted successfully`);
}

module.exports = {
    getBuildings,
    updateBuilding,
    createBuilding,
    deleteBuilding
}