import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(password, email);
    }

    return (
        <div className="register">
            <h2 className="register__title">Regístrate</h2>
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
                <button type="submit" className="register__button">Regístrate</button>
            </form>
            <div className="register__signup">
                <p>¿Ya eres miembro? <Link to="/signin" className="register__link">Inicia sesión aquí</Link></p>
            </div>
        </div>
    );
}