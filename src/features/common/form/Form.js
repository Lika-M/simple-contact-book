import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
// import { nanoid } from '@reduxjs/toolkit';

import { useFormControl } from './useFormControl.js';
import { addContact, updateContact } from '../../../services/contactService.js';
import './Form.css';

const Form = ({ title, btnName, person, resetId }) => {

    const isEdit = title === 'Edit Contact';
    const [values, setValues] = useFormControl(person, isEdit);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const onChange = (ev) => {
        setValues((state) => ({
            ...state,
            [ev.target.name]: ev.target.value
        }));
    };

    //TODO validation

    const onContactSubmit = (ev) => {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const data = Object.fromEntries(formData);

        if (Object.values(data).some(x => x === '')) {
            return setError('All fields are required!');
        }

        const person = {
            firstName: data.firstName,
            lastName: data.lastName,
            picture: data.picture,
            phone: data.phone,
            email: data.email
        }

        if(isEdit){
            dispatch(updateContact({id:id, body:person}));
            navigate(`/contacts/${id}`);

        } else if(!isEdit){
            // const contactId= nanoid();
            // person.id = contactId;
            dispatch(addContact(person));
            resetId();
            navigate(`/contacts`);
        }
    }

    return (
        <div className="book-list">
            <h1>{title} </h1>
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
        </div>
        // </div>
        // </div>
    )
}

export default Form;