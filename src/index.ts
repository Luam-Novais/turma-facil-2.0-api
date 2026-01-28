import express from 'express'
import authRouter from './routes/auth.routes'
import { errorMiddleware } from './middlewares/handlerError'
const app = express()
app.use(express.json())
app.use(express.urlencoded())

app.use('/auth', authRouter)

app.use(errorMiddleware)
app.listen(3001, ()=>{
    console.log('Servidor Rodando.')
})