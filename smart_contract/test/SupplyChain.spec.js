const BigNumber = require("bignumber.js");
const truffleAssert = require("truffle-assertions");

const SupplyChain = artifacts.require("SupplyChain");

contract("Contract Test", (accounts) => {
    const admin = accounts[0];
    const manufacturer = accounts[1];
    const transporter = accounts[2];
    const distributor = accounts[3];
    let contractInstance;

    // Deploy a new contract before each test to prevent one test from interfering with the other
    beforeEach(async () => {
        contractInstance = await SupplyChain.new('', { from: admin });
    });

    it('should be able to add manufacturer', async () => {
        const tx = await contractInstance.addManufacturer(manufacturer, { from: admin });

        truffleAssert.eventEmitted(tx, "ManufacturerAdded", (obj) => {
            return (
                obj._manufacturer === manufacturer
            )
        }, 'Fail ManufacturerAdded Event');
    });

    it('should be able to add transporter', async () => {
        const tx = await contractInstance.addTransporter(transporter, { from: admin });

        truffleAssert.eventEmitted(tx, "TransporterAdded", (obj) => {
            return (
                obj._transporter === transporter
            )
        }, 'Fail TransporterAdded Event');
    });

    it('should be able to add distributor', async () => {
        const tx = await contractInstance.addDistributor(distributor, { from: admin });

        truffleAssert.eventEmitted(tx, "DistributorAdded", (obj) => {
            return (
                obj._distributor === distributor
            )
        }, 'Fail DistributorAdded Event');
    });

    // it('should return correct patient holder', async () => {
    //     await contractInstance.addPatient(patientName, dateBirth, hospitalEmergency, { from: hospital1 });

    //     const holderAddress = await contractInstance.patientHolder(1);
    //     assert.equal(holderAddress, hospital1, `Patient 1 holder should be ${hospital1}`);
    // });

    // it('should add a new patient', async () => {
    //     const tx = await contractInstance.addPatient(patientName, dateBirth, hospitalEmergency, { from: hospital1 })

    //     truffleAssert.eventEmitted(tx, "Transfer", (obj) => {
    //         return (
    //             obj._from === hospital1 &&
    //             obj._to === hospital1 &&
    //             new BigNumber(1).isEqualTo(obj._tokenId)
    //         )
    //     }, 'Fail addPatient');
    // });

    // it('should transfer a patient from a hospital to another', async () => {
    //     const tx1 = await contractInstance.addPatient(patientName, dateBirth, hospitalEmergency, { from: hospital1 })

    //     truffleAssert.eventEmitted(tx1, "Transfer", (obj) => {
    //         return (
    //             obj._from === hospital1 &&
    //             obj._to === hospital1 &&
    //             new BigNumber(1).isEqualTo(obj._tokenId)
    //         );
    //     }, 'Fail addPatient');

    //     let holderAddress = await contractInstance.ownerOf(1);
    //     assert.equal(holderAddress, hospital1, `Hospital should be ${hospital1}`);

    //     const tx2 = await contractInstance.transferPatient(hospital2, 1, { from: hospital1 });

    //     truffleAssert.eventEmitted(tx2, "Transfer", (obj) => {
    //         return (
    //             obj._from === hospital1 &&
    //             obj._to === hospital2 &&
    //             new BigNumber(1).isEqualTo(obj._tokenId)
    //         );
    //     }, 'Fail addPatient');

    //     holderAddress = await contractInstance.ownerOf(1);
    //     assert.equal(holderAddress, hospital2, `Hospital should be ${hospital2}`);
    // });

    // it('should return patient info', async () => {
    //     const tx1 = await contractInstance.addPatient(patientName, dateBirth, hospitalEmergency, { from: hospital1 });

    //     truffleAssert.eventEmitted(tx1, "Transfer", (obj) => {
    //         return (
    //             obj._from === hospital1 &&
    //             obj._to === hospital1 &&
    //             new BigNumber(1).isEqualTo(obj._tokenId)
    //         );
    //     }, 'Fail addPatient');

    //     const nameReturn = await contractInstance.getPatientName(1, { from: hospital1 });
    //     assert.equal(nameReturn, patientName, `Patient name should be ${patientName}`);

    //     const dateBirthReturn = await contractInstance.getPatientDateBirth(1, { from: hospital1 });
    //     assert.equal(dateBirthReturn, dateBirth, `Patient date birth should be ${dateBirth}`);

    //     const statusReturn = await contractInstance.getPatientStatus(1, { from: hospital1 });
    //     assert(new BigNumber(statusReturn).isEqualTo(0), 'Patient status should be 0');

    //     const emergencyReturn = await contractInstance.getPatientEmergencyHospital(1, { from: hospital1 });
    //     assert.equal(emergencyReturn, hospitalEmergency, `Patient emergency hospital address should be ${hospitalEmergency}`);
    // });

    // it('should move critical patients to emergency hospital', async () => {
    //     const tx1 = await contractInstance.addPatient(patientName, dateBirth, hospitalEmergency, { from: hospital1 });

    //     truffleAssert.eventEmitted(tx1, "Transfer", (obj) => {
    //         return (
    //             obj._from === hospital1 &&
    //             obj._to === hospital1 &&
    //             new BigNumber(1).isEqualTo(obj._tokenId)
    //         );
    //     }, 'Fail addPatient');

    //     const tx2 = await contractInstance.movePatientToCritical(1, { from: hospital1 });

    //     truffleAssert.eventEmitted(tx2, "Transfer", (obj) => {
    //         return (
    //             obj._from === hospital1 &&
    //             obj._to === hospitalEmergency &&
    //             new BigNumber(1).isEqualTo(obj._tokenId)
    //         );
    //     }, `Fail transfer patient from ${hospital1} to ${hospitalEmergency}`);
    // });
});