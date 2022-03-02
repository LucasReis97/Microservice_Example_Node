import { Router } from 'express'

import AuthenticationController from '../1-controllers/AuthenticationController'

class AuthenticationRoute {
    public route: Router;

    constructor () {
      this.route = Router()
      this.configureRoutes()
    }

    private configureRoutes (): void {
      this.route.post('/signin', AuthenticationController.SignIn)
      this.route.post('/signup', AuthenticationController.SignUp)
    }
}

export default new AuthenticationRoute().route
