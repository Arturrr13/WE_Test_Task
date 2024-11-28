import { sequelize, User } from '../../sequelize/sequelize'
import { getError } from '../../errors/errors'

export const createUser = async (fName: string | boolean, lName: string | boolean, date: string | boolean, email: string | boolean, phone: string | boolean, image: string | boolean) => {
    let checkUser = await sequelize.sync().then(async () => await User.findOne({ where: { email: email } })).catch((error: Error) => { throw [ getError('databaseUnable'), error ]})
    if(checkUser && checkUser?.dataValues.password) throw getError('userAlreadyExist')
    
    let user = await sequelize.sync()
    .then(async () => await User.create({ firstname: fName, lastname: lName, dateofbirth: date, email: email, phone: phone, logo: image, adminstatus: false }))
    .catch((error: Error) => { throw [ getError('databaseUnable'), error ]})

    if(user?.dataValues) return [ user?.dataValues ]
}

export const getAllUsers = async () => sequelize.sync().then(() => User.findAll()).catch((error: Error) => { throw [ getError('databaseUnable'), error ]})

export const getUser = async (id: string) => {
    let user = await sequelize.sync().then(async () => await User.findOne({ where: { id: id } })).catch((error: Error) => { throw [ getError('databaseUnable'), error ]})
    if(!user) throw getError('userNotFound')
    return User.findOne({ where: { id: id } })
}

export const changeUserData = async (id: string, fName: string | boolean, lName: string | boolean, date: string | boolean, email: string | boolean, phone: string | boolean, image: string | boolean) => {
    let user = await sequelize.sync().then(async () => await User.findOne({ where: { id: id } })).catch((error: Error) => { throw [ getError('databaseUnable'), error ]})
    if(!user) throw getError('userNotFound')
    const checkValue = (value: string | boolean, key: string) => !value ? user?.dataValues[key] : value
    return user.update({ firstname: checkValue(fName, 'firstname'), lastname: checkValue(lName, 'lastname'), dateofbirth: checkValue(date, 'dateofbirth'), email: checkValue(email, 'email'), phone: checkValue(phone, 'phone'), logo: checkValue(image, 'logo') })
} 

export const deleteUser = async (id: string) => {
    let user = await sequelize.sync().then(async () => await User.findOne({ where: { id: id } })).catch((error: Error) => { throw [ getError('databaseUnable'), error ]})
    if(!user) throw getError('userNotFound')
    return User.destroy({ where: { id: id } })
}