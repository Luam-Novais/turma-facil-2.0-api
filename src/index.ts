import express from 'express'
import authRouter from './routes/auth.routes.js'
import studentRouter from './routes/student.routes.js'
import paymentRouter from './routes/payment.routes.js'
import reportRouter from './routes/report.routes.js'
import { errorMiddleware } from './middlewares/handlerError.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

// app.use(
//   cors({
//     origin: 'https://turma-facil-2-0.vercel.app',
//     credentials: true,
//   }),
// );
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use('/auth', authRouter)
app.use('/student', studentRouter)
app.use('/payment', paymentRouter);
app.use('/report', reportRouter)
app.use(errorMiddleware)

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log('Servidor Rodando.')
})
