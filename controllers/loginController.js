const Users = require('../models/users');
const config = require('../utils/config');
const bcrypt = require('bcrypt')

const loginController = {
    login : async(req,res) => {
      try{
        const { email, password } = req.body;
        console.log("email:",email,"--","pwd:",password)
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const passwordHash = user.password

        console.log("account status:",user.is_active)

        if(user.is_active=='A'){
        // if the username exists, compare the password
        const isPasswordCorrect = await bcrypt.compare(password, passwordHash)
        console.log("pwd bcrypt:",isPasswordCorrect)
        // if the password is incorrect, return an error
        if (!isPasswordCorrect) {
            return response.status(400).send({ error: 'Invalid password' });
        }
        
        // return a success message and the token
        res.status(200).send({ message: 'Login successful'});
    }
    else{
        res.status(500).send({ error: 'Kindly Activate your Account' });
    }
    } catch (error) {
        res.status(500).send({ error: "Login Failed, verify Credentials" });
    }
    }
}
module.exports = loginController