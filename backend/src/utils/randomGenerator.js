const crypto = require('crypto');
const ethUtil = require('ethereumjs-util');

exports.randomString = (size) => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

exports.randomAddress = () => {

    // Ensure the private key is valid
    let privateKey = crypto.randomBytes(32);
    while (!ethUtil.isValidPrivate(privateKey)) {
        privateKey = crypto.randomBytes(32);
    }

    // Get the public key based on the private key
    const publicKey = ethUtil.privateToPublic(privateKey);

    // Hash the public key and take the last 20 bytes of the hash
    let address = ethUtil.keccak256(publicKey).slice(12);

    // Encode as hexadecimal
    address = ethUtil.bufferToHex(address);

    return address;
}

exports.newDistributor = () => {
    return {
        name: this.randomString(10),
        password: this.randomString(15),
        address: this.randomAddress()
    }
}