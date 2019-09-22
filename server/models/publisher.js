const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PublisherSchema = new Schema({
    first_name: {
        type: String,
        requried: true
    },
    middle_name: {
        type: String,
        require: true
    },
    last_name: {
        type: 'String',
        require: true
    },
    properties: {
        type: Schema.Types.ObjectId,
        ref: 'List'
    }
})


const Publisher = mongoose.model('Publisher', PublisherSchema);

module.exports = Publisher;
