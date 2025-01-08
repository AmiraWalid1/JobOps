import { Request, Response } from 'express';
import { ApplicationModel } from '../models/application.model';
import { UserModel } from '../models/user.model';
import { JobModel } from '../models/job.model';

export const createApplication = async (req: Request, res: Response): Promise<void> => {
    try {
        const { seekerId, jobId, status, cv } = req.body;
        
        // Validation for required fields
        if (!seekerId || !jobId || !cv ) {
            res.status(400).json({message: 'Missing required fields'});
        }
        
        // Create the application
        const application = new ApplicationModel({
            seekerId,
            jobId,
            status: status || 'pending',  // Default to "pending" if no status is provided
            cv,
        });
        
        // Save the application to the database
        await application.save();

        res.status(201).json({ message: 'Application created successfully', application });
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

