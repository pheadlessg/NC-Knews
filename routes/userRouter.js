const userRouter = require('express').Router();
const { getUsers, getSingleUser } = require('../controllers/usersController');

userRouter.get('/:username', getSingleUser);
userRouter.get('/', getUsers);

module.exports = userRouter;
