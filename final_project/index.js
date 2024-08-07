const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
const secret = "123456";
app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
    //login yet?
    let tkn = req.header('Authorization');
    if(!tkn){
        return res.status(401).json({"message":"No token found. You need to login with your username and password "})
    }

    if(tkn.startsWith('Bearer ')){ //yes loggedin
        let tokenValue = tkn.slice(7, tkn.length).trimLeft();
        let verificationobj = jwt.verify(tokenvalue, secret);
        if(verificationobj.user=="user"){
            console.log("verification Successful");
            next();            
        }else{ //No not login
            console.log("verification Not Successful");
            return res.status(401).json({"message":"Access Denied: you need to login with your username and password "})
        }
    }else{ //No not login
        console.log("verification Not Successful");
        return res.status(401).json({"message":"Access Denied: you need to login with your username and password "})
    }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
