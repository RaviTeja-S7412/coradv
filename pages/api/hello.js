import db from "./connection";

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const multer  = require('multer');
// const path = require('path');

// const users = db.collection("tbl_auths");
// const employees = db.collection("tbl_employees");

export default async function get_singleuser(req, res) {

    let users = await db.collection("ca_roles").find({}).toArray();
    return res.status(200).json({ user_data: users }); 

}

