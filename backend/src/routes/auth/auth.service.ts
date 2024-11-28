import bcrypt from 'bcryptjs'
import { sequelize, User } from '../../sequelize/sequelize'
import { getError } from '../../errors/errors'

export const logInUser = async (email: string, password: string) => {
    const user = await sequelize.sync().then(async () => await User.findOne({ where: { email: email } })).catch(async (error: Error) => { throw [ getError('databaseUnable'), error ]})
    if(!user || !user?.dataValues.adminstatus) throw getError('unauthorized')
    
    if(user?.dataValues){
        const checkPassword = await bcrypt.compare(password, user.dataValues.password)
        if(!checkPassword) throw getError('wrongPassword')
        return [ user?.dataValues ]
    }
}

// export const signUpAdmin = async (fName: string, lName: string, date: string, email: string, password: string) => {
//     let checkUser = await sequelize.sync().then(async () => await User.findOne({ where: { email: email } })).catch((error: Error) => { throw [ getError('databaseUnable'), error ]})
//     if(checkUser) throw getError('userAlreadyExist')
    
//     const userPassword = await bcrypt.hash(password, 8)
//     let user = await sequelize.sync()
//     .then(async () => await User.create({ firstname: fName, lastname: lName, dateofbirth: date, email: email, password: userPassword, adminstatus: true }))
//     .catch((error: Error) => { throw [ getError('databaseUnable'), error ]})

//     if(user?.dataValues){
//         return [ user?.dataValues ]
//     }
// }