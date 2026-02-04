import express from 'express'
import authRouter from './routes/auth.routes'
import studentRouter from './routes/student.routes'
import paymentRouter from './routes/payment.routes'
import { errorMiddleware } from './middlewares/handlerError'
import cookieParser from 'cookie-parser'
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use('/auth', authRouter)
app.use('/student', studentRouter)
app.use('/payment', paymentRouter);
app.use(errorMiddleware)
app.listen(3001, ()=>{
    console.log('Servidor Rodando.')
})