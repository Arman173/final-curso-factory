require('dotenv').config();
const express      = require('express');
const mongoose     = require('mongoose');
const cors         = require('cors');
const app          = express();
const port         = process.env.PORT || 3000;
const errorHandler = require('./middlewares/errorHandler');
const validator    = require('validator');
const { celebrate, Joi, errors } = require('celebrate');
const { validateURL } = require('./utils/validators');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(express.json());

app.use(cors());

app.use(requestLogger);

mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => console.log('success connection...'))
  .catch(() => console.error("error to conect..."));

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/user');
const { validateJwt } = require('./middlewares/auth');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

app.use('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
}), login);
app.use('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL) 
  })
}), createUser);

app.use(validateJwt);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => {
  const error = new Error('Recurso solicitado no encontrado');
  error.statusCode = 404;
  return next(error);
});

app.use(errorHandler);

app.use(errorLogger);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});