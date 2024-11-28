import { NextFunction, Request, Response } from 'express'
import { getError } from '../errors/errors'

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log('admin')

    try{
        const { email, password } = req.body
        if(email !== 'admin@admin.com' || password !== 'admin123') return next(getError('unauthorized'))
        next()
    } catch(e){
        console.log('bad req')
        next(getError('unauthorized'))
    }
}