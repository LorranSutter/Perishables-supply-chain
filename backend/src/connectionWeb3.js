const Web3 = require('web3');

const addressJSON = require('./config/ContractAddress.json');
const contractJSON = require('./config/Contract.json');

const CONTRACT_ADDRESS = addressJSON.address;
const CONTRACT_ABI = contractJSON.abi;

let web3;
let contract;

(async () => {
    web3 = new Web3(process.env.BLOCKCHAIN_EMULATOR_URI);
    contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
})();

const connectionWeb3 = {

    async getBatteryCurrentConditions(distributorAddress, token) {
        return await contract.methods
            .getBatteryCurrentConditions(token)
            .send({ from: distributorAddress })
            .call();
    },

    async getBatteryCurrentLocation(distributorAddress, token) {
        return await contract.methods
            .getBatteryCurrentLocation(token)
            .send({ from: distributorAddress })
            .call();
    },

    async getBatteryCurrentHolder(distributorAddress, token) {
        return await contract.methods
            .getBatteryCurrentHolder(token)
            .send({ from: distributorAddress })
            .call();
    }
}

module.exports = connectionWeb3;