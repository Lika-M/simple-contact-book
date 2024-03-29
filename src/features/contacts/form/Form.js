import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { useFormControl } from './useFormControl.js';
import { addContact, updateContact } from '../../../services/contactService.js';
import { selectContactById } from '../catalog/catalogSlice.js';
import './Form.scss';

const Form = ({ title, btnName, onClose, handleClassAttribute }) => {
    const isEdit = title === 'Edit Contact';
    const [error, setError] = useState({ message: '' });
    const [reqStatus, setReqStatus] = useState('idle');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const person = useSelector((state) => selectContactById(state, id));

    const [values, setValues] = useFormControl(person, isEdit);

    useEffect(() => {
        handleClassAttribute('loaded');
    }, [handleClassAttribute])

    let canSave = Object.values(values).every(value => value.trim() !== '');

    const onChange = (ev) => {
        setValues((state) => ({
            ...state,
            [ev.target.name]: ev.target.value
        }));
    };

    const onContactSubmit = (ev) => {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const data = Object.fromEntries(formData);

        canSave = Object.values(data).every(Boolean) && reqStatus === 'idle';

        if (!canSave) {
            return setError({ message: error.message });
        }

        const person = {
            firstName: data.firstName,
            lastName: data.lastName,
            picture: data.picture,
            phone: data.phone,
            email: data.email
        }

        try {
            if (isEdit) {
                setReqStatus('pending');
                dispatch(updateContact({ id, body: person })).unwrap();
                navigate(`/contacts/${id}`);
            } else if (!isEdit) {
                setReqStatus('pending');
                dispatch(addContact(person));
                navigate('/contacts');
            }
        } catch (err) {
            setError({ message: err.message })
        } finally {
            setReqStatus('idle');
        }
    }

    const resetInputField = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: ''
        }));
        setReqStatus('idle');
    }

    return (
        <div className="form">
            {error.message &&
                <p className="error">Error: {error.message}</p>}
            <h2>{title}
                <span className="info-close-btn" onClick={onClose}>
                    <XMarkIcon />
                </span>
            </h2>
            <div className="content info">
                <form className="profile" onSubmit={onContactSubmit}>
                    <div>
                        <label htmlFor="firstName">First name:</label>
                        <input id="firstName" name="firstName" type="text"
                            onChange={onChange}
                            value={values.firstName || ''}
                            onFocus={resetInputField}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last name:</label>
                        <input id="lastName" name="lastName" type="text"
                            onChange={onChange}
                            value={values.lastName || ''}
                            onFocus={resetInputField}
                        />
                    </div>
                    <div>
                        <label htmlFor="picture">Image:</label>
                        <input id="picture" name="picture" type="url"
                            onChange={onChange}
                            value={values.picture || ''}
                            onFocus={resetInputField}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input id="phone" name="phone" type="tel"
                            onChange={onChange}
                            value={values.phone || ''}
                            onFocus={resetInputField}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input id="email" name="email" type="email"
                            onChange={onChange}
                            value={values.email || ''}
                            onFocus={resetInputField}
                        />
                    </div>
                    {/* <div > */}
                    <input type="submit" value={btnName} className="btn" disabled={!canSave} />
                    {/* </div> */}
                </form>
            </div>
            <div className="content-footer"></div>
        </div>
    )
}

export default Form;