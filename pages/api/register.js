import db from "./connection";
const bcrypt = require('bcrypt');

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': {
            return register(req, res);
        }
    }
}

async function register(req, res) {

    const fname = req.body.first_name;
    const lname = req.body.last_name;
    const role = req.body.role;
    const email = req.body.email;
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    const users = await db.collection('ca_users')

    if(!fname){
        return res.status(202).json({ status:400, message: "First Name Is Required." }); 
    }
    if(!lname){
        return res.status(202).json({ status:400, message: "Last Name Is Required." }); 
    }
    if(!role){
        return res.status(202).json({ status:400, message: "Role Is Required." }); 
    }
    if(!email){
        return res.status(202).json({ status:400, message: "Email Is Required." }); 
    }
    if(!password){
        return res.status(202).json({ status:400, message: "Password Is Required." }); 
    }
    if(!cpassword){
        return res.status(202).json({ status:400, message: "Confirm Password Is Required." }); 
    }

    if(password !== cpassword){
        return res.status(202).json({ status:400, message: "Password & Confirm Password doesn't Match." });
    }

    users.find({email:email}).count(function(cerr, count){
        if(count == 0){
            var user_data = {
                "first_name": fname,
                "last_name": lname,
                "role": role,
                "email": email,
                "password": bcrypt.hashSync(password, 10),
                "created_date": new Date(),
                "updated_date": "",
                "login_status": 0,
                "last_login_time": "",
                "status" : 1,
                "deleted" : 0
            }
            users.insertOne(user_data, function (error, result) {
                if (error) {
                    return res.status(202).json({
                        status:400,
                        message: 'error occured'
                    });
                }

                if (result) {
                    return res.status(200).json({
                        status:200,
                        message: "Registered Successfully"
                    })
                }
            });
        }else{
            return res.status(202).json({ status:400, message: "Email Already Registered." });
        }
    })

}