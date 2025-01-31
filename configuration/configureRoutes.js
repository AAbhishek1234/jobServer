
import userRoute from '../routes/userRoute.js'
import companyRoute from '../routes/companyRoute.js'
export const configureRoutes=(app)=>{
    
     app.use("/user",userRoute);
     app.use("/company",companyRoute)
     
}