const express = require("express")
const userRouter = express.Router()
const {userController} = require("../controller")
const {routeConstant:{USER}} = require("../constant")
const {userValidation} = require("../validation/userValidation")
userRouter.post(USER.USERS,userValidation , userController.createUser)
userRouter.get(USER.USERS , userController.getUser)

userRouter.get(USER.BY_ID , userController.getUserById)
userRouter.delete(USER.BY_ID , userController.deleteUserById)
userRouter.put(USER.BY_ID , userValidation,userController.updateUserById)



module.exports = {
    userRouter
}