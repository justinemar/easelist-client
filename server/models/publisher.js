const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PublisherSchema = new Schema({
    first_name: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    last_name: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    properties: {
        type: Schema.Types.ObjectId,
        ref: 'List'
    }
})


const Publisher = mongoose.model('Publisher', PublisherSchema);

module.exports = Publisher;
