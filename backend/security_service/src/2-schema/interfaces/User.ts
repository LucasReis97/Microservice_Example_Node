import { Document } from 'mongoose'

export interface UserDocument extends Document{
    firstName: string,
    lastName:string,
    email:string,
    cpf:string,
    password:string,
    fullname():string,
    generateToken(): Promise<string>,
    compareHash(hash: string): Promise<boolean>
  }
