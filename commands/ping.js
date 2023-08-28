import { emoji } from "../helpres/emoji.js";

import { SlashCommandBuilder, inlineCode, bold } from "discord.js";

import { uptime } from "os";

export default {
    global: true,
    guild: true,

    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('for test!'),
    async execute(interaction) {
        const ms = `${Math.round(uptime() / 1000)}ms`;

        console.log(interaction);

        return await interaction.reply(`${bold('PinkyOS')} ${ inlineCode(ms) }`);
    },
};