import * as service from './form.service'
import { NextFunction, Request, Response } from 'express'
import { LoginRes } from '../../types'
import { Model } from 'sequelize'
import { userData } from '../../types'

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { fName, lName, data, email, phone, image } = req.body
        const result: Array<LoginRes> | undefined = await service.createUser(fName, lName, data, email, phone, image)
        
        if(result) res.send(result)
    } catch(e){
        next(e)
    }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try{
        // @ts-ignore
        const result:Array<userData> = await service.getAllUsers()
        const checkUsers = result.filter(el => !el.adminstatus)
        if(result) res.json(checkUsers)
    } catch(e){
        next(e)
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id
        const result = await service.getUser(id)
        if(result) res.json(result)
    } catch(e){
        next(e)
    }
}

export const changeUserData = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { fName, lName, data, email, phone, image } = req.body
        const id = req.params.id
        const result: Array<void> | Model<any, any> | number | undefined = await service.changeUserData(id, fName, lName, data, email, phone, image)
        if(result) res.send(result)
    } catch(e){
        next(e)
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id
        const result: Array<void> | number | undefined = await service.deleteUser(id)
        if(result) res.send({message: 'User was deleted'})
    } catch(e){
        next(e)
    }
}