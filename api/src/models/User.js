const { DataTypes } = require('sequelize');
const { conn } = require('../db.js');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    args: true,
                    msg: "El nombre debe contener solo letras"
                },
                len: {
                    args: [4, 45],
                    msg: "El nombre debe contener minimo 4 letras"
                }
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    args: true,
                    msg: "El apellido debe contener solo letras"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail:{ 
                    args: true,
                    msg: "El mail debe ser valido"
                }
            }
        },
        address: {
            type: DataTypes.STRING(55),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(10), // este campo no debe ser INTEGER, no son datos manipulables matematicamente
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,32}$/,
                    msg: 'la contraseña debe contener minimo 8 caracteres, una letra minuscula, una letra masyuscula, un numero y un caracter especial'
                }
            }
        },
        birthdate: {
            type: DataTypes.DATEONLY, // si se quiere usar el hook para manipular formato, se debe pasar a STRING y usar libreria "moment"
            allowNull: false,
            },
        role: {
            type: DataTypes.ENUM(['Admin', 'Cliente']),
            defaultValue: 'Cliente',
            allowNull: true
        },
        creationDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        }
    }, { hooks: 
        {
        beforeValidate: function set(user) {
            user.birthdate = new Date(user.birthdate)
            },
        // beforeValidate: function set(user) {   // este hook es para manipular el campo fecha de birthday si quisieramos
        //     let fechaArg = moment(user.dataValues.birthdate).format('DD/MM/YYYY')
        //     user.setDataValue('birthdate', fechaArg)
        // },
        afterValidate: async function set(user) {
           user.password = await bcrypt.hash(user.password, 9)
       }
    }, timestamps: false });
};