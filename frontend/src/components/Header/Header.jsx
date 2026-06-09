import logo from '../../images/logo.png'
import { Link, useLocation } from 'react-router-dom';

export default function Header({loggedIn, email, onSignOut}) {
    const location = useLocation();
    
    return (
        <header className="header">
            <img
                src={logo}
                alt="logo around the U.S."
                className="header__logo"
            />
            <div className="header__auth">
                {loggedIn ? (
                    // Si el usuario está logueado, mostramos su correo y el botón de salir
                    <>
                        <span className="header__email">{email}</span>
                        <button onClick={onSignOut} className="header__signout">
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    // Si No está logueado, verificamos la URL
                    location.pathname === '/signin' ? (
                        <Link to="/signup" className="header__link">Regístrate</Link>
                    ) : (
                        <Link to="/signin" className="header__link">Iniciar sesión</Link>
                    )
                )}
            </div>
        </header>
    );
}