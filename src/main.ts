import { Client as RevoltClient } from 'revolt.js';
import { owners, prefix, token } from './config.json';
import { BotClient } from './framework/client';

class Voltage extends RevoltClient {
    voltage: BotClient;
    version: string = "0.1.0" ;

    constructor(...args: undefined[]) {
        super(...args);
        this.voltage = new BotClient(this, owners, prefix);
        this.websocket.heartbeat?(15):(null);
    }

    getPrefix() {
        return prefix;
    }
}
let client = new Voltage();

client.loginBot(token);