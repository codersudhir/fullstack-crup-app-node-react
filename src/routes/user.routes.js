const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { checkidparams } = require('../middlewares/idparamscheck');
const { authenticateToken } = require('../middlewares/validateuser');
const { upload } = require('../middlewares/multer.middleware');
const { moderatercheck } = require('../middlewares/modertor.middleware');


router.post('/create', userController.createUser);

router.post("/login",userController.loginuser)


// Define other routes (GET, PUT, DELETE) similarly

module.exports = router;
