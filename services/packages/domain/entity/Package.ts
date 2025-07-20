import mongoose from "mongoose";
/* 
const packageSchema = new mongoose.Schema({
    clientId: { type: String, required: true },
    drivenId: { type: String, required: true },
    destiny: { type: String, required: true },
    status: { type: String, enum: ['aguardando', 'em_transito', 'entregue'], default: 'aguardando' },
    createdAt: { type: Date, default: Date.now }
});

export const Package = mongoose.model('Package', packageSchema);
 */

export default class Package {

    private clientId: string;
    private drivenId: string;
    private destination: string;
    private status: 'aguardando' | 'em_transito' | 'entregue';
    private createdAt: Date;

    constructor(clientId: string, drivenId: string, destination: string, status: typeof this.status = 'aguardando', createdAt = new Date()) {
        if (!clientId || !drivenId || !destination) {
            throw new Error('Dados obrigatórios faltando');
        }

        this.clientId = clientId;
        this.drivenId = drivenId;
        this.destination = destination;
        this.status = status;
        this.createdAt = createdAt;
    }

    static create(clientId: string, drivenId: string, destination: string, status: any, createdAt?: Date) {
        return new Package(clientId, drivenId, destination, status, createdAt);
    }
}