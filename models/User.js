const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init({

    id: {
       type: DataTypes.INTEGER,
       allowNull: false,
       autoIncrement: true,
       primaryKey: true
    },

    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',           
})

module.exports = User;