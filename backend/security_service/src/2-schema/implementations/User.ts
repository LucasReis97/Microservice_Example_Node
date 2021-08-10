import { Schema, model } from 'mongoose'
import { UserDocument } from '../interfaces/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const UserSchema = new Schema<UserDocument>({
  firstName: { require: true, type: String },
  lastName: { require: true, type: String },
  email: { type: String, unique: true, required: true, lowercase: true },
  cpf: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true }
},
{
  timestamps: true
})

UserSchema.pre('save', async function hashPassword (next) {
  if (!this.isModified('password')) next()

  this.password = await bcrypt.hash(this.password, 8)
})

UserSchema.methods.fullname = function (): string {
  return this.firstName.trim() + ' ' + this.lastName.trim()
}

UserSchema.methods.compareHash = async function (hash: string): Promise<boolean> {
  return await bcrypt.compare(hash, this.password)
}

UserSchema.methods.generateToken = async function (): Promise<string> {
  return jwt.sign({ id: this.id }, String(process.env.SECRET_JWT), {
    expiresIn: 3600
  })
}

export default model<UserDocument>('User', UserSchema)
