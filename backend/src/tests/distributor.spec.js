const app = require('../app');
const randomGenerator = require('./randomGenerator');

const Distributor = require('../models/distributor');

const supertest = require('supertest')
const request = supertest(app);

const mongoose = require('mongoose');
const InitiateMongoServer = require('../db/connection');
const { test } = require('../config/dbURL.json');
const mongoURI = process.env.MONGODB_URI || test;

describe('Distributor', () => {

    beforeAll(async () => {
        InitiateMongoServer(mongoURI);
        await mongoose.connection.dropDatabase();
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it('Should create a new distributor', (done) => {
        const newDistributor = randomGenerator.newDistributor();

        request
            .post('/distributors/new')
            .send(newDistributor)
            .end(function (err, res) {
                if (err) { return done(err); }

                expect(res.status).toBe(201);
                expect(res.body.id).toMatch(/[\d\w]{24}/);
                expect(res.body.message).toBe(`Distributor ${newDistributor.name} created successfully`);

                done();
            });
    });

    it('Should list all distributors', async (done) => {
        const newDistributor1 = new Distributor(randomGenerator.newDistributor());
        const newDistributor2 = new Distributor(randomGenerator.newDistributor());
        const newDistributor3 = new Distributor(randomGenerator.newDistributor());

        const saved1 = await newDistributor1.save();
        const saved2 = await newDistributor2.save();
        const saved3 = await newDistributor3.save();

        request
            .get('/distributors')
            .end(function (err, res) {
                if (err) { return done(err); }

                expect(res.status).toBe(200);
                expect(res.body.length).toBeGreaterThanOrEqual(3);

                expect(res.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            _id: saved1.id,
                            name: saved1.name,
                            password: saved1.password,
                            address: saved1.address
                        }),
                        expect.objectContaining({
                            _id: saved2.id,
                            name: saved2.name,
                            password: saved2.password,
                            address: saved2.address
                        }),
                        expect.objectContaining({
                            _id: saved3.id,
                            name: saved3.name,
                            password: saved3.password,
                            address: saved3.address
                        })
                    ])
                );

                done();
            });
    });

    it('Should to login', async (done) => {
        const newDistributor = new Distributor(randomGenerator.newDistributor());

        await new Distributor(newDistributor).save();

        request
            .post('/distributors/login')
            .send({ name: newDistributor.name, password: newDistributor.password })
            .end(function (err, res) {
                if (err) { return done(err); }

                expect(res.status).toBe(200);
                expect(res.body.distributorJWT).toMatch(/^[\d\w-_=]+\.[\d\w-_=]+\.?[\d\w-_.+\/=]*$/);

                done();
            });
    });
});