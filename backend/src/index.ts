import path from 'path'
import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './routes/index'
import { authMiddleware } from './middleware/auth'

const PORT = process.env.PORT || 5000
const app = express()
//const URL = 'http://localhost:5173' // for dev mode
const URL = 'https://fullstackapp-test.onrender.com' // for dev renderer.com

app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: URL
}))
app.use('/api', router)

// @ts-ignore
app.use(authMiddleware)

app.use(express.static(path.resolve(__dirname, './dist'),  {maxAge: '1y', etag: false}))
app.get('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", URL)
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Headers", ['X-Requested-With','content-type','credentials'])
    res.header('Access-Control-Allow-Methods', 'GET,POST')
    res.sendFile(path.join(__dirname, './dist/index.html'))
})

app.listen(PORT, () => console.log('YEP'))