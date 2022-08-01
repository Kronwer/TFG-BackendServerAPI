const { Router } = require('express');
const router = Router();
const { getCoordinates, getCoordinateById,
        createCoordinate, updateCoordinate,
        deleteCoordinate } = require('../controllers/coordinates.controller');
const { getBuildings, updateBuilding } = require('../controllers/building.controller');

router.get('/coordinates', getCoordinates);
router.get('/coordinates/:id', getCoordinateById);
router.post('/coordinates', createCoordinate);
router.put('/coordinates/:id', updateCoordinate);
router.delete('/coordinates/:id', deleteCoordinate);

router.get('/building', getBuildings);
router.put('/building/:id', updateBuilding);

module.exports = router;