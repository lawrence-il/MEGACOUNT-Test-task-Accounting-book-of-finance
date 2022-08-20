import {Sequelize} from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        dialect:'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT as unknown as number
    }
)
export default sequelize;