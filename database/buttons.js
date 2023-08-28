import { DataTypes } from "sequelize";

import sequelize from "./index.js";

const Buttons = sequelize.define("button", {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
    userCreated: {
        type: DataTypes.STRING,
        allowNull: true,
    }, 
    custom_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    label: {
        type: DataTypes.STRING(2000), 
        allowNull: false,
    },
    style: {
        type: DataTypes.STRING(1),
        allowNull: false,
    },

}, 
{
    timestamps: true,

});

Buttons.sync({ force: true });

export default Buttons;