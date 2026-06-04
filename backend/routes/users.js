const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../utils/validators');

const {
  getUsers, getUserById,
  // createUser,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser
} = require('../controllers/user');
const { validateJwt } = require('../middlewares/auth');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required()
  })
}), getUserById);

// router.post('/', createUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required()
  })
}), updateUserProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL)
  })
}), updateUserAvatar);

module.exports = router;