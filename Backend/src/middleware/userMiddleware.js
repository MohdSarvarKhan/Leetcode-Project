const jwt = require('jsonwebtoken');

const userMiddleware = async(req,res)=>{

    const {token} = req.cookies;

    if(!token)
        throw new Error("Token Not Available");
        const payload = jwt.verify(token,process.env.JWT_KEY)

}