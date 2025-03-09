import { ApiErrorHandler, NotFoundErrorHandler } from './utils/ApiErrorHandler'
import { BlogController } from './modules/blog/blog.controller'
import { AuthController } from './modules/auth/auth.controller'
import { Server } from '@overnightjs/core'

import connectDB from './utils/connectDB'
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
    this.setupControllers()
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
  private setupControllers() {
    const controllers = [new BlogController(), new AuthController()]
    super.addControllers(controllers)
  }
  public async start(): Promise<void> {
    try {
      await connectDB();
      this.server = http.createServer(this.app);
      this.server.listen(this.port, () => {
        console.log(`Server running on http://localhost:${this.port}`);
      });
    } catch (error) {
      console.error("Failed to start the server:", error);
    }
  }
}