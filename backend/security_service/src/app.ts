import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import AuthenticationRoute from './0-routes/AuthenticationRoute'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database (): void {
    mongoose.connect('mongodb://127.0.0.1:27017/ProjectNode', {
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
