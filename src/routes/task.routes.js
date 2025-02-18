const express = require('express');
const router = express.Router();
const taskcontroller= require("../controllers/task.controller");
const { authenticateToken } = require('../middlewares/validateuser');

router.post("/taskcreate",authenticateToken,taskcontroller.createTask);

router.post("/taskupdate/:id",authenticateToken,taskcontroller.updateTaskStatus)

router.get("/getalltasks",authenticateToken,taskcontroller.getTasks)

router.delete("/deletetask/:id",authenticateToken,taskcontroller.deleteTask)


module.exports = router;
