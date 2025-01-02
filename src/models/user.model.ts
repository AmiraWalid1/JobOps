import {prop} from '@typegoose/typegoose';
import {getModelForClass} from '@typegoose/typegoose';

type Role = 'seeker' | 'employer';

export class User {
  @prop({required: true})
  public name!: string;

  @prop({required: true})
  public email!: string;

  @prop({required: true})
  public password!: string;

  @prop({required: true})
  public Rate!: number;

  @prop({required: true})
  public Role!: Role;

  @prop({required: true})
  public phoneNumber!: string;
}

// إنشاء الـ model
export const UserModel = getModelForClass(User);
