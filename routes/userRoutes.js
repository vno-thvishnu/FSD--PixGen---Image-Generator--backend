import express from 'express'
import User from '../mongodb/models/User.js'
import bcrypt from 'bcrypt'
const router = express.Router()


router.route('/signup').post(async(req,res)=>{
    delete req.body.confirmpassword;
    const { email, password, name } =
      req.body;
    const findemail = await User.findOne({ email: email });
    const findname = await User.findOne({ name: name });
    try {
      if (!findemail && !findname) {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
  
        const newUser = new User({
          email,
          password: hashpassword,
          name
        });
  
        await newUser.save();
        res.status(200).json({ message: "Registered Successfully" });
      } else {
        if (findemail && !findname) {
          res.status(200).json({ message: "Email-id already in use" });
        } else if (findname && !findemail) {
          res.status(200).json({ message: "name already in use" });
        } else if (findemail && email) {
          res
            .status(200)
            .json({ message: "Email-id or name already in use" });
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
})

router.route('/login').post(async(req,res)=>{
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const validity = await bcrypt.compare(password, user.password);
  
        if (validity) {
          const { password, ...otherDetails } = user._doc;
          res.status(200).json({ otherDetails, message: "Login Successfully" });
        } else {
          res.status(200).json({ message: "Username or Password incorrect" });
        }
      } else {
        res.status(200).json({ message: "User does not exists" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

})

export default router
