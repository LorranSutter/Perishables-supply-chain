const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const web3 = require('web3');

const Distributor = require('../models/distributor');
const connectionWeb3 = require('../connectionWeb3');

exports.index = (req, res, next) => {

    Distributor
        .find()
        .sort([['address', 'ascending'], ['name']])
        .exec(function (err, distributors) {
            if (err) { return next(err); }
            res.json(distributors);
        });
}

exports.create = (req, res, next) => {

    const distributor = new Distributor(
        {
            name: req.body.name,
            password: req.body.password,
            address: req.body.address,
            registration_date: req.body.registration_date
        });

    distributor.save(function (err, doc) {
        if (err) { return next(err); }
        res.status(201).json({ id: doc.id, message: `Distributor ${doc.name} created successfully` });
    });
}

exports.login = async (req, res) => {

    const name = req.body.name;
    const password = req.body.password;

    if (!name || !password) {
        return res.status(401).json({ message: 'Invalid name/password' });
    }

    const distributor = await Distributor.findOne({ name });
    if (!distributor) {
        return res.status(401).json({ message: 'Invalid name' });
    }

    const isMatch = await bcrypt.compare(password, distributor.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const distributorJWT = jwt.sign({ name }, process.env.PRIVATE_KEY, { algorithm: 'HS256' });

    res.status(200).json({ distributorJWT });
}

exports.batteryCurrentConditions = (req, res, next) => {
    connectionWeb3
        .getBatteryCurrentConditions(req.body.token)
        .then((conditions) => {
            console.log(conditions)
            res.json(web3.utils.toAscii(bytes));
        })
        .catch(err => {
            return next(err);
        });
}

exports.batteryCurrentLocation = (req, res, next) => {
    connectionWeb3
        .getBatteryCurrentLocation(req.body.token)
        .then((location) => {
            console.log(location)
            //web3.utils.toAscii(bytes)
            res.json(location);
        })
        .catch(err => {
            return next(err);
        });
}

exports.batteryCurrentHolder = (req, res, next) => {
    connectionWeb3
        .getBatteryCurrentHolder(req.body.token)
        .then((holder) => {
            console.log(holder)
            res.json(holder);
        })
        .catch(err => {
            return next(err);
        });
}