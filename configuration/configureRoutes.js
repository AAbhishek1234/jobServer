
import userRoute from '../routes/userRoute.js'
import companyRoute from '../routes/companyRoute.js'
import jobRoute from '../routes/jobRoute.js'
import  applicationRoute  from '../routes/applicationRoute.js'
export const configureRoutes=(app)=>{
    
     app.use("/user",userRoute);
     app.use("/company",companyRoute);
     app.use("/job",jobRoute);
     app.use("/application",applicationRoute)
     
}