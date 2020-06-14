const Distributor = require('../models/distributor');

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
            address: req.body.address,
            registration_date: req.body.registration_date
        });

    distributor.save(function (err, doc) {
        if (err) { return next(err); }
        res.status(201).json({ id: doc.id, message: `Distributor ${doc.name} created successfully` });
    });
}