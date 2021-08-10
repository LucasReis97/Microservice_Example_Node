import { Request, Response } from 'express'
import User from '../2-schema/implementations/User'
import { UserDocument } from '../2-schema/interfaces/User'

class AuthenticationController {
  public async SignIn (req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' })
      }
      if (!(await user.compareHash(password))) {
        return res.status(400).json({ error: 'Invalid email or password' })
      }
      return res.status(200).json({ token: await user.generateToken() })
    } catch (err) {
      return res.status(400).json({ error: 'An error occured when try signin' })
    }
  }

  public async SignUp (req: Request, res: Response): Promise<Response> {
    try {
      const { email, cpf } = req.body
      if (await User.findOne({ email })) {
        return res.status(400).json({ error: 'E-mail already registered' })
      } else if (await User.findOne({ cpf })) {
        return res.status(400).json({ error: 'Cpf already registered' })
      }
      const user = new User(req.body)
      return await user.save()
        .then((response: UserDocument) => {
          return res.status(200).json(response)
        })
    } catch (err) {
      return res.status(400).json({ error: 'An error occured when try signup: ' + err })
    }
  }
}

export default new AuthenticationController()
