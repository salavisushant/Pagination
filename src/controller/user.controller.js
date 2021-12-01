const express = require('express');

const router = express.Router();

const transporter = require("../configs/mail")

const User = require('../models/user.model')

router.post('/',async (req, res) => {
    try {
        const user = await User.create(req.body);

        if (req.body.role == "admin") {
            transporter.sendMail({
                from: "masai@school.com",
                to:req.body.email,
                subject:`Welcome to ABC system ${req.body.first_name} ${req.body.last_name}`,
                text:` Hi ${req.body.first_name}, Please confirm your email address`,
                html:`<h1>Welcome to ABC corp</h1>`
            });
          } else {
            const count = await User.find({ user: { $eq: "admin" } }).count();
            for (var i = 0; i < count; i++) {
              var admin = await User.find({ user: { $eq: "admin" } }).skip(i).limit(1);
              admin = admin[0].email
              transporter.sendMail({
                from:"masai@school.com",
                to:admin,
                subject:`${req.body.first_name}  ${req.body.last_name} has registered with us`,
                text: `Please welcome ${req.body.first_name} ${req.body.last_name}`,
                html:`<h1>New user Signed In</h1>`
              });
            }
          }
      
        return res.status(201).json({user})
    } catch (e) {
        return res.status(500).json({status:Failed,message:e.message});
    }
    
})

router.get('/',async (req, res) => {
    try {
        const page = +req.query.page;
        const size = +req.query.size;

        const skip = (page-1) * size;
        const user = await User.find().skip(skip).limit(size).lean().exec();
        const totalPages = Math.ceil((await User.find().countDocuments())/size)
        return res.json({user});

    } catch (e) {
        return res.status(500).json({status:Failed,message:e.message});
    }
    
})

module.exports = router;