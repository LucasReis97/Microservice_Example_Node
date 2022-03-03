import { Schema, model, Document } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export interface IEmployee extends Document{
  firstName: string,
  lastName:string,
  email:string,
  cpf:string,
  password:string,
  generateToken(): Promise<string>,
  compareHash(hash: string): Promise<boolean>
}


const Employee = new Schema<IEmployee>({
  firstName: { require: true, type: String },
  lastName: { require: true, type: String },
  email: { type: String, unique: true, required: true, lowercase: true },
  cpf: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true }
},
{
  timestamps: true
})

Employee.pre('save', async function hashPassword (next) {
  if (!this.isModified('password')) next()

  this.password = await bcrypt.hash(this.password, 8)
})

Employee.methods.compareHash = async function (hash: string): Promise<boolean> {
  return await bcrypt.compare(hash, this.password)
}

Employee.methods.generateToken = async function (): Promise<string> {
  return jwt.sign({ id: this.id }, String(process.env.SECRET_JWT), {
    expiresIn: 3600
  })
}

export default model<IEmployee>('Employee', Employee)
