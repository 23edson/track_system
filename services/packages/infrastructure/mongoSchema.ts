import mongoose from "mongoose";


const PackageSchema = new mongoose.Schema({
    clientId: { type: String, required: true },
    drivenId: { type: String, required: true },
    destination: { type: String, required: true },
    status: { type: String, enum: ['aguardando', 'em_transito', 'entregue'], default: 'aguardando' },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true }
});

PackageSchema.virtual('id').get(function () {
    return this._id.toHexString();
});


const Package = mongoose.model('Package', PackageSchema);

export default Package;
export { PackageSchema };