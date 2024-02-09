import { Sequelize } from "sequelize"
import dotenv from "dotenv"
dotenv.config()

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: process.env.MYSQL_DIALECT,
    port: process.env.MYSQL_PORT
})

export default sequelize;

