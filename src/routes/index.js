const { Router } = require('express');
const router = Router();

// Import coordinates controller
const { getCoordinates, createCoordinate } = require('../controllers/coordinates.controller');
// Import buildings controller
const { getBuildings, updateBuilding, createBuilding, deleteBuilding } = require('../controllers/building.controller');

// Coordinates
router.get('/coordinates', getCoordinates);
router.post('/coordinates', createCoordinate);

// Buildings
router.get('/buildings', getBuildings);
router.post('/buildings', createBuilding);
router.put('/buildings/:id', updateBuilding);
router.delete('/buildings/:id', deleteBuilding);

module.exports = router;