import { ApiErrorHandler, NotFoundErrorHandler } from './utils/ApiErrorHandler'
import { Server } from '@overnightjs/core'

import express from 'express'
import cors from 'cors'
import * as http from 'http'

export class SetupServer extends Server {
  private server?: http.Server
  constructor(private port: number = 3000) {
    super()
  }
  public init(): void {
    this.setupExpress()
    this.setupErrorHandler()
  }
  private setupExpress(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors({ origin: '*' }))
  }
  private setupErrorHandler(): void {
    this.app.use(NotFoundErrorHandler)
    this.app.use(ApiErrorHandler)
  }
  public start(): void {
    this.server = http.createServer(this.app)
    this.server.listen(this.port, () => {
      console.log(`Server run on Port: http:localhost${this.port}`)
    })
  }
}