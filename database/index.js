import { loadJson } from '../helpres/load.js';
import { __dirname } from '../namespaces.js';

import { Sequelize } from 'sequelize';

const rawDbConfig = loadJson(`${__dirname}/configDB.json`);

const sequelize = new Sequelize({
    dialect: "sqlite", 
    storage: "D:/PinkyOS/db.sqlite",
});


export default sequelize;