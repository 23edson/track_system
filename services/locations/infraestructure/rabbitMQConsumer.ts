import amqp from 'amqplib';

export interface MessageConsumer {
    startConsuming(queueName: string, messageHandler: (message: any) => Promise<void>): Promise<void>;
    connect(url: string): Promise<void>;
    disconnect(): Promise<void>;
}
export class RabbitMQConsumer implements MessageConsumer {
    private connection: amqp.ChannelModel | null = null;
    private channel: amqp.Channel | null = null;

    async connect(url: string): Promise<void> {
        try {

            this.connection = await amqp.connect(url);
            this.channel = await this.connection.createChannel();
        } catch (error) {
            console.error('Error RabbitMQ:', error);
            throw error
        }
    }

    async publish(queue: string, message: any): Promise<void> {
        if (!this.channel) {
            throw new Error('Channel is not running');
        }
        await this.channel.assertQueue(queue);
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }

    async startConsuming(queueName: string, messageHandler: (message: any) => Promise<void>): Promise<void> {
        if (!this.channel) {
            throw new Error('Channel is not running');
        }
        await this.channel.assertQueue(queueName);
        this.channel.consume(queueName, async (msg) => {
            if (msg) {
                try {
                    const data = JSON.parse(msg.content.toString());
                    await messageHandler(data);
                    this.channel?.ack(msg);
                } catch (error) {
                    console.error('Error on message:', error);
                    this.channel?.nack(msg, false, false);
                }
            }
        });
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