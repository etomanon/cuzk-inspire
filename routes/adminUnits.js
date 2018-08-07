const router = require('express').Router();

const checkAdmin = require('../middleware/checkAdmin');
const checkToken = require('../middleware/checkToken');

const adminUnitController = require('../controllers/adminUnitsController');

// router.get('/', checkToken, adminUnitController.adminUnitsIndexGet);

router.post('/', checkAdmin, adminUnitController.adminUnitsIndexPost);

router.post('/codes', checkAdmin, adminUnitController.adminUnitsCodesPost);

router.get('/:name', checkToken, adminUnitController.adminUnitsNameGet);

router.get('/town/:name', checkToken, adminUnitController.adminUnitsNameTownGet);

router.post('/get', checkToken, adminUnitController.adminUnitsAllPost);

router.post('/cze', checkToken, adminUnitController.adminUnitsCzePost);

router.post('/list', checkToken, adminUnitController.adminUnitsListPost);

module.exports = router;