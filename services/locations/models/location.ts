
import mongoose from "mongoose";

const Location = mongoose.model('Location', new mongoose.Schema({
    delivery_driver_id: String,
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now }
}))

export default Location;