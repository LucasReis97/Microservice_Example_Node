import { Schema, model, Document } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export interface IUser extends Document{
  firstName: string,
  lastName:string,
  email:string,
  cpf:string,
  password:string,
  fullname():string,
  generateToken(): Promise<string>,
  compareHash(hash: string): Promise<boolean>
}


const User = new Schema<IUser>({
  firstName: { require: true, type: String },
  lastName: { require: true, type: String },
  email: { type: String, unique: true, required: true, lowercase: true },
  cpf: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true }
},
{
  timestamps: true
})

User.pre('save', async function hashPassword (next) {
  if (!this.isModified('password')) next()

  this.password = await bcrypt.hash(this.password, 8)
})

User.methods.fullname = function (): string {
  return this.firstName.trim() + ' ' + this.lastName.trim()
}

User.methods.compareHash = async function (hash: string): Promise<boolean> {
  return await bcrypt.compare(hash, this.password)
}

User.methods.generateToken = async function (): Promise<string> {
  return jwt.sign({ id: this.id }, String(process.env.SECRET_JWT), {
    expiresIn: 3600
  })
}

export default model<IUser>('User', User)
