import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TrashIcon, XMarkIcon, PencilIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react';
import { selectContactById } from '../catalog/catalogSlice.js';
import { removeContact } from '../../../services/contactService.js';
import './Details.scss';

const Details = ({ isLoading, resetId, classAttribute, addClassAttribute }) => {
    const { id } = useParams();
    const person = useSelector((state) => selectContactById(state, id));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const location = useLocation();

    // const pathnameId = location.pathname.split('/')[2];

    useEffect(() => {
        addClassAttribute(id);
    }, [id, addClassAttribute]);

    function onDelete(ev) {
        if (window.confirm('Are you sure you want to delete this?')) {
            dispatch(removeContact(person.objectId)).unwrap();
            resetId();
            navigate('/contacts');
        };
    }

    return (
        <div className={classAttribute}>
            {!isLoading && <>
                <h2>Person details
                    <Link className="info-close-btn" to={'/contacts'}>
                        <XMarkIcon />
                    </Link>
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
        </div>

    );
}

export default Details;