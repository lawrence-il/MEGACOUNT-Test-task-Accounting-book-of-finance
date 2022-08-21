import 'dotenv/config';
import express from "express";
import sequelize from './db.js';
import * as models from "./models/models.js";
const PORT = process.env.PORT || 3000;
const app = express();
const startApp = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(models));
    }
    catch (error) {
        console.log(error);
    }
};
startApp();
