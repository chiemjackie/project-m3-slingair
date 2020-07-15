'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { flights } = require('./test-data/flightSeating');

const renderSeatSelect = (req, res) => {
    res.status(200).render('./public/seat-select/index.html')
}

const renderConfirmedPage = (req, res) => {
    res.status(200).render('./public/confirmed/index.html')
}

const renderReservation = (req, res) => {
    res.status(200).render('./public/view-reservation/index.html')
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

    .get('/seat-select', renderSeatSelect)
    .get('/confirmed', renderConfirmedPage)
    .get('/view-reservation', renderReservation)

    .use((req, res) => res.send('Not Found'))
    .listen(8000, () => console.log(`Listening on port 8000`));