import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
    driverId: { type: String, required: true },
    packageId: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true }
});

LocationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
const Location = mongoose.model('Location', LocationSchema);


const DeliverySchema = new mongoose.Schema({
    packageId: { type: String, required: true },
    driverId: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in_progress', 'delivered'], required: true },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true }
});

DeliverySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

const Delivery = mongoose.model('Delivery', DeliverySchema);


export { LocationSchema, DeliverySchema, Location, Delivery };