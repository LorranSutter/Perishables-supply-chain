const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Distributor = require('../models/distributor');
const { privateKey } = require('../config/privateKey.json');

exports.index = (req, res, next) => {

    Distributor
        .find()
        .sort([['address', 'ascending'], ['name']])
        .exec(function (err, distributors) {
            if (err) { return next(err); }
            res.json(distributors);
        });
}

exports.create_distributor = (req, res, next) => {

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
        res.status(401).json({ message: 'Invalid name/password' });
    }

    const distributor = await Distributor.findOne({ name });
    if (!distributor) {
        res.status(401).json({ message: 'Invalid name' });
    }

    const isMatch = await bcrypt.compare(password, distributor.password);
    if (!isMatch) {
        res.status(401).json({ message: 'Invalid password' });
    }

    const distributorJWT = jwt.sign({ name }, privateKey, { algorithm: 'HS256' });

    res.status(200).json({ distributorJWT });
}