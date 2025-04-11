import mongoose from "mongoose";

const destinationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: [String],
        required: true
    },
    activities: {
        type: String,
        required: true
    }
});

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;

