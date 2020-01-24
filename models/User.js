const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    google_id: String,
    credits: { type: Number, default: 0 }
});


// The first argument is the name of the collection
mongoose.model("users", UserSchema);