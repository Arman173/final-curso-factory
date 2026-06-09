import successIcon from '../../images/success-icon.svg';
import errorIcon from '../../images/error-icon.svg';

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
    if (!isOpen) return null;

    return (
        <div className="popup popup__open">
            <div className="popup__overlay" onClick={onClose}></div>
            
            <div className="popup__content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '330px' }}>
                <button 
                    className="popup__closebtn" 
                    type="button" 
                    onClick={onClose}
                ></button>
                
                <img 
                    src={isSuccess ? successIcon : errorIcon} 
                    alt={isSuccess ? "Éxito" : "Error"} 
                    style={{ width: '120px', height: '120px', marginTop: '30px' }}
                />
                
                <h2 className="popup__title" style={{ textAlign: 'center', margin: '32px 0 0', width: '100%', maxWidth: '358px' }}>
                    {isSuccess 
                        ? "¡Correcto! Ya estás registrado." 
                        : "Algo salió mal. Por favor, inténtalo de nuevo."}
                </h2>
            </div>
        </div>
    );
}