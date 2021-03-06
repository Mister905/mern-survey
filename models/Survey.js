const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const SurveySchema = new Schema({
    title: String,
    subject: String,
    body: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    date_sent: Date,
    last_response: Date
});

mongoose.model("surveys", SurveySchema);