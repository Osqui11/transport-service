const { Router } = require('express');
const e = require('express');
const express = require('express');
const router = express.Router();

const MySQLConnection = require('../database/database')

router.get('/getUnityTransports', (req, res) => {
    MySQLConnection.query('SELECT * FROM transportunity', (err,rows,fields) => {
        if(!err){
            return res.json({rows});
        }else{
            console.log(err);
        }
    })
})

router.post('/getUnityTransportByID/:id', (req, res) => {
    MySQLConnection.query(`SELECT * FROM transportunity WHERE id = '${req.params.id}'`, (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})

router.post('/getUnityTransportByNumerRoute/:numberRoute', (req, res) => {
    MySQLConnection.query(`SELECT * FROM transportunity WHERE numberRoute = '${req.params.numberRoute}'`, (err, rows, fields) => {
        if(!err){
            var transprt_id, route_id, numberRoute, company, model, driverName, driverLastName, phone;
            rows.forEach(e => {
                transprt_id = e.id;
                route_id = e.route_id;
                numberRoute = e.numberRoute;
                company = e. company;
                model = e.model;
                driverName = e.driverName;
                driverLastName = e.driveLastName;
                phone = e.phone;
            });
            return res.status(200).send({
                'status':'success',transprt_id, route_id, route_id, numberRoute, company, model, driverName,driverLastName,phone
            });
        }else{
            return res.status(500).send({
                'status':'error'
            });
        }
    })
})

router.post('/getTransportUnityByRidANr/:Rid/:Nr', (req, res) => {
    const {Rid, Nr} = req.params;
    MySQLConnection.query(`SELECT * FROM transportunity WHERE transportunity.route_id = ${Rid} AND transportunity.numberRoute = ${Nr}`, [Rid,Nr], (err, rows, fields) => {
        if (!err) {
            var transprt_id, route_id, numberRoute, company, model, driverName, driverLastName, phone;
            rows.forEach(e => {
                transprt_id = e.id;
                route_id = e.route_id;
                numberRoute = e.numberRoute;
                company = e. company;
                model = e.model;
                driverName = e.driverName;
                driverLastName = e.driveLastName;
                phone = e.phone;
            });
            return res.status(200).send({
                'status':'success', transprt_id, route_id, route_id, numberRoute, company, model, driverName,driverLastName,phone
            });
        } else {
            return res.status(500).send({
                'status':'error'
            });
        }
    })
})

router.post('/addTransportUnity', (req, res) => {
    let route_id = req.body.route_id;
    let numberRoute = req.body.numberRoute;
    let company = req.body.company;
    let model = req.body.model;
    let driverName = req.body.driverName;
    let driverLastName = req.body.driveLastName;
    let phone = req.body.phone;
    MySQLConnection.query(`INSERT INTO transportunity (route_id, numberRoute, company, model, driverName, driverLastName, phone) VALUES (${MySQLConnection.escape(req.body.route_id)}, ${MySQLConnection.escape(req.body.numberRoute)}, ${MySQLConnection.escape(req.body.company)}, ${MySQLConnection.escape(req.body.model)}, ${MySQLConnection.escape(req.body.driverName)}, ${MySQLConnection.escape(req.body.driverLastName)}, ${MySQLConnection.escape(req.body.phone)});`, (err, rows, fields) => {
        if(!err){
            // res.json(rows);
            return res.status(200).json({
                'status':'success',
                'message':'Unidad de transprte guardada correctamente'
            })
        }else{
            console.log(err);
        }
    })
})

router.put('/updateTransportUnity/:id', (req, res) => {
    MySQLConnection.query(`UPDATE transportunity SET numberRoute = '${req.body.numberRoute}', company = '${req.body.company}', model = '${req.body.model}', driverName = '${req.body.driverName}', driverLastName = '${req.body.driverLastName}', phone = '${req.body.phone}' WHERE id = ${req.params.id}`, (err, rows, fields) => {
        if (!err) {
            res.status(200).json({ message: "User infos updated.", rows })
        } else {
            res.status(401).json({ message: "Error when updating user infos." })
        }
    })
})

router.delete('/deleteTransportUnity/:id', (req, res) => {
    MySQLConnection.query(`DELETE FROM transportunity WHERE id = '${req.params.id}'`, (err, rows, fields) => {
        if (!err) {
            res.status(200).json({ message: "Unidad de trasporte eliminada" })
        } else {
            res.status(401).json({ message: "Error when updating user infos." })
        }
    })
})

module.exports = router;

