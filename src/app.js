import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import customersRouter from './routers/CustomersRouter.js'
import gamesRouter from './routers/GamesRouter.js'
import rentalsRouter from './routers/RentalsRouter.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use([customersRouter,gamesRouter,rentalsRouter])

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log(`Server on port ${PORT}`))