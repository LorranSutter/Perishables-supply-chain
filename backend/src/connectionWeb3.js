const Web3 = require('web3');
const BigNumber = require('bignumber.js')

const addressJSON = require('../../smart_contract/build/SupplyChainAddress.json');
const contractJSON = require('../../smart_contract/build/contracts/SupplyChain.json');

const CONTRACT_ADDRESS = addressJSON.address;
const CONTRACT_ABI = contractJSON.abi;

let web3;
let contract;

(async () => {
    web3 = new Web3(process.env.BLOCKCHAIN_EMULATOR_URI);
    const accounts = await web3.eth.getAccounts();
    contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS, { from: accounts[0] });
})();

const connectionWeb3 = {
    
    async getBatteryTrackingInfo(distributorAddress, tokenId) {
        return await contract.methods
            .getBatteryTrackingInfo(new BigNumber(tokenId))
            .call({ from: distributorAddress });
    }
}

module.exports = connectionWeb3;