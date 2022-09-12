import db from "./connection";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      return login(req, res);
    }
  }
}

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    return res.status(202).json({ status: 400, message: "Email Is Required." });
  }
  if (!password) {
    return res
      .status(202)
      .json({ status: 400, message: "Password Is Required." });
  }

  const users = await db.collection("ca_users").aggregate([
    { $match: { email: email } },
    {
      $lookup: {
        from: "ca_role_map",
        as: "role_details",
        localField: "_id",
        foreignField: "user_id",
      },
    },
    {
      $project: { user_id: 1, first_name: 1, last_name: 1, full_name: 1, org_id: 1, org_code: 1, role: 1, email: 1, login_status: 1, last_login_time: 1, status: 1, password: 1, role_details: 1 },
    },
  ]);

  users.toArray((error, result) => {
      if (error) {
        return res.status(202).json({ status: 400, message: error });
      }

      if (result[0]) {
        var user = result[0];
        var data = bcrypt.compareSync(password, user.password);
        
        if (data) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });

          delete user['password'];

          // res.cookie("token", token, { expiresIn: "1d" });
          res.status(200).json({
            token,
            user: JSON.stringify(user),
            status: 200,
            message: "Logged in successfully",
          });
        } else {
          return res.status(202).json({
            status: 400,
            message: "Invalid Credentials",
          });
        }
      } else {
        return res.status(202).json({
          message: "Invalid Credentials",
        });
      }
    });
}
