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
    const {
      MONGO_USERNAME,
      MONGO_PASSWORD,
      MONGO_HOSTNAME,
      MONGO_PORT,
      MONGO_DB
    } = process.env

    const options = {
      useNewUrlParser: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      connectTimeoutMS: 10000
    }

    const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

    mongoose.connect(url, options).then(function () {
      console.log('MongoDB is connected')
    })
      .catch(function (err) {
        console.log(err)
      })
  }

  private routes (): void {
    this.express.use(AuthenticationRoute)
  }
}

export default new App().express
