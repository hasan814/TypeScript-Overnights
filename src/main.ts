import dotenv from 'dotenv'
dotenv.config()

import { SetupServer } from './bootstrap'

const PORT = process.env.PORT ? Number(process.env.PORT) : undefined;


const server = new SetupServer(PORT)

server.init()
server.start()