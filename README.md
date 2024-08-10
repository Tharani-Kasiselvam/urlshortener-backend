## URL Shortner
*created using node js*

*Postman API Documentation* : https://documenter.getpostman.com/view/36133215/2sA3s3HBTD   
   
*Register New User* : https://clean-ease-backend.onrender.com/register       

*Login User* : https://clean-ease-backend.onrender.com/login   

*Create Password Reset Token Link* : https://clean-ease-backend.onrender.com/forgotpwd   

*Password Reset* : https://clean-ease-backend.onrender.com/password-reset/:userId/:tokenStr    

*Pusblish Cleaning Services List* : https://clean-ease-backend.onrender.com/services   

*Account Activation* : http://localhost:5001/activateAccount/$userId/$tokenstr   

*Logout User* : https://clean-ease-backend.onrender.com/logout   

***Functionality:***
&emsp;a. *mongoose* - to connect with MongoDB, DB Model creation and the schema connectivity to fetch the Collections. 
&emsp;b. *express* - to create express server.     
&emsp;c. *morgan* - to enable logger.   
&emsp;d. *cors* - middleware to enable cross-origin requests from difference domain.   
&emsp;e. *dotenv* - to create Environment Variables.   
&emsp;f. *nodemailer* - to send external emails from Nodejs.   
&emsp;g. *router* - express router to handle the routes.   
&emsp;h. *crypto* - it is used to generate random strig for Token generation.   
&emsp;i. *joi* - it is used to validate the DB Schema and its corresponding fields.   
&emsp;j. *jsonwebtoken* - to generate web token.   

***Author : Tharani K***