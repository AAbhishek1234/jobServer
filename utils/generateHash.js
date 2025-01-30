import bcrypt from 'bcrypt'

export const generateHashPassword=async(password)=>{

    try{
        let salt = await bcrypt.genSalt(10);

        let hashPassword =await bcrypt.hash(password,salt);
        return hashPassword;
    }
    catch(error){
        console.log(error);
    }
}