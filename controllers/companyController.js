import Company from '../models/Company.js'


export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        const userId = req.user?.userId; // Extract userId correctly

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized: No user ID found.",
                success: false,
            });
        }

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            });
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You cannot register the same company twice",
                success: false,
            });
        }

        company = await Company.create({
            name: companyName,
            userId: userId, 
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true,
        });
    } catch (error) {
        console.error("Error in registerCompany:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};




export const getCompany =  async (req,res) => {
 try {
    const userId = req.id;
    const companies = await Company.find({userId})
    if(!companies){
        return res.status(404).json({
            message:"comapanies not found ",
            success:false
        })
    }
    return res.status(200).json({
        companies,
        success:true
    })
 } catch (error) {
    console.log(error);
    
 }   
}





export const getCompanyById = async (req,res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"company not found ",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}



export const updatedCompany = async(req,res)=>{
    try {
        const{name,description,website,location}=req.body;
        const file = req.file;

        const updateData = {name,description,website,location};
        const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});
        if (!company) {
            return res.status(404).json({
                message:"company not found",
                success:true
            })
            
        }
        return res.status(200).json({
            message:"update",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}