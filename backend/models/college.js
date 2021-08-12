const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collegeSchema = new Schema({
    _id: Schema.Types.ObjectId,
    // id: {type: String, required: true, unique: true},
    // slug: {type: String, required: true, unique: true},
    location: {type: String, required: true},
    name: {type: String, require: true},    // mascot
    nickname: {type: String, required: true},
    abbreviation: {type: String, required: true},
    displayName: {type: String, required: true, unique: true},
    shortDisplayName: {type: String, required: true},
    color: {type: String},
    alternateColor: {type: String},
    logos: {type: Object},
    // links: {type: Array},
}, {
    timestamps: true,
});

const College = mongoose.model('College', collegeSchema);

module.exports = College;