const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find()
    .then(data => res.json(data))
    .catch(error => next(error));
}

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .orFail()
    .then(card => {
      if (card.owner.toString() !== userId) {
        const error = new Error('No tienes permiso para borrar esta tarjeta');
        error.statusCode = 403;
        throw error;
      }
      return Card.findByIdAndDelete(cardId);
    })
    .then(deletedCard => {
      res.json(deletedCard);
    })
    .catch(error => {
      if (error.statusCode === 403) {
        return next(error);
      }
      if (error.name === 'DocumentNotFoundError') {
        const err = new Error("Tarjeta no encontrada");
        err.statusCode = 404;
        return next(err);
      }
      if (error.name === 'CastError') {
        const err = new Error("Datos inválidos: formato de ID incorrecto");
        err.statusCode = 400;
        return next(err);
      }
      // Error predeterminado
      next(error);
    });
}

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ owner: req.user._id, name, link })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        const err = new Error("Se pasaron datos inválidos al crear la tarjeta");
        err.statusCode = 400;
        return next(err);
      }
      next(error);
    });
}

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then(updatedCard => res.json(updatedCard))
    .catch(error => {
      if (error.name === 'DocumentNotFoundError') {
        const err = new Error("Tarjeta no encontrada");
        err.statusCode = 404;
        return next(err);
      }
      if (error.name === 'CastError') {
        const err = new Error("Datos inválidos: formato de ID incorrecto");
        err.statusCode = 400;
        return next(err);
      }
      next(error);
    });
}

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then(updatedCard => res.json(updatedCard))
    .catch(error => {
      if (error.name === 'DocumentNotFoundError') {
        const err = new Error("Tarjeta no encontrada");
        err.statusCode = 404;
        return next(err);
      }
      if (error.name === 'CastError') {
        const err = new Error("Datos inválidos: formato de ID incorrecto");
        err.statusCode = 400;
        return next(err);
      }
      next(error);
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard
}