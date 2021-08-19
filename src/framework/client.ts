import { Client } from 'revolt.js';
import { Message } from 'revolt.js/dist/maps/Messages';
import { commands } from './commands';
import { Context, Command } from '../types/context';

export class BotClient {
    client: Client;
    owners: string[];
    prefix: string;
    commands = commands;

    constructor(client: Client, owners: string[], prefix: string,) {
        this.client = client;
        this.owners = owners;
        this.prefix = prefix;

        this.client.on('connecting', async () => {
            console.info('[Voltage] Connecting to Revolt.');
        })
        this.client.on('connected', async () => {
            console.info('[Voltage] Connected!');
        })
        this.client.on('ready', async () => {
            console.info(`[Voltage] Logged in as ${client.user!.username} (${client.user!._id})!`)
        });
        this.client.on('dropped', async () => {
            console.log('[Voltage] Dropped!');
        })
    

        this.client.on('message', async msg => {
            if (!msg.author || msg.author.bot || !msg.content) return

            const context = await this.getContext(msg);
            if (!context.command || !context.canExecute) return;
            if(context.sendHelp) {
                let content = "";
                content += `\`\`\`\n${this.prefix}${context.command.name} ${context.command.usage || ''}}\n`
                if(context.command.aliases) content += `Aliases: ${context.command.aliases.join(', ')}`
                await msg.channel?.sendMessage(content + `\n\n${context.command.description}\n\`\`\``);
            }


            console.info(
                `[Voltage] ${msg.author?.username}(${msg.author_id}) ran ${context.command.name} in ${msg.channel?.name} on ${msg.channel_id} | Content: ${msg.content}`
            )

            try {
                context.command.run(msg, context.args)
            } catch (exc) {
                await msg.channel?.sendMessage(`An error occured during the processing of this command.\n\`\`\`js\n${exc}\`\`\``)
            }
        });
    }


    getContext(msg: Message): Context {
        let values: Context = { command: null, args: [], canExecute: false, sendHelp: false };
        if (!msg.content.startsWith(this.prefix)) return values;

        const args = msg.content.substr(this.prefix.length).split(' ');
        const commandName = args.shift();
        const command: Command = this.getCommand(commandName);
        values.command = command;
        values.args = args;
        if (!command || command.owner && !this.owners.includes(msg.author_id)) return values;

        values.canExecute = true;
        if(command.requireInput && args.length === 0) {
            values.sendHelp = true;
        }
        return values;
    }

    getCommand(value: string) {
        return this.commands.find(cmd => cmd.name === value || cmd.aliases?.includes(value))
    }
}