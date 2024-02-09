import {DataTypes,Sequelize} from "sequelize"
import sequelize from "../dbconfig/dbconfig.js"
import dotenv from "dotenv"

dotenv.config()

const Url = sequelize.define('Url', {
    urlId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    shortUrl: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    redirectUrl: {
        type: DataTypes.STRING,
        allowNull:false
    },
    analytics: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull:false
    }
})

export default Url