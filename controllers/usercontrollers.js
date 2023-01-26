const User=require("../models/usermodel");
exports.signup=async(req,res,next)=>{
    try{
        const user=await User.create(req.body);
        res.status(201).json(
            {
                status:"success",
                data:user
            }
        )
    }
    catch(e){
        res.status(400).json({
            status:"failed"
        })
    }
};

exports.login=async(req,res,next)=>{
    const {username,password} = req.body;
    try{
        const user=await User.findOne({username});
        if(!user)
        {
            return res.status(404).json({
                status:"failed"
            })
        }
        const result= password==user.password;
        if(result){
            req.session.user=user;
            return res.json({
                status:"logged in"
            })
        }
        else
        {
            return res.status(404).json({
                status:"password not matching"
            })
        }
    }
    catch(e){
        res.status(400).json({
            status:"failed"
        })
    }
};