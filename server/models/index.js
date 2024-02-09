import sequelize from "../dbconfig/dbconfig.js";
import { Sequelize,DataTypes } from "sequelize";
import Url from "./Url.js";
import User from "./User.js";

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.Url = Url
db.User = User

db.Url.belongsTo(db.User, {
    foreignKey:"userId"
})

db.User.hasMany(db.Url, {
    foreignKey:"userId"
})

export default db

