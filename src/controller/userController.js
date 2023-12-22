require("dotenv").config();
const { httpMessage, httpConstant } = require("../constant");
const { v4: uuidv4, validate } = require("uuid");
const User = [];
exports.createUser = async (req, res) => {
  try {
    req.body.id = uuidv4();
    User.push(req.body);
    return res.status(httpConstant.CREATED).json({
      statusCode: httpConstant.CREATED,
      messsage: httpMessage.USER_SIGNUP,
      data: req.body,
    });
  } catch (err) {
    return res.status(httpConstant.INTERNAL_SERVER_ERROR).json({
      statusCode: httpConstant.INTERNAL_SERVER_ERROR,
      messsage: err.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    return res.status(httpConstant.OK).json({
      statusCode: httpConstant.OK,
      messsage: httpMessage.GET_USER_LIST,
      data: User,
    });
  } catch (err) {
    return res.status(httpConstant.INTERNAL_SERVER_ERROR).json({
      statusCode: httpConstant.INTERNAL_SERVER_ERROR,
      messsage: err.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!validate(userId)) {
      return res.status(httpConstant.BAD_REQUEST).json({
        statusCode: httpConstant.BAD_REQUEST,
        messsage: httpMessage.INVALID_ID,
      });
    }
    const userData = await User.find((ele) => ele.id === userId);
    if (!userData) {
      return res.status(httpConstant.NOT_FOUND).json({
        statusCode: httpConstant.NOT_FOUND,
        messsage: httpMessage.USER_NOT_FOUND,
      });
    }
    return res.status(httpConstant.OK).json({
      statusCode: httpConstant.OK,
      messsage: httpMessage.GET_USER_BY_ID,
      data: userData,
    });
  } catch (err) {
    return res.status(httpConstant.INTERNAL_SERVER_ERROR).json({
      statusCode: httpConstant.INTERNAL_SERVER_ERROR,
      messsage: err.message,
    });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!validate(userId)) {
      return res.status(httpConstant.BAD_REQUEST).json({
        statusCode: httpConstant.BAD_REQUEST,
        messsage: httpMessage.INVALID_ID,
      });
    }
    const userData = await User.find((ele) => ele.id === userId);
    if (!userData) {
      return res.status(httpConstant.NOT_FOUND).json({
        statusCode: httpConstant.NOT_FOUND,
        messsage: httpMessage.USER_NOT_FOUND,
      });
    }
    User.forEach((p) =>
      p.id === userId
        ? {
            id: userId,
            userName: req.body?.userName ? req.body?.userName : p.userName,
            age: req.body?.age ? req.body?.age : p.age,
            hobbies: req.body?.hobbies ? req.body?.hobbies : p.hobbies,
          }
        : p
    );
    return res.status(httpConstant.OK).json({
      statusCode: httpConstant.OK,
      messsage: httpMessage.UPDATE_USER_BY_ID,
      data: updateUserData,
    });
  } catch (err) {
    return res.status(httpConstant.INTERNAL_SERVER_ERROR).json({
      statusCode: httpConstant.INTERNAL_SERVER_ERROR,
      messsage: err.message,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!validate(userId)) {
      return res.status(httpConstant.BAD_REQUEST).json({
        statusCode: httpConstant.BAD_REQUEST,
        messsage: httpMessage.INVALID_ID,
      });
    }
    const userData = User.findIndex((ele) => ele.id === userId);
    if (userData == -1) {
      return res.status(httpConstant.NOT_FOUND).json({
        statusCode: httpConstant.NOT_FOUND,
        messsage: httpMessage.USER_NOT_FOUND,
      });
    }
    User.splice(userData, 1);
    return res.status(httpConstant.DELETED).json({
      statusCode: httpConstant.DELETED,
      messsage: httpMessage.DELETE_USER_BY_ID,
    });
  } catch (err) {
    return res.status(httpConstant.INTERNAL_SERVER_ERROR).json({
      statusCode: httpConstant.INTERNAL_SERVER_ERROR,
      messsage: err.message,
    });
  }
};
