const express = require('express');
const router = express.Router();

const { addEventUser, getAllEvent, updateEvent, deleteEvent } = require('../controllers/event_register_controller');

router.post("/add-event-user", addEventUser);
router.get("/getAll", getAllEvent);
router.put("/update/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);

module.exports = router;