const User = require('../models/user.model');
const bcrypt=require("bcrypt");



exports.createUser = async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;

        // Check if any required field is missing
        if (![email, password].every(field => field?.trim())) {
            return res.status(400).json({ message: "email ,password  fields are required!" });
        }

        // Check if the email already exists
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        // Hash the password before saving

        // Create new user
        const newUser = await User.create({ 
            email, 
            firstName, 
            lastName, 
            password 
        });

        // Generate auth token (if applicable)
        const token = await newUser.generateAuthToken();

        return res.status(201).json({ user: newUser, token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error!" });
    }

};
exports.loginuser=( async (req, res) => {
    
    try {
        const { email, password } = req.body;
        if (!(email)) {
            return res.status(400).json({message:"email is required!"})
        }

        const user = await User.findOne({email:email})

        if (!user) {
            return res.status(404).json({message: "User does not exist!"})
        }

          // Compare the provided password with the hashed password stored in the database
         
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Stored Hashed Password:", user.password);  // Debugging lo

          if (!passwordMatch) {
              return res.status(401).json({ message: "Incorrect password!" });
          }

      return  res.status(200).json({user});
    } catch (error) {
       return res.status(500).json({ message: "Internal server Error !!"});
    }
});







