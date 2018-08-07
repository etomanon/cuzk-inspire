const router = require('express').Router();

const checkToken = require('../middleware/checkToken');

const adminUnitController = require('../controllers/buildingsController');

router.post('/get', checkToken, adminUnitController.adminUnitsAllPost);

module.exports = router;