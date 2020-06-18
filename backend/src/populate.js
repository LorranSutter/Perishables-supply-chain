require('dotenv').config();

const Web3 = require('web3');
const async = require('async');
const crypto = require('crypto');
const mongoose = require('mongoose');

const InitiateMongoServer = require('./db/connection');
const mongoURI = process.env.MONGODB_URI_DEV;

// InitiateMongoServer(mongoURI, true);

const randomGenerator = require('./utils/randomGenerator');
const Distributor = require('./models/distributor');

const addressJSON = require('../../smart_contract/build/SupplyChainAddress.json');
const contractJSON = require('../../smart_contract/build/contracts/SupplyChain.json');

const CONTRACT_ADDRESS = addressJSON.address;
const CONTRACT_ABI = contractJSON.abi;

let web3;
let accounts;
let contract;

let admin;
let manufacturer;
let transporter1;
let transporter2;
let distributor;

const addressZero = "0x0000000000000000000000000000000000000000";
const MANUFACTURER_ROLE = "0xeefb95e842a3287179d933b4460be539a1d5af11aa8b325bb45c5c8dc92de4ed";
const TRANSPORT_ROLE = "0xb82a77b83aa57abb9bcfbacbdfb3201de26ecd2b35d0d6cf6c3b9bb2cb7026c4";
const DISTRIBUTOR_ROLE = "0xfbd454f36a7e1a388bd6fc3ab10d434aa4578f811acbbcf33afb1c697486313c";

async function init() {

    web3 = new Web3(process.env.BLOCKCHAIN_EMULATOR_URI);
    accounts = await web3.eth.getAccounts();
    contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS, { from: accounts[0] });

    admin = accounts[0];
    manufacturer = accounts[1];
    transporter1 = accounts[2];
    transporter2 = accounts[3];
    distributor = accounts[4];
}

function populateRoles(cb) {
    async.parallel([
        (cb) => {
            contract.methods
                .addManufacturer(manufacturer)
                .send({ from: admin })
                .then(() => {
                    console.log(`Added manufacturer: ${manufacturer}`);
                    cb();
                })
                .catch(err => {
                    console.log('Ooppss...', err);
                    cb();
                })
        },
        (cb) => {
            contract.methods
                .addTransporter(transporter1)
                .send({ from: admin })
                .then(() => {
                    console.log(`Added transporter: ${transporter1}`);
                    cb();
                })
                .catch(err => {
                    console.log('Ooppss...', err);
                    cb();
                })
        },
        (cb) => {
            contract.methods
                .addDistributor(distributor)
                .send({ from: admin })
                .then(() => {
                    console.log(`Added distributor: ${distributor}`);
                    cb();
                })
                .catch(err => {
                    console.log('Ooppss...', err);
                    cb();
                })
        }
    ], cb)
}

function populateBatteries(cb) {
    async.series([
        (cb) => {
            contract.methods
                .makeBattery(
                    randomGenerator.randomString(10),
                    crypto.randomBytes(6),
                    randomGenerator.randomNumber(10, 20),
                    crypto.randomBytes(25)
                )
                .send({ from: manufacturer })
                .then(() => {
                    console.log('Battery added');
                    cb();
                })
                .catch(err => {
                    console.log('OOppss...', err);
                    cb();
                })
        },
        (cb) => {
            contract.methods
                .makeBattery(
                    randomGenerator.randomString(10),
                    crypto.randomBytes(6),
                    randomGenerator.randomNumber(10, 20),
                    crypto.randomBytes(25)
                )
                .send({ from: manufacturer })
                .then(() => {
                    console.log('Battery added')
                    cb();
                })
                .catch(err => {
                    console.log('OOppss...', err);
                    cb();
                })
        },
        (cb) => {
            contract.methods
                .makeBattery(
                    randomGenerator.randomString(10),
                    crypto.randomBytes(6),
                    randomGenerator.randomNumber(10, 20),
                    crypto.randomBytes(25)
                )
                .send({ from: manufacturer })
                .then(() => {
                    console.log('Battery added')
                    cb();
                })
                .catch(err => {
                    console.log('OOppss...', err);
                    cb();
                })
        }
    ], cb)
}

function a() {
    contract.methods
        .addManufacturer(manufacturer)
        .send({ from: admin })
        .then(() => {
            console.log('Success function');
        })
        .catch(err => {
            console.log('OOppss...', err);
        })
}

// const numDistributors = 10;

// let distributors = []

// function distributorCreate({ name, password, address }, cb) {
//     const newDistributor = new Distributor({ name, password, address });

//     newDistributor.save(function (err) {
//         if (err) {
//             cb(err, null)
//             return
//         }
//         console.log('New distributor: ' + newDistributor.name);
//         distributors.push(newDistributor)
//         cb(null, newDistributor)
//     });
// }

// function populateDistributors(cb) {
//     let distributorArray = []
//     for (let i = 0; i < numDistributors; i++) {
//         distributorArray.push(cb => distributorCreate(randomGenerator.newDistributor(), cb));
//     }

//     async.parallel(distributorArray, cb);
// }

// function deleteDatabse(cb) {
//     console.log('Deleting database');
//     mongoose.connection.dropDatabase();
//     console.log('Detabase deleted');
//     cb();
// }

// async.series([
//     deleteDatabse
//     // populateDistributors
// ],
//     function (err) {
//         if (err) {
//             console.log('FINAL ERR: ' + err);
//         }
//         else {
//             console.log('Distributors: ' + distributors.length);
//         }

//         mongoose.connection.close();
//     });

async.series([
    init,
    populateRoles,
    populateBatteries
],
    function (err) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('Success');
        }
    });