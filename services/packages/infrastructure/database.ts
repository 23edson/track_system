import Package from "./mongoSchema";
import mongoose from "mongoose";

export default interface DatabaseConnection {
    query(statement: string, params: any, operation?: any): Promise<any>;
    close(): Promise<void>;
}

export class DatabaseConnectionMongo implements DatabaseConnection {
    private mongoose: any;
    private isConnected: boolean;
    private models: { [key: string]: any };

    constructor(readonly uri: string) {

        this.mongoose = mongoose;
        this.isConnected = false;
        this.models = {};
    }

    async connect() {
        if (this.isConnected) {
            console.log('MongoDB is already connected.');
            return;
        }

        try {
            await this.mongoose.connect(this.uri);
            this.isConnected = true;
            console.log('MongoDB connected successfully!');

            // Register models
            this.models.Package = Package

        } catch (err) {
            this.isConnected = false;
            console.error('MongoDB connection error:', err);
            throw err;
        }
    }


    async query(statement: string, query: any = {}, operation = 'find') {
        try {
            const Model = this.mongoose.model(statement);
            switch (operation) {
                case 'find':
                    return await Model.find(query);
                case 'findOne':
                    return await Model.findOne(query);
                case 'findById':
                    return await Model.findById(query);
                case 'create':
                    console.log('Creating package with data:', query);
                    console.log(await Model.create(query))
                    return await Model.create(query);
                case 'updateOne':
                    // query = { filter, update }
                    return await Model.updateOne(query.filter, query.update);
                // ... outros casos
                default:
                    throw new Error(`Unsupported query operation: ${operation}`);
            }
        } catch (error) {
            console.error(`Error executing query on collection ${statement}:`, error);
            throw error;
        }
    }

    async close(): Promise<void> {
        await this.mongoose.connection.close();
    }
}