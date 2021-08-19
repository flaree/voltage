import { Message } from "revolt.js/dist/maps/Messages";
import { LIBRARY_VERSION } from "revolt.js/dist/config" 

module.exports = {
    name: 'info',
    aliases: [],
    description: 'Information about Voltage.',
    owner: false,
    requireInput: false,

    run: async (message: Message, args: string[]) => {
        // @ts-ignore
        message.channel?.sendMessage(`| Owner | Version | revolt.js version |\n|----------|----------|----------|\n| flare | ${message.client.version} | ${LIBRARY_VERSION}   |`);
    }
}