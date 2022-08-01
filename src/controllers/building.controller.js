const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'zA32fpSfocAzPxut1wUW',
    database: 'geodatabase',
    port: '5432'
});

const getBuildings = async (req, res) => {
    const response = await pool.query('SELECT * FROM building');
    res.status(200).json(response.rows);
}

const updateBuilding = async(req, res) => {
    console.log('Received updateBuilding request');
    const id = req.params.id;
    const { name, latitude, longitude } = req.body;
    const response = await pool.query('UPDATE building SET name = $1, latitude = $2, longitude = $3 WHERE id = $4',[
        name,
        latitude,
        longitude,
        id
    ]);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send('Building updated successfully');
}

module.exports = {
    getBuildings,
    updateBuilding
}