import { NextFunction, Request, Response } from 'express'
import { getError } from '../errors/errors'

export const authMiddleware = async (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log('middleware')
    if(error[1]){
        if(getError(error[0].name)) return res.status(error[0].status).json({message: error[0].message, detailse: error[1]})
    } else {
        if(getError(error.name)) return res.status(error.status).json({message: error.message})
    }
    return res.status(500).json({message: 'BIG ERROR'})
}