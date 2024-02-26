import './Modal.scss';

const Modal = ({acceptDelete, declineDelete}) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h4 className="modal-txt">Are you sure you want to delete this contact?</h4>
                <button className="modal-accept btn" onClick={acceptDelete}>Yes</button>
                <button className="modal-deny btn" onClick={declineDelete}>No</button>
            </div>
            <div className="modal-overlay"></div>
        </div>
    );
}

export default Modal;