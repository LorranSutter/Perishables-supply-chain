const app = require('./app');

const InitiateMongoServer = require('./db/connection');

const { dev } = require('./config/dbURL.json');
const mongoURI = process.env.MONGODB_URI || dev;

InitiateMongoServer(mongoURI);

app.listen(5000);