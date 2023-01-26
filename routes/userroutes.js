const express=require("express")
const userController = require("../controllers/usercontrollers");
const router = express.Router();
router.post('/signup',userController.signup);
router.post('/login',userController.login);
module.exports=router;