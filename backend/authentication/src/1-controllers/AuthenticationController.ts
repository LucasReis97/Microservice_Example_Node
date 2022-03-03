import { Request, Response } from "express";
import Employee, { IEmployee } from "../2-schema/Employee";

class AuthenticationController {
  public async SignIn(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const employee = await Employee.findOne({ email });
      if (!employee) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
      if (!(await employee.compareHash(password))) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
      return res.status(200).json({ token: await employee.generateToken() });
    } catch (err) {
      return res
        .status(400)
        .json({ error: "An error occured when try signin" });
    }
  }

  public async SignUp(req: Request, res: Response): Promise<Response> {
    try {
      const { email, cpf } = req.body;
      if (await Employee.findOne({ email })) {
        return res.status(400).json({ error: "E-mail already registered" });
      } else if (await Employee.findOne({ cpf })) {
        return res.status(400).json({ error: "Cpf already registered" });
      }
      const employee = new Employee(req.body);
      return await employee.save().then((response: IEmployee) => {
        return res
          .status(201)
          .json({ message: "Employee registered successfully" });
      });
    } catch (err) {
      return res
        .status(400)
        .json({ error: "An error occured when try signup: " + err });
    }
  }
}

export default new AuthenticationController();
