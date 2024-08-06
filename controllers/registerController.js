const Users = require('../models/users');
const Tokengen = require('../models/tokengen');

const bcrypt = require('bcrypt');
const crypto = require('crypto')

const config = require('../utils/config');
const sendEmail = require('../utils/sendEmail')


// define the user controller
const userController = {
    // define the register method
    register: async (req, res) => {
        try {
            // get the user input from the request body
            const { firstname, lastname, email, password } = req.body;

            // check if the username already exists in the database
            const user_data = await Users.findOne({ email });

            // if the username exists, return an error
            if (user_data) {
                return res.status(400).json({ error: 'User already exists' })
            }

            // hash the password
            const passwordHash = await bcrypt.hash(password, 10);

            // if the username does not exist, create a new user
            const newUser = new Users({
                firstname,
                lastname,
                email,
                password : passwordHash
            });

            // save the user in the database
            await newUser.save()
                .then(async () => {
                    const user = await Users.findOne({"email" : email});

                    let token = await Tokengen.findOne({ "userId" : user._id.toString()});
                    console.log(token)
            
                    let user_name = user.firstname
                    let userId = user._id.toString()
                    let tokenStr = crypto.randomBytes(32).toString("hex")
            
                    if (!token) {
                        token =  new Tokengen({
                            userId,
                            tokenStr
                        })
                        await token.save()
                        const BASE_URL = process.env.BASE_URL
                        const link = `${BASE_URL}/activateAccount/${userId}/${token.tokenStr}`
            
                        console.log("LINK:",link)
            
                        await sendEmail(user_name, email, "Account Activation-Sending Email using Node.js", link)
                        
                        // res.status(200).send({message:"Account Activation link sent to your Email account"})
                    }
                    else
                        res.status(400).send({error:"Account Activation link already sent to your Email account"})
                })

            // return a success message and the saved user
            res.json({ message: 'Account Activation link sent to your Email account'});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    activateAccount : async(req, res) => {
        try{
            const userId = req.params.userId
            const tokenStr = req.params.tokenStr

            console.log("USERID:",userId)

            const user = await Users.findOne({"_id" : userId.toString()});
            console.log("user:",user)

            if(user!=null && user.is_active=="I"){
            console.log("#inside if above token validatn")
            
            const token = await Tokengen.findOne({
                userId : userId,
                tokenStr : tokenStr
            })
            console.log("#Token_Data:",token)

                if (!token) {
                    await user.deleteOne()
                    return res.status(400).json({error:"Activation Token expired, kindly Register"});
                }else{
                    user.is_active = "A"
                    await user.save()
                    .then(async ()=>{
                        await token.deleteOne()
                    }).catch(error => {
                        console.log("#error within token:",error)
                    })
                    res.json({message:"Account Activated sucessfully"})
                }
        }else if(user.is_active=="A")   
            return res.status(400).json({error:"User already ACTIVATED, kindly Login"});
        
        else
            return res.status(400).json({error:"Invalid User, kindly Register"});

        }catch(error){
            res.status(400).send({error:"Error while verifying the User/Activation Token, kindly enter valid details"});
           }
    }
} 

// Export the controller
module.exports = userController;