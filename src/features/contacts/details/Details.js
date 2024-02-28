import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TrashIcon, XMarkIcon, PencilIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { selectContactById } from '../catalog/catalogSlice.js';
import { removeContact } from '../../../services/contactService.js';

import Modal from '../../../components/modal/Modal.js';
import './Details.scss';

const Details = ({ isLoading, resetId, classAttribute, setClassAttribute, onClose }) => {
    const { id } = useParams();
    const [confirm, setConfirm] = useState({ apply: false });
    const [prevId, setPrevId] = useState(id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const person = useSelector((state) => selectContactById(state, id));

    if (prevId !== id) {
        setClassAttribute('');
    } 

    useEffect(() => {
        setPrevId(id);
        setClassAttribute('loaded');
    }, [id, prevId, setPrevId, setClassAttribute]);

    function onDelete() {
        setConfirm({ apply: true });
    }

    function acceptDelete() {
        if (confirm.apply) {
            try {
                dispatch(removeContact(person.objectId)).unwrap();
                resetId();
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
        <>
            <div className={classAttribute}>
                {!isLoading && <>
                    <h2>Person details
                        <span className="info-close-btn" onClick={onClose}>
                            <XMarkIcon />
                        </span>
                    </h2>
                    <div className="content">
                        <div className="content-info">
                            <div className="image">
                                <img src={person.picture} alt="Person img" />
                            </div>
                            <div>
                                <h3>{person.firstName}</h3>
                                <h3>{person.lastName}</h3>
                            </div>
                        </div>
                        <div className="content-details">
                            <p><PhoneIcon /> {person.phone}</p>
                            <p> <EnvelopeIcon /> {person.email}</p>
                            <div>
                                <Link to={`/contacts/edit/${person.objectId}`} className="btn edit">
                                    <PencilIcon />
                                </Link>
                                <button className="btn" onClick={onDelete}>
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </>}
                {confirm.apply && <Modal acceptDelete={acceptDelete} declineDelete={declineDelete} />}
            </div>
        </>

    );
}

export default Details;