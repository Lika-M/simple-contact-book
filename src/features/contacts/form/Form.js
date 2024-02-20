import { useState } from 'react';
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
// import { nanoid } from '@reduxjs/toolkit';

import { useFormControl } from './useFormControl.js';
import { addContact, updateContact } from '../../../services/contactService.js';
import { selectContactById } from '../catalog/catalogSlice.js';
import './Form.scss';

const Form = ({ title, btnName, resetId }) => {
    const isEdit = title === 'Edit Contact';
    const [error, setError] = useState({ message: '' });
    const [reqStatus, setReqStatus] = useState('idle')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const person = useSelector((state) => selectContactById(state, id));

    const [values, setValues] = useFormControl(person, isEdit);


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
            <h2>{title} 
            <Link to={'/contacts'}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                            className="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path fill="currentColor"
                                d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                            </path>
                        </svg>
                    </Link>
                    </h2>
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
                        <label htmlFor="lastName">Last name:</label>
                        <input id="lastName" name="lastName" type="text"
                            onChange={onChange}
                            value={values.lastName || ''}
                        />
                    </div>
                    <div>
                        <label htmlFor="picture">Image:</label>
                        <input id="picture" name="picture" type="text"
                            onChange={onChange}
                            value={values.picture || ''}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input id="phone" name="phone" type="text"
                            onChange={onChange}
                            value={values.phone || ''}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input id="email" name="email" type="text"
                            onChange={onChange}
                            value={values.email || ''}
                        />
                    </div>
                    <div className="btn"  disabled={!canSave}>
                        <input type="submit" value={btnName} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Form;