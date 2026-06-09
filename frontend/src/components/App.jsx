import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Main from './Main/Main'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import { api } from '../utils/api'
import * as auth from '../utils/auth'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Login from './Login/Login';
import Register from './Register/Register';
import InfoTooltip from './InfoTooltip/InfoTooltip';

function App() {
  // estado del usuario
  const [currentUser, setCurrentUser] = useState({})

  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  // estados para la autenticación
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Hook para redireccionar manualmente
  const navigate = useNavigate();

  // Comprobar el token al cargar la página
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.email); // Extraemos el correo de la respuesta
            navigate('/');
          }
        })
        .catch((err) => console.error('Error al verificar el token:', err));
    }
  }, [navigate]);

  // Obtener info si ya está logueado
  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((userData) => setCurrentUser(userData))
        .catch((err) => console.error('Error al obtener la información del usuario:', err));
      
      api.getInitialCards()
        .then((cardsData) => setCards(cardsData))
        .catch((err) => console.error('Error al obtener tarjetas:', err));
    }
  }, [loggedIn]);

  /* Funciones de autenticación */
  function handleRegister(password, email) {
    auth.register(password, email)
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate('/signin');
      })
      .catch((err) => {
        console.error(err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate('/');
        }
      })
      .catch((err) => {
        console.error(err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem('jwt'); // Borramos el token
    navigate('/signin');
  }

  /* Funciones de cards y popups */
  function handleOpenPopup(popup) {
      setPopup(popup);
  }

  function handleClosePopup() {
      setPopup(null);
  }

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(userData) {
    (async () => {
      await api.updateUserInfo(userData)
        .then((updatedUser) => {
          setCurrentUser(updatedUser);
          handleClosePopup();
        })
        .catch((err) => {
          console.error('Error al actualizar la información del usuario:', err);
        });
    })();
  }
  
  function handleUpdateAvatar(avatarData) {
    (async () => {
      await api.updateProfilePicture(avatarData.avatar)
        .then((updatedUser) => {
          setCurrentUser(updatedUser);
          handleClosePopup();
        })
        .catch((err) => {
          console.error('Error al actualizar el avatar:', err);
        });
    })();
  }

  async function handleCardLike(card) {
    const isLiked = card.likes.includes(currentUser._id);
    await api.likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
      })
      .catch((error) => console.error('Error al dar like:', error));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
        handleClosePopup();
      })
      .catch((error) => console.error('Error al eliminar tarjeta:', error));
  }

  function handleAddPlaceSubmit(newCardData) {
    api.addCard(newCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((error) => console.error('Error al agregar tarjeta:', error));
  }

  return (
    <>
      <CurrentUserContext.Provider
        value={{ currentUser, handleUpdateUser, handleUpdateAvatar, handleAddPlaceSubmit }}
      >
        <div className="page">
          <Header loggedIn={loggedIn} email={userEmail} onSignOut={handleSignOut}/>

          <Routes>
            <Route 
              path="/" 
              element={
                <ProtectedRoute 
                  element={Main} 
                  loggedIn={loggedIn}
                  popup={popup}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              } 
            />

            <Route path="/signup" element={<Register onRegister={handleRegister} />} />
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            
            <Route path="*" element={<Navigate to={loggedIn ? "/" : "/signin"} />} />
          </Routes>

          <Footer />
          
          <InfoTooltip 
            isOpen={isInfoTooltipOpen} 
            onClose={closeInfoTooltip} 
            isSuccess={isSuccess} 
          />
        </div>
      </CurrentUserContext.Provider>
    </>
  )
}

export default App