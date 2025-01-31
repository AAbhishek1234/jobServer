import Job from "../models/Job.js";
import { Application } from "../models/Application.js";


export const applyJob = async (req,res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"jon id is required",
                success:false
            })
        }
        //check if user has already applied for the job
        const existingApplication = await Application.findOne({job:jobId,applicant:userId})
        if (existingApplication) {
            return res.status(400).json({
                message:"you already applied for this job",
                success:false
            })
        }
        //check if the jobs exists
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        }
        //create new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        })
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"job applied successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}



//jitni bhi job applied kri hai user ne
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({created:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
            }
        })
if (!application) {
    return res.status(404).json({
        message:"no Applications",
        success:false
    })
}
return res.status(200).json({
    application,
    success:true
})
    } catch (error) {
        console.log(error)
    }
}




//admin find applicants on job how many applied

export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
const job = await Job.findById(jobId).populate({
    path:"applications",
    options:{sort:{createdAt:-1}},
    populate:{
        path:'applicant'
    }
})
if (!job) {
    return res.status(404).json({
        message:"job not found",
        success:false
    })
    
}
return res.status(200).json({
    job,
    success:true
})
    } catch (error) {
        console.log(error);
        
    }
}




//check status


export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:"status "
            })
        }
        //find application by application id

        const application = await Application.findOne({_id:applicationId});
        if (!application) {
            return res.status(404).json({
                message:"Application not found",
                success:false
            })
        }
        //update the status
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message:"Status update successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}