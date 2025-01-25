import {prop, getModelForClass, Ref} from '@typegoose/typegoose';
import {User} from './user.model';
import {Job} from './job.model';

// Define the Application Class
export class Application {
  @prop({ref: () => User, required: true})
  public seekerId!: Ref<User>;

  @prop({ref: () => Job, required: true})
  public jobId!: Ref<Job>;

  @prop({
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
    required: true,
  })
  public status!: string;

  @prop({required: true})
  public cv!: string;
}

export const ApplicationModel = getModelForClass(Application, {
  schemaOptions: {timestamps: true}, // Automatically add createdAt and updatedAt
});
