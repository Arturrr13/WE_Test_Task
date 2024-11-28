import * as service from './auth.service'
import { NextFunction, Request, Response } from 'express'
import { LoginRes } from '../../types'

export const logIn = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { email, password } = req.body
        const result: Array<LoginRes> | undefined = await service.logInUser(email, password)
        if(result) res.status(200).send(result)
    } catch(e){
        next(e)
    }
}

// export const signUp = async (req: Request, res: Response, next: NextFunction) => {
//     try{
//         const result: Array<LoginRes> | undefined = await service.signUpAdmin('Admin', 'Admin', '28/11/2024', 'admin@admin.com', 'admin123')
        
//         if(result) res.status(200).send(result)
//     } catch(e){
//         next(e)
//     }
// }