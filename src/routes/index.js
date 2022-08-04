const { Router } = require('express');
const router = Router();
const { getCoordinates, getCoordinateById,
        createCoordinate, updateCoordinate,
        deleteCoordinate } = require('../controllers/coordinates.controller');
const { getBuildings, updateBuilding, createBuilding, deleteBuilding } = require('../controllers/building.controller');

router.get('/coordinates', getCoordinates);
router.get('/coordinates/:id', getCoordinateById);
router.post('/coordinates', createCoordinate);
router.put('/coordinates/:id', updateCoordinate);
router.delete('/coordinates/:id', deleteCoordinate);

router.get('/buildings', getBuildings);
router.post('/buildings', createBuilding);
router.put('/buildings/:id', updateBuilding);
router.delete('/buildings/:id', deleteBuilding);

module.exports = router;