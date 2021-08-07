import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import AuthenticationRoute from './0-routes/AuthenticationRoute'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.configuration()
    this.middlewares()
    this.database()
    this.routes()
  }

  private configuration ():void {
    if (process.env.NODE_ENV !== 'production') {
      dotenv.config()
    }
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database (): void {
    mongoose.connect(String(process.env.CONNECTION_STRING), {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
      .then(() => {
        console.log('DB Connected!')
      })
      .catch(err => {
        console.log('DB Connection Error: ' + err.message)
      })
  }

  private routes (): void {
    this.express.use(AuthenticationRoute)
  }
}

export default new App().express
