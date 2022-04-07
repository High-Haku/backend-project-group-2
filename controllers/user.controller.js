const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const accessTokenSecret = process.env.ACCESS;

module.exports = {
  getAll: async (req, res) => {
    const { role } = req.user;
    if (role === "admin") {
      const users = await userModels.find({}, "-_v");
      try {
        res.json({
          massage: "berhasil ambil data user",
          data: users,
        });
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    }else{
      res.send('anda bukan admin')
    }
  
  },

  getByID: async (req, res) => {
    const { role } = req.user;
    
    if (role === "admin" || role === "member") {
      const users = await userModels.findById(req.params.id);
      try {
        res.json({
          message: "berhasil ambil data user",
          data: users,
        });
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    } else { 
        res.send("Please, login first. Thanks");
    }
  },

  //Register
  addUser: async (req, res) => {
    const data = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);
    data.password = hash;

    try {
      await userModels.create(data);
      console.log(data);
      res.json({
        message: "berhasil input data",
        data: 1,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  //Login
  addUserLogin: async (req, res) => {
    const { email, password } = req.body;
    
    const user = await userModels.findOne({email: email});
    const unHAsh = bcrypt.compareSync(password, user.password)

    try {
      if (user && unHAsh) {
        const accessToken = jwt.sign(
          { email: user.email, role : user.role  },
          accessTokenSecret
        );
        res.json({
          accessToken,
        });
      } else {
        res.send("Email atau password salah");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // update
  updateUser: async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const { role } = req.user;
    
    if (role === "admin" || role === "member") {
      try {
        await userModels.findByIdAndUpdate(id, data);
        res.json({
          massage: `User ${id} data updated`,
          data: data,
        });
      } catch (eror) {
        res.status(500).send(eror);
      }
    } else {
        res.send("Please, login first. Thanks");
    }
  },

  // delete
  deleteUser: async (req, res) => {
    const { role } = req.user;
    const id = req.params.id;
    
    if (role === "admin" || role === "member") {
      await userModels.deleteOne({ _id: id });
      try {
        res.json({
          massage: `Success delete data ${id}`,
        });
      } catch (eror) {
        res.status(500).send(eror);
      }
    } else {
        res.send("Please, login first. Thanks"); 
    }
  },

  logoutUser: async (req, res) => {
  
    //   try {
  //     let randomNumberToAppend = toString(Math.floor((Math.random() * 1000) + 1));
  //     let hashedRandomNumberToAppend = await bcrypt.hash(randomNumberToAppend, 10);

  //     req.token = req.token + hashedRandomNumberToAppend;
  //     console.log(req.token)
  //     res.status(200).json("Success Logout");
  //   } catch (error) {
  //     res.status(500).json("Error Logout");
  //   }
  // 
  }
};
