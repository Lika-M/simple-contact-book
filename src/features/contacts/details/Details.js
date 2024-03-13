import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TrashIcon, XMarkIcon, PencilIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { selectContactById } from '../catalog/catalogSlice.js';
import { removeContact } from '../../../services/contactService.js';

import Modal from '../../../components/modal/Modal.js';
import './Details.scss';

const Details = ({ isLoading, handleClassAttribute, onClose, editContact }) => {
    const { id } = useParams();
    const [confirm, setConfirm] = useState({ apply: false });
    const [prevId, setPrevId] = useState(id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const person = useSelector((state) => selectContactById(state, id));

    
    useEffect(() => {
        if (prevId !== id) {
            handleClassAttribute('');
        }
        setPrevId(id);
        handleClassAttribute('loaded');
    }, [id, prevId, setPrevId, handleClassAttribute]);

    function onDelete() {
        setConfirm({ apply: true });
    }

    function acceptDelete() {
        if (confirm.apply) {
            try {
                dispatch(removeContact(person.objectId)).unwrap();
                navigate('/contacts');
            } catch (err) {
                throw new Error(err.message);
            }
        }
    }

    function declineDelete() {
        setConfirm({ apply: false });
    }

    return (
            <div >
                {!isLoading && <>
                    <h2>Person details
                        <span className="info-close-btn" onClick={onClose}>
                            <XMarkIcon />
                        </span>
                    </h2>
                    <div className="content">
                        <div className="content-wrapper">
                            <div className="person">
                                <div className="image">
                                    <img src={person.picture} alt="Person img" />
                                </div>
                                <div className="name">
                                    <h3>{person.firstName}</h3>
                                    <h3>{person.lastName}</h3>
                                <div className="info">
                                    <p><span><PhoneIcon /></span> <span>{person.phone}</span></p>
                                    <p><span><EnvelopeIcon /></span><span>{person.email}</span></p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-details">
                            <div>
                                <button onClick={() => editContact(person.objectId)} className="btn edit">
                                    <PencilIcon />
                                </button>
                                <button className="btn" onClick={onDelete}>
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="content-footer"></div>
                </>}
                {confirm.apply && <Modal acceptDelete={acceptDelete} declineDelete={declineDelete} />}
            </div>
    );
}

export default Details;