import express from 'express'
import {router as catsController} from './controllers/cats-controller.js'
import {router as dogsController} from './controllers/dogs-controller.js'
import {logger} from './middleware/logger.js'
import { deleteForbidden } from './middleware/delete-forbidden.js'

const app = express()

app.use(express.json())
app.use(logger)
app.use(deleteForbidden)
app.use('/', catsController)
app.use('/', dogsController)





app.listen(5001, ()=> {
    console.log('the server is running on port 5001')
})