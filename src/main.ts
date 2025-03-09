import dotenv from 'dotenv'
dotenv.config()

import { SetupServer } from './bootstrap'

const PORT = process.env.PORT
const server = new SetupServer()

server.init()
server.start()