const connectionWeb3 = require('../connectionWeb3');

exports.makeBattery = (req, res, next) => {

    const manufacturerAddress = req.cookies.manufacturerAddress;
    const _manufacturer = req.body._manufacturer;
    const _serialno = Buffer.from(req.body._serialno);
    const _thermal = parseInt(req.body._thermal);
    const _location = Buffer.from(Object.values(req.body._location).toString().replace(',', ';'));

    connectionWeb3
        .makeBattery(manufacturerAddress, _manufacturer, _serialno, _thermal, _location)
        .then(() => {
            res.json({ message: "Battery token minted successfully" });
        })
        .catch(err => {
            return next(err);
        });
}