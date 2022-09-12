import db from '../connection'

export default async function roles(req,res){

    const roles = await db.collection("ca_roles"); 
    roles.find({}).toArray(function(err,roles){
        if(err){
            return res.status(202).json({ message: "Error Occured Please Try Again." }); 
        }
        return res.status(200).json({ roles: roles }); 
    });
    
}