import { Router } from 'express'

import AuthenticationController from '../1-controllers/AuthenticationController'

const routes = Router()

routes.post('/signin', AuthenticationController.SignIn)
routes.post('/signup', AuthenticationController.SignUp)

export default routes
