const User = require('../models/user.model');
const bcrypt=require("bcrypt");
const { uploadOnCloudinary } = require('../middlewares/cloudinary');



exports.createUser = async (req, res) => {
    try {
        const {email,username,firstName,lastName,password}=req.body;
        
        if (
            [email,username,firstName,lastName,password].some((field) => field?.trim() === "")
        ) {
            return res.status(400).json({message:"All fields are Required!"})
        }
        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        })
    
        if (existedUser) {
            return res.status(400).json({message:"Username or Email already exist!"})
        }

        const newUser = await User.create({email,username,firstName,lastName,password});

        const token = await newUser.generateAuthToken();
       return res.status(201).json(newUser);
    } catch (err) {
      return  res.status(500).json({ message: "Internal server Error!"});
    }

};
exports.loginuser=( async (req, res) => {
    
    try {
        const { email,username, password } = req.body;
        if (!(username || email)) {
            return res.status(400).json({message:"username or email is required!"})
        }

        const user = await User.findOne({
            $or: [{username}, {email}]
        })

        if (!user) {
            return res.status(404).json({message: "User does not exist!"})
        }

          // Compare the provided password with the hashed password stored in the database
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
              return res.status(401).json({ message: "Incorrect password!" });
          }

      return  res.status(200).json({user});
    } catch (error) {
       return res.status(500).json({ message: "Internal server Error !!"});
    }
});







