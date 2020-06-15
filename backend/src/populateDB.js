require('dotenv').config();

const async = require('async');
const InitiateMongoServer = require('./db/connection');

const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI_DEV;

InitiateMongoServer(mongoURI, true);

const randomGenerator = require('./utils/randomGenerator');
const Distributor = require('./models/distributor');

const numDistributors = 10;

let distributors = []

function distributorCreate({ name, password, address }, cb) {
    const newDistributor = new Distributor({ name, password, address });

    newDistributor.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New distributor: ' + newDistributor.name);
        distributors.push(newDistributor)
        cb(null, newDistributor)
    });
}

function populateDistributors(cb) {
    let distributorArray = []
    for (let i = 0; i < numDistributors; i++) {
        distributorArray.push(cb => distributorCreate(randomGenerator.newDistributor(), cb));
    }

    async.parallel(distributorArray, cb);
}

function deleteDatabse(cb) {
    console.log('Deleting database');
    mongoose.connection.dropDatabase();
    console.log('Detabase deleted');
    cb();
}

async.series([
    deleteDatabse,
    populateDistributors
],
    function (err) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('Distributors: ' + distributors.length);
        }

        mongoose.connection.close();
    });