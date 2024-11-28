import { Router, Request, Response, NextFunction } from 'express'
import * as authController from './auth/auth.controller'
import * as formController from './form/form.controller'
import { adminMiddleware } from '../middleware/admin'
const router = Router()
const authRouter = Router()

const tryFunc = async (func: Promise<void> | void, res: Response, next: NextFunction) => {
   try{
      func
   } catch(error) {
      next(error)
   }
}

router.post('/form', async (req: Request, res: Response, next) => tryFunc(await formController.createUser(req, res, next), res, next))
router.get('/form', async (req: Request, res: Response, next) => tryFunc(await formController.getAllUsers(req, res, next), res, next))
router.get('/form/:id', async (req: Request, res: Response, next) => tryFunc(await formController.getUser(req, res, next), res, next))
router.put('/form/:id', async (req: Request, res: Response, next) => tryFunc(await formController.changeUserData(req, res, next), res, next))
router.delete('/form/:id', async (req: Request, res: Response, next) => tryFunc(await formController.deleteUser(req, res, next), res, next))

authRouter.post('/login', adminMiddleware, async (req: Request, res: Response, next) => await authController.logIn(req, res, next))
//authRouter.post('/signup', async (req: Request, res: Response, next) => await authController.signUp(req, res, next))

router.use('/auth', authRouter)

export default router