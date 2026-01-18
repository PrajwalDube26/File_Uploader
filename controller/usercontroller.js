const user=require('../model/usermodel');
const bcryptjs=require('bcryptjs');

const resister_user=async(req,res)=>{
    try 
    {
        const new_user =new user({
            name:req.body.name,
            email:req.body.email,
            password:await bcryptjs.hash(req.body.password,10),
            image:req.file.path,
            mobile:req.body.mobile,
            type:req.body.type
        });

        const email_avail=await user.findOne({email:req.body.email});
        if(email_avail)
        {
            res.status(400).json({succes:false,message:"Email already exist"});
        }
        await new_user.save();
        return res.status(200).json({succes:true,message:"user resister succesfully"});
    } 
    catch (error) 
    {
        res.status(400).json({succes:false,message:error.message})
    }
}

const find_user_by_email=async(req,res)=>{
    try {
        const email=req.query.email;
        const User=await user.findOne({email:email}).select("-password");

        if(User)
        {
            return res.status(200).send({succes:true,data:User});
        }
        else
        {
            res.status(300).send({succes:false,message:"User not found"})
        }

    } 
    catch (error) 
    {
        res.status(400).send({succes:false,message:error.message})
        
    }
}

const find_and_delete=async(req,res)=>{
    try {
        const email=req.query.email;
        const User=await user.findOneAndDelete({email:email});

        if(User)
        {
            return res.status(200).send({succes:true,message:"User deleted succesfully"});
        }
        else
        {
            res.status(300).send({succes:false,message:"User not found"});
        }
        
    } 
    catch (error) {
        res.status(400).send({succes:false,message:error.message});
    }
}

module.exports={
    resister_user,
    find_user_by_email,
    find_and_delete
};