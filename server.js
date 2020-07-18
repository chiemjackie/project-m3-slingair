'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { flights } = require('./test-data/flightSeating');
const { reservations } = require('./test-data/reservations');
let currentReservation = 0;

const handleSeatSelect = (req, res) => {
    res.status(200).render('./public/seat-select/index.html');
}

const handleConfirmedPage = (req, res) => {
    res.status(200).render('./public/confirmed/index.html');
}

const handleConfirmInfo = (req, res) => {
    let flightInfo = {};
    for (let i = 0; i < reservations.length; i++) {
        if (reservations[i].id === currentReservation) {
            flightInfo = reservations[i];
        }
    }
    res.json({flightInfo});
}

const handleViewReservation = (req, res) => {
    res.status(200).render('./public/view-reservation/index.html');
}

const handleFourOhFour = (req, res) => {
    res.render("Look, I don't know where you're trying to go, but you're in the wrong place.");
}

const handleGetSeats = (req, res) => {
    const flight = flights[req.params.flightNumber];
    res.status(200).json({flight, status: 200});
}

const postNewReservation = (req, res) => {
    reservations.push(req.body);
    currentReservation = req.body.id;
}

express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
	.use(morgan('dev'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))
    
    // endpoints
    .get('/flights/:flightNumber', handleGetSeats)
    .get('/seat-select', handleSeatSelect)
    .get('/confirmed', handleConfirmedPage)
    .get('/confirmed/current', handleConfirmInfo)
    .get('/view-reservation', handleViewReservation)
    .get('*', handleFourOhFour)

    .post('/new-reservation/:id', postNewReservation)

    .use((req, res) => res.send('Not Found'))
    .listen(8000, () => console.log(`Listening on port 8000`));