import { Sequelize, DataTypes } from 'sequelize'

export const sequelize = new Sequelize('postgresql://testfl_user:jaQoVLlTDKfO2ubHsosHDhtvUlRCooBv@dpg-csli81jtq21c73ej4pj0-a.oregon-postgres.render.com/testfl?ssl=true', {
    dialect: "postgres",
    logging: false,
})

export let User = sequelize.define("users", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    firstname: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    dateofbirth: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING
    },
    logo: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    adminstatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    tstz: {
        type: DataTypes.TIME
    }
}, { timestamps: false, tableName: 'users' })