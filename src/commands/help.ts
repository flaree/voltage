import { Message } from "revolt.js/dist/maps/Messages";
import { Command } from "../types/context";

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Get all available commands.',
    owner: false,
    requireInput: false,

    run: async (msg: Message, args: string[]) => {
        const input = args.join(' ');
        let content = `|${msg.client.user?.username} Help Menu|\n|---|\n\n|Command|Description|\n|-----|-----|\n`;
        if (!input) {
            // @ts-ignore
            for (const cmd of msg.client.voltage.commands) {
                // @ts-ignore
                if(cmd.owner && !msg.client.voltage.owners.includes(msg.author_id)) continue;
                content += `|${cmd.name}| ${cmd.description || 'No description.'}|\n`
            }
        } else {
            // @ts-ignore
            const cmd: Command = msg.client.voltage.getCommand(input)
            if (!cmd) {
                content += 'Nothing found!'
            } else {
                // @ts-ignore
                content = `\`\`\`\n${msg.client.getPrefix()}${cmd.name} ${cmd.usage || ''}\n`
                if(cmd.aliases) content += `Aliases: ${cmd.aliases.join(', ')}`
                content + `\n\n${cmd.description}\n\`\`\``
            }
        }
        msg.channel?.sendMessage(content);
    }
}