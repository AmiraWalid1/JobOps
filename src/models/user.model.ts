import {prop} from '@typegoose/typegoose';
import {getModelForClass} from '@typegoose/typegoose';

export class User {
  @prop({required: true})
  public name!: string;

  @prop({required: true, unique: true})
  public email!: string;

  @prop({required: true})
  public password!: string;

  @prop()
  public Rate!: number;

  @prop({default: 'seeker', enum: ['seeker', 'employer']})
  public Role!: string;

  @prop({required: true})
  public phoneNumber!: string;

  @prop({default: Date.now()})
  public createdAt!: Date;
}

// إنشاء الـ model
export const UserModel = getModelForClass(User);
