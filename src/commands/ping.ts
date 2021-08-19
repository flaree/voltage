import { Message } from "revolt.js/dist/maps/Messages";

module.exports = {
    name: 'ping',
    aliases: [],
    description: 'Pong.',
    owner: false,
    permissions: [],
    botpermissions: [],
    requireInput: false,

    run: async (message: Message, args: string[]) => {
        message.channel?.sendMessage('Pong!');
    }
}