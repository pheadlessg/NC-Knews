const userRouter = require('express').Router();
const {
  getUsers, getSingleUser,
} = require('../controllers/usersController');

userRouter.get('/:user_id', getSingleUser);
userRouter.get('/', getUsers);

module.exports = userRouter;
