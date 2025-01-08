import {prop, getModelForClass, Ref} from '@typegoose/typegoose';
import { User } from './user.model';

// Define the Job Class
export class Job {
    @prop({required: true})
    public title!: string;
    
    @prop({required: true})
    public type!: string;  // E.g., "Full-Time", "Part-Time"

    @prop({required: true})
    public description!: string;

    @prop({required: true})
    public location!: string;
    
    @prop({ enum: ['Entry-Level', 'Mid-Level', 'Senior'], required: true })
    public experienceLevel!: string;

    @prop({ref: () => User, required: true})
    public employerId!: Ref<User>;

    @prop({ default: Date.now })
    public postedAt!: Date;

    @prop({ required: true })
    public applicationDeadline!: Date;

    @prop({ enum: ['Active', 'Closed'], default: 'Active' })
    public status!: string;

    @prop()
    public salaryMin?: number;

    @prop()
    public salaryMax?: number;
    
    @prop({ type: () => [String] , default: []})
    public requiredSkills?: string[];

}

export const JobModel = getModelForClass(Job);
  