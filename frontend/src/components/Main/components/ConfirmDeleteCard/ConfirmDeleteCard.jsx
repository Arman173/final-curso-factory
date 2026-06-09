export default function ConfirmDeleteCard(props) {
    const { handleDeleteCard } = props;

    function handleConfirmDelete() {
        handleDeleteCard();
        console.log('Card deleted');
    }
    
    return (
    <div className='popup__confirmation'>
        <button
            className='popup__button'
            onClick={handleConfirmDelete}
        >
            Sí
        </button>
    </div>
    );
}