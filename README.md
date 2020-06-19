# Perishables supply chain

<!-- [Flow chart](https://whimsical.com/N1irbVcNY3NVmQjospMB6d) -->

<p align="center">
  
<img src='https://res.cloudinary.com/lorransutter/image/upload/v1592088320/Perishables_supply_chain/Perishables_architecture.png' height=500/>

</p>

<p align="center">
  
<img src='https://res.cloudinary.com/lorransutter/image/upload/v1592088014/Perishables_supply_chain/Flow_chart.png'/>

</p>

## :runner: How to run

Open your terminal in the folder you want to clone the project

```sh
# Clone this repo
git clone https://github.com/LorranSutter/Perishables-supply-chain.git

# Go to the project folder
cd Perishables-supply-chain
```

To run the application you are will need to set your own configurations of *port*, *database*, *private key* and *blockchain emulator uri*. Create the following .env file in the indicated path and format with your customized configurations:

```json
// ./backend/.env

PORT=5000
MONGODB_URI_DEV="YOUR_DEV_MONGO_URI"
MONGODB_URI_TEST="YOUR_TEST_MONGO_URI"
PRIVATE_KEY="YOUR_STRONG_PRIVATE_KEY"
BLOCKCHAIN_EMULATOR_URI="http://127.0.0.1:9545/"
```

Now you will need two opened terminals to run the project. One for truffle to simulate the EVM and another one for the server.

Truffle will run on http://127.0.0.1:9545/

Server will run on http://localhost:5000/

```sh
## In the first terminal ##

# Go to smart contract folder
cd smart_contract

# Init truffle
truffle develop

# Run migrations
migrate
```

The previous command will generate a new ABI and write contract address in a JSON file. You do not have to worry about importing these info in the backend though. Also you may change the smart contract and run migrations again to see your changes.

If you change your contract, you will have to run migrations again. Just type the following command:

```sh
# Run migrations again
migrate --reset
```

Install backend dependencies and run the project:

```sh
## In the another terminal ##

# Go to backend application
cd backend

# Install dependencies
npm install

# Run the project
npm run start

# Or to use nodemon
npm run dev
```

### :syringe: Tests

Both Smart Contract and backend application have its own tests suite. To run the tests execute the following commands.

```sh
# Smart Contracts folder
cd smart_contracts

# Run tests
truffle test

# Backend folder
cd backend

# Run tests
npm run test
```

## :book: Resources and technologies :computer:

1. Smart Contract

   - [Solidity](https://solidity.readthedocs.io/) - smart contract programming language
   - [Truffle](https://www.trufflesuite.com/) - dApp environment
   - [Ethereumjs-util](https://www.npmjs.com/package/ethereumjs-util) - utility functions for Ethereum
   - [Truffle-assertions](https://www.npmjs.com/package/truffle-assertions) - additional assertions for truffle
   - [Bignumber.js](https://www.npmjs.com/package/bignumber.js) - library to handle big numbers

2. Backend

   - [Express.js](http://expressjs.com/) - web application framework
   - [MongoDB](https://www.mongodb.com/) - NoSQL database
   - [Mongoose](https://mongoosejs.com/) - object data modeling (ODM) library for MongoDB and Node.js
   - [Async](https://caolan.github.io/async/v3/) - library to perform asynchronous operations
   - [Express validator](https://express-validator.github.io/docs/) - middleware to validate data
   - [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - library to perform cryptography
   - [JWT.IO](https://jwt.io/) - JSON Web Tokens to allow, decode, verify and generate JWT
   - [Jest](https://jestjs.io/) - library for tests
   - [Web3.js](https://web3js.readthedocs.io/) - interact with smart contracts
   - [Dotenv](https://www.npmjs.com/package/dotenv) - loads environment variables from a .env file

3. Frontend
   - [Rimble](https://rimble.consensys.design/) - design system
   - [ReactJS](https://reactjs.org/) - frontend library
   - [Axios](https://www.npmjs.com/package/axios) - HTTP requests