import dbButtons from "../database/buttons.js";

import { 
    SlashCommandBuilder, 
    ModalBuilder, 
    TextInputBuilder, 
    StringSelectMenuBuilder, 
    StringSelectMenuOptionBuilder, 
    TextInputStyle, 
    ActionRowBuilder,
} from "discord.js";

const inputButtonName = new TextInputBuilder()
.setCustomId('buttonNameInput')
.setLabel('Введите название кнопки')
.setMinLength(10)
.setPlaceholder('Название написанное на кнопке')
.setStyle(TextInputStyle.Short)
.setRequired(true);

const inputButtonId = new TextInputBuilder()
.setCustomId('buttonCustomId')
.setLabel('Введите id кнопки')
.setMinLength(5)
.setPlaceholder('Id кнопки для discord')
.setStyle(TextInputStyle.Short)
.setRequired(true);


const selectButtonStyle = new StringSelectMenuBuilder()
.setCustomId('selectButtonStyle')
.setPlaceholder('Выберите стиль кнопки')
.setOptions(
    new StringSelectMenuOptionBuilder()
    .setLabel('Основной')
    .setDescription('Самый обычный')
    .setValue("Primary"),
    new StringSelectMenuOptionBuilder()
    .setLabel('Дополнительный')
    .setDescription('Такой немного обычный но нет!')
    .setValue("Secondary")
);


const firstButtonsModalRow = new ActionRowBuilder().addComponents(inputButtonName),
secondButtonsModalRow = new ActionRowBuilder().addComponents(inputButtonId);

const interactionSelectRow = new ActionRowBuilder().addComponents(selectButtonStyle);

const buttonsCreateModal = new ModalBuilder()
.setCustomId('buttonCreator')
.setTitle('Создание кнопок')
.addComponents(firstButtonsModalRow, secondButtonsModalRow);


export default {
    global: false,
    guild: true,
    select: {
        customId: "selectButtonStyle",
    }, 
    modal: {
        customId: "buttonCreator",
    }, 

    data: new SlashCommandBuilder()
    .setName('create-button')
    .setDescription('For create button for some cmd interaction')
    .setDescriptionLocalizations({
        ru: "Меню создания кнопок, для взаимодействия с некоторыми командами",
    }),
    async execute(interaction) {
        await interaction.reply({
            content: "Выберите стиль кнопки для начала!",
            components: [interactionSelectRow]
        }); 
    },  
    async selectExecute(interaction) {
        const buttonStyle = interaction.values[0];

        const pickedInput = new TextInputBuilder()
        .setCustomId('buttonStyle')
        .setLabel('Созданная кнопка, не нужно трогать!')
        .setStyle(TextInputStyle.Short)
        .setValue(buttonStyle)

        const pickedButtonModalRow = new ActionRowBuilder().addComponents(pickedInput);

        buttonsCreateModal.addComponents(pickedButtonModalRow);

        return await interaction.showModal(buttonsCreateModal);
    },
    async modalExecute(interaction) {
        const buttonName = interaction.fields.getTextInputValue('buttonNameInput'),
        buttonCustomId = interaction.fields.getTextInputValue('buttonCustomId'),
        buttonStyle = interaction.fields.getTextInputValue('buttonStyle');

        dbButtons.create({
            custom_id: buttonCustomId,
            label: buttonName,
            style: buttonStyle,
            userCreated: interaction.user.id,
        });

        return interaction.reply(`Кнопка успешно создана!`);
    },
};