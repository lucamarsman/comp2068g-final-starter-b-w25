import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

const subscriberSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 8
    }
});

subscriberSchema.plugin(passportLocalMongoose);

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
export default Subscriber;