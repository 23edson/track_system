import amqp from 'amqplib';

export interface MessagePublisher {
    publish(queue: string, message: any): Promise<void>;
    connect(url: string): Promise<void>;
    disconnect(): Promise<void>;
}

export class RabbitMQPublisher implements MessagePublisher {
    private connection: amqp.ChannelModel | null = null;
    private channel: amqp.Channel | null = null;

    async connect(url: string): Promise<void> {
        try {

            this.connection = await amqp.connect(url);
            this.channel = await this.connection.createChannel();
        } catch (error) {
            console.error('Error connecting to RabbitMQ:', error);
            throw error
        }
    }

    async publish(queue: string, message: any): Promise<void> {
        if (!this.channel) {
            throw new Error('Channel is not initialized');
        }
        await this.channel.assertQueue(queue);
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }

    async disconnect(): Promise<void> {
        if (this.channel) {
            await this.channel.close();
            this.channel = null;
        }
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
        }
    }
}