import {prop, getModelForClass, Ref} from '@typegoose/typegoose';
import {User} from './user.model';

export class Review {
  @prop({ref: () => User, required: true})
  public reviewerId!: Ref<User>; // Reviewer

  @prop({ref: () => User, required: true})
  public employerId!: Ref<User>; // Employer being reviewed

  @prop({required: true, min: 1, max: 5})
  public rating!: number; // Rating (1-5 stars)

  @prop({required: true})
  public comment!: string; // Review text

  @prop({default: Date.now})
  public createdAt?: Date; // Timestamp
}

export const ReviewModel = getModelForClass(Review);
