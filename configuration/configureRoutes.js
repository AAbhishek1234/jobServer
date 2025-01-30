
import userRoute from '../routes/userRoute.js'

export const configureRoutes=(app)=>{
    
     app.use("/user",userRoute);
     
}