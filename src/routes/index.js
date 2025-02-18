const express = require('express');
const router = express.Router();

// Routes
const userRoutes = require('./user.routes');
const taskroutes =require("../routes/task.routes")


router.use('/api/users', userRoutes);
router.use("/api/v1/tasks",taskroutes);

router.use('/uploads', express.static('uploads'));


module.exports = router;