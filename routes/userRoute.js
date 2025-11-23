const express = require('express');
const user_route = express();

const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

const multer = require('multer');
const path = require('path');

user_route.use(express.static('public'));

const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/userImages'),function(error,sucess) {
            if(error){
                throw error;
            }
        });
    },
    filename:function(req,file,cb){
        const name=Date.now()+'-'+file.originalname;
        cb(null,name,function(error1,sucess1) {
            if(error1){
                throw error1;
            }
        });
    }
});


const upload=multer({storage:storage});

const user_controller=require('../controller/usercontroller');

user_route.post('/resister_user',upload.single('image'),user_controller.resister_user);

user_route.get('/find_user_by_email',user_controller.find_user_by_email);

user_route.delete('/find_and_delete',user_controller.find_and_delete);

module.exports=user_route;