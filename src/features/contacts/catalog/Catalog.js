import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import ContactList from '../contactList/ContactList.js';
import Details from '../details/Details.js';
import Form from '../../common/form/Form.js';
import './Catalog.css';

const Catalog = () => {
    const navigate = useNavigate();
    const [contactId, setContactId] = useState({ id: 0 });

    const contacts = useSelector((state) => state.contacts) || [];
    const person = contacts.find(c => c.id === contactId);

    function onClickContact(id) {
        setContactId(id);
        navigate(`/contacts/${id}`)
    }

    function resetId(){
        setContactId({id: 0});
    }

    return (
        <article className="book">
            <div className="book-list">
                <h1>Friend list</h1>
                <ContactList
                    contacts={contacts}
                    selectedId={contactId}
                    onClickContact={onClickContact}
                />
            </div>
            <div className="book-details">
                {!person && <p style={{ 'textAlign': 'center' }} >Please select a contact</p>}
                {person && (
                    <Routes>
                        <Route path=':id' element={<Details person={person} />} />
                        <Route path='edit/:id' element={<Form title={'Edit Contact'} btnName={'Save changes'} person={person} />} />
                        <Route path='add' element={<Form title={'Add Contact'} btnName={'Add contact'} resetId={resetId}/>} />
                    </Routes>)}
            </div>
        </article>
    );
}

export default Catalog;