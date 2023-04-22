import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
// import { nanoid } from '@reduxjs/toolkit';

import { useFormControl } from './useFormControl.js';
import { addContact, updateContact } from '../../../services/contactService.js';
import { selectContactById } from '../catalog/catalogSlice.js';
import './Form.css';

const Form = ({ title, btnName, resetId }) => {
    const isEdit = title === 'Edit Contact';
    const [error, setError] = useState({ message: '' });
    const [reqStatus, setReqStatus] = useState('idle')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const person = useSelector((state) => selectContactById(state, id));

    const [values, setValues] = useFormControl(person, isEdit);


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

        const canSave = Object.values(data).every(Boolean) && reqStatus === 'idle';

        if (!canSave) {
            //TODO validation
            return setError({ message: 'All fields are required!' });
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
                //catching errors without unwrap()
                dispatch(addContact(person));
                resetId();
                navigate('/contacts');
            }
        } catch (err) {
            console.log(err)
        } finally {
            setReqStatus('idle');
        }
    }

    return (
        <>
            <h2>{title} </h2>
            <div className="content info">
                <form className="profile" onSubmit={onContactSubmit}>
                    <div>
                        <label htmlFor="firstName">First name:</label>
                        <input id="firstName" name="firstName" type="text"
                            onChange={onChange}
                            value={values.firstName || ''}
                        />
                    </div>
                    <div>
                        <label>Last name:</label>
                        <input name="lastName" type="text"
                            onChange={onChange}
                            value={values.lastName || ''}
                        />
                    </div>
                    <div>
                        <label htmlFor="picture">Image:</label>
                        <input id="firstName" name="picture" type="text"
                            onChange={onChange}
                            value={values.picture || ''}
                        />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input name="phone" type="text"
                            onChange={onChange}
                            value={values.phone || ''}
                        />
                    </div>
                    <div>
                        <label>E-mail:</label>
                        <input name="email" type="text"
                            onChange={onChange}
                            value={values.email || ''}
                        />
                    </div>
                    <div className="btn">
                        <input type="submit" value={btnName} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Form;