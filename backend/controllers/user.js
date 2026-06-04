const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUsers = async(req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

const getCurrentUser = async(req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).orFail();
    res.json(user);
  } catch (error) {
    if (error.name === 'DocumentNotFoundError') {
      const err = new Error("Usuario no encontrado");
      err.statusCode = 404;
      return next(err);
    }
    if (error.name === 'CastError') {
      const err = new Error("Datos inválidos: formato de ID incorrecto");
      err.statusCode = 400;
      return next(err);
    }
    next(error);
  }
}

const getUserById = async(req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).orFail(); 
    res.json(user);
  } catch (error) {
    if (error.name === 'DocumentNotFoundError') {
      const err = new Error("Usuario no encontrado");
      err.statusCode = 404;
      return next(err);
    }
    if (error.name === 'CastError') {
      const err = new Error("Datos inválidos: formato de ID incorrecto");
      err.statusCode = 400;
      return next(err);
    }
    next(error);
  }
}

const createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;

  bcryptjs.hash(password, 10)
    .then(hash => {
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })
    .then(data => {
      const userObj = data.toObject();

      delete userObj.password;
      
      res.status(201).json(userObj);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        const err = new Error("Se pasaron datos inválidos al crear un usuario");
        err.statusCode = 400;
        return next(err);
      }
      if (error.code === 11000) {
        const err = new Error("El correo electrónico ya está registrado");
        err.statusCode = 409;
        return next(err);
      }
      next(error);
    });
}

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      const err = new Error("Correo electrónico o contraseña incorrectos");
      err.statusCode = 401;
      return next(err);
    }

    const matched = await bcryptjs.compare(password, user.password);
    
    if (!matched) {
      const err = new Error("Correo electrónico o contraseña incorrectos");
      err.statusCode = 401;
      return next(err);
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || '',
      { expiresIn: '7d' }
    );

    res.json({ token });

  } catch (error) {
    next(error);
  }
}

const updateUserProfile = async (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true }
    ).orFail();

    res.json(updatedUser);
  } catch (error) {
    if (error.name === 'DocumentNotFoundError') {
      const err = new Error("Usuario no encontrado");
      err.statusCode = 404;
      return next(err);
    }
    if (error.name === 'ValidationError') {
      const err = new Error("Datos inválidos para actualizar el perfil");
      err.statusCode = 400;
      return next(err);
    }
    next(error);
  }
}

const updateUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true }
    ).orFail();

    res.json(updatedUser);
  } catch (error) {
    if (error.name === 'DocumentNotFoundError') {
      const err = new Error("Usuario no encontrado");
      err.statusCode = 404;
      return next(err);
    }
    if (error.name === 'ValidationError') {
      const err = new Error("Enlace de avatar inválido");
      err.statusCode = 400;
      return next(err);
    }
    next(error);
  }
}

module.exports = {
  getUsers,
  getCurrentUser,
  getUserById,
  createUser,
  login,
  updateUserProfile,
  updateUserAvatar
}