const Event = require('../models/event_register_model');
const mongoose = require('mongoose')

//Add new event
const addEventUser = async (req, res) => {
    try {
        //add new event
        const newEvent = new Event({
            name: req.body.name,
            nic_No: req.body.nic_No,
            email: req.body.email,
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

module.exports = {
    addEventUser,
    getAllEvent,
    updateEvent,
    deleteEvent,
};
