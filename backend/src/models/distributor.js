const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DistributorSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true,
            // index: true,
            // unique: true
        },
        registration_date: {
            type: Date,
            required: true,
            default: new Date()
        }
    }
);

DistributorSchema.path('name').validate(function (name) {
    return name.length <= 100;
}, 'Name max length must be 100');

DistributorSchema.path('address').validate(function (address) {
    address = address.replace('0x', '');
    return address.length === 40;
}, 'Address length must be 42');

module.exports = mongoose.model('Distributor', DistributorSchema);