import Job from '../models/Job.js'


export const postJob = async (req,res) => {
    try {
    const {title,description,requirements,salary,location,jobType,experience,position,companyId} = req.body;
    const userId = req.user?.userId;
    if (!title|| !description ||!requirements || !salary || !location ||!jobType ||!experience ||!position ||!companyId) {
        return res.status(400).json({
            message:"something is missing",
            success:false
        })
    }
    const job = await Job.create({
        title,
        description,
        requirements:requirements.split(","),
        salary,
        location,
        jobType,
        experience,
        position,
        company:companyId,
        created_by:userId
    })
    return res.status(201).json({
        message:"created job",
        job,
        success:true
    })
    } catch (error) {
        console.log(error);
        
    }
}




export const getAllJobs = async (req,res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]
        };
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt: -1});
        if(!jobs){
            return res.status(404).json({
                message:"no job found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}



//student 
export const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({
                message :"no job found",
                success:true
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

//kitne job daale abhi tk
export const getAdminJobs = async (req,res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({
                message:"no job found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true

        })
    } catch (error) {
        console.log(error);
        
    }
}

