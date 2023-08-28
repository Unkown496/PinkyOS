import { emoji } from "../helpres/emoji.js";

import { SlashCommandBuilder, inlineCode, userMention, ButtonBuilder, ButtonStyle } from "discord.js";

import { setTimeout } from "timers/promises";

const wait = setTimeout;

let _timeId = 1;

export default {
    global: false,
    guild: true,
    canPickButtons: true,

    data: new SlashCommandBuilder()
    .setName('cooldown')
    .setDescription('Тегает после прохождения таймера')
    .addIntegerOption(option =>
        option
        .setName("time")
        .setNameLocalizations({
            ru: "время"
        })
        .setDescription('time per seconds')
        .setDescriptionLocalizations({
            ru: "время в секундах"
        })
        .addChoices({
            name: "1 секунда",
            value: 1,
        })
        .setRequired(true)
    ),
    async execute(interaction) {
        const time = interaction.options.getInteger('time');

        await interaction.reply(inlineCode(`Таймер ${_timeId} на ${time}с, запущен!`));
        
        await wait(time);

        await interaction.editReply(inlineCode(`Таймер ${_timeId} закончился, ${interaction.user.globalName} просыпайтесь!`));

        userMention(interaction.user.id);

        return  _timeId = _timeId+1;
    },
};