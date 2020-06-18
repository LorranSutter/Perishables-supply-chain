const Web3 = require('web3');

// const addressJSON = require('./config/ContractAddress.json');
// const contractJSON = require('./config/Contract.json');

const addressJSON = require('../../smart_contract/build/SupplyChainAddress.json');
const contractJSON = require('../../smart_contract/build/contracts/SupplyChain.json');

const CONTRACT_ADDRESS = addressJSON.address;
const CONTRACT_ABI = contractJSON.abi;

let web3;
let contract;

(async () => {
    web3 = new Web3(process.env.BLOCKCHAIN_EMULATOR_URI);
    contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
})();

const connectionWeb3 = {

    // TODO convert to bignumber
    async getBatteryTrackingInfo(distributorAddress, tokenId) {
        return await contract.methods
            .getBatteryTrackingInfo(tokenId)
            .send({ from: distributorAddress })
            .call();
    }
}

module.exports = connectionWeb3;