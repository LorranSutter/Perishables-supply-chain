# Perishables supply chain

<!-- [Flow chart](https://whimsical.com/N1irbVcNY3NVmQjospMB6d) -->

<p align="center">
  
<img src='https://res.cloudinary.com/lorransutter/image/upload/v1592088320/Perishables_supply_chain/Perishables_architecture.png' height=500/>

</p>

<p align="center">
  
<img src='https://res.cloudinary.com/lorransutter/image/upload/v1592088014/Perishables_supply_chain/Flow_chart.png' height=500/>

</p>

## :runner: How to run

To run the application you are will need to set your own configurations of database and private key. Create the following JSON files in the indicated path and format with your customized configurations:

```json
// ./backend/src/config/dbURL.json
{
    "dev": "YOUR_DEV_MONGO_URI",
    "test": "YOUR_TEST_MONGO_URI"
}
```

```json
// ./backend/src/config/privateKey.json
{
    "privateKey": "YOUR_STRONG_PRIVATE_KEY"
}
```

Also, to establish a connection to smart contracts, we will need ABI and contract address. Create the following files in the indicated path and format:

```json
// ./backend/src/config/Contract.json
{
    "abi": ["ABI_CODE"]
}
```

```json
// ./backend/src/config/ContractAddress.json
{
    "address": "YOUR_CONTRACT_ADDRESS"
}
```

<!-- ## :book: Resources -->

## :computer: Technologies

1. Smart Contract

   - [Solidity](https://solidity.readthedocs.io/) - smart contract programming language
   - [Truffle](https://www.trufflesuite.com/) - dApp environment

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
   - [Ethereumjs-util](https://www.npmjs.com/package/ethereumjs-util) - utility functions for Ethereum

3. Frontend
   - [Rimble](https://rimble.consensys.design/) - design system
   - [ReactJS](https://reactjs.org/) - frontend library
   - [Axios](https://www.npmjs.com/package/axios) - HTTP requests
