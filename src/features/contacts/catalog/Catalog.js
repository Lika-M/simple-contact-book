import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllContacts, getContactsStatus, getContactsError } from './catalogSlice.js';
import ContactList from '../contactList/ContactList.js';
import Details from '../details/Details.js';
import Form from '../../common/form/Form.js';
import './Catalog.css';

const Catalog = () => {
    const navigate = useNavigate();
    const [contactId, setContactId] = useState({ id: 0 });

    const contacts = useSelector(selectAllContacts);
    const status = useSelector(getContactsStatus);
    const error = useSelector(getContactsError);



    let content;
    let hasError = false;
    if (status === 'loading') {
        hasError = true;
        //TODO add spinner
        content = <p style={{ textAlign: 'center' }}>Loading...</p>
    } else if (status === 'succeeded') {
        hasError = false;
    } else if (status === 'failed') {
        content = <p>Error: {error}</p>
        hasError = true;
    }

    const orderedContacts = contacts?.slice().sort((a, b) => a.firstName.localeCompare(b.firstName));
    const person = contacts.find(c => c.id === contactId);

    function onClickContact(id) {
        setContactId(id);
        navigate(`/contacts/${id}`)
    }

    function resetId() {
        setContactId({ id: 0 });
    }

    return (
        <>
            {hasError && content}
            <article className="book">
                <div className="book-list">
                    {!hasError && <>
                        <h1>Friend list</h1>
                        <ContactList
                            contacts={orderedContacts}
                            selectedId={contactId}
                            onClickContact={onClickContact}
                        />
                    </>}
                </div>
                <div className="book-details">
                    {!person && !hasError && <p style={{ 'textAlign': 'center' }} >Please select a contact</p>}
                    {person && (
                        <Routes>
                            <Route path=':id' element={<Details person={person} hasError={hasError} content={content} />} />
                            <Route path='edit/:id' element={<Form title={'Edit Contact'} btnName={'Save changes'} person={person} />} />
                            <Route path='add' element={<Form title={'Add Contact'} btnName={'Add contact'} resetId={resetId} />} />
                        </Routes>)}
                </div>
            </article>
        </>
    );
}

export default Catalog;