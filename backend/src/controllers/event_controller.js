const Event = require('../models/event_modal');
const mongoose = require('mongoose');
const express = require('express');

//Add new event
const addEvent = async (req, res) => {
    try {
        //add new event
        const newEvent = new Event({
            eventNo: req.body.eventNo,
            eventName: req.body.eventName,
            eventPlace: req.body.eventPlace,
            eventDetails: req.body.eventDetails,
            eventDate: req.body.eventDate,
            eventStatus: req.body.eventStatus,
        });
        //save
        const saveEvent = await newEvent.save();
        res.status(200).json(saveEvent);
    } catch (e) {
        console.log(e);
        return res.status(501).json(e.message);
    }
}

//GET all event details
const getAllEvent = async (req, res) => {
    Event.find({})
    .then((Event) => {
        res.status(200).json({ Event });
    })
    .catch((error) => {
        res.status(401).json(error.message);
});
}

//Update event
const updateEvent = async (req, res) => {
    Event.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    })
        .then((Claim) => {
            res.status(200).json({ Claim });
        })
        .catch((error) => {
            res.status(501).json(error.message);
        });
}

//Delete event
const deleteEvent = async (req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then((Event) => {
            res.status(200).json({ Event });
        })
        .catch((error) => {
            res.status(501).json(error.message);
        });
}

//FIND specific detail
const getSpecific = async (req, res) => {
    let eventId = req.params.id;
    const user = await Event.findById(eventId)
        .then((Event) => {
            res.status(200).send({ Event });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ error: err.message });
        });
};

const statusUpdate  = async (req, res) => {
    Event.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    })
        .then((Event) => {
            res.status(200).json({ Event });
        })
        .catch((error) => {
            res.status(501).json(error.message);
        });
};

// const registerdUpdate = async (req, res) => {
//     try {
//         let eventId = req.params.id;

//         // Find the event with the specified ID
//         const event = await Event.findById(eventId);;

//         if (!event) {
//             return res.status(404).send({ message: 'Event not found' });
//         }

//         // Extract the new registered entities from the request body
//         const { registeredEntities } = req.body;

//         // Add the new registered entities to the event
//         event.registeredEntities.push(...registeredEntities);

//         // Save the updated event to the database
//         await event.save();

//         res.send({ message: 'Registered entities added to event' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({ message: 'Server error' });
//     }
// };

async function registerdUpdate(req, res) {
    try {
        const eventId = req.params.id;
        const registeredEntity = req.body;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).send("Event not found");
        }
        if (!Array.isArray(event.registeredEntities)) {
            event.registeredEntities = [];
        }
        event.registeredEntities.push(registeredEntity);
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

const countID = async (req, res) => {
    try {
        let id = req.params.id;
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        let count = event.registeredEntities.length;
        res.json({ count: count, id: id });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


const deleteRegistered = async (req, res) => {
    try {
        let eventId = req.params.eventId;
        let entityId = req.params.entityId;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).send("Event not found");
        }
        const entity = event.registeredEntities.id(entityId);
        if (!entity) {
            return res.status(404).send("Registered entity not found");
        }
        event.registeredEntities.pull(entity);
        await event.save();
        res.send("Registered entity deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }


}

module.exports = {
    addEvent,
    getAllEvent,
    updateEvent,
    deleteEvent,
    getSpecific,
    statusUpdate,
    registerdUpdate,
    countID,
    deleteRegistered,
};
