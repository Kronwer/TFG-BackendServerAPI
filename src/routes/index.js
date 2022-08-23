const { Router } = require('express');
const router = Router();
const { getCoordinates, createCoordinate } = require('../controllers/coordinates.controller');
const { getBuildings, updateBuilding, createBuilding, deleteBuilding } = require('../controllers/building.controller');

router.get('/coordinates', getCoordinates);
router.post('/coordinates', createCoordinate);

router.get('/buildings', getBuildings);
router.post('/buildings', createBuilding);
router.put('/buildings/:id', updateBuilding);
router.delete('/buildings/:id', deleteBuilding);

module.exports = router;