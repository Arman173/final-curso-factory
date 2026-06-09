import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(password, email);
    }

    return (
        <div className="register">
            <h2 className="register__title">Inicia sesión</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="register__input"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="register__input"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="register__button">Inicia sesión</button>
            </form>
            <div className="register__signup">
                <p>¿Aún no eres miembro? <Link to="/signup" className="register__link">Regístrate aquí</Link></p>
            </div>
        </div>
    );
}