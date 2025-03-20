const express = require('express');
const router = express.Router();

const { addEvent, getAllEvent, updateEvent, deleteEvent, getSpecific, statusUpdate, registerdUpdate, countID, deleteRegistered } = require('../controllers/event_controller');

router.post("/addevent", addEvent);
router.get("/getAll", getAllEvent);
router.put("/update/:id", updateEvent);
router.get("/get/:id", getSpecific);
router.delete("/delete/:id", deleteEvent);
router.patch("/update/:id", statusUpdate);
router.get("/:id/registered-entities-count", countID);
router.post('/:id/registered-entities', registerdUpdate);
router.delete("/:eventId/registeredEntityId/:entityId", deleteRegistered);

module.exports = router;