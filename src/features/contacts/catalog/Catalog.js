import { Route, Routes, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectAllContacts, getContactsStatus, getContactsError } from './catalogSlice.js';
import ContactList from '../contactList/ContactList.js';
import Details from '../details/Details.js';
import Form from '../form/Form.js';
import Preloader from '../../../components/preloader/Preloader.js';
import PageNotFound from '../../../components/pageNotFound/PageNotFound.js';
import './Catalog.css';

const Catalog = () => {
    const navigate = useNavigate();
    const [contactId, setContactId] = useState({ id: 0 });

    const contacts = useSelector(selectAllContacts);
    const status = useSelector(getContactsStatus);
    const error = useSelector(getContactsError);


    let content;
    let isLoading = false;
    if (status === 'loading') {
        isLoading = true;
        content = <Preloader />
    } else if (status === 'succeeded') {
        isLoading = false;
    } else if (status === 'failed') {
        content = <PageNotFound error={error} />
        isLoading = true;
    }

    const orderedContacts = contacts.slice().sort((a, b) => a.firstName.localeCompare(b.firstName));
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
            {isLoading && content}
            {!isLoading &&
                <section className="book">
                    <article className="book-list">
                        <h1>Friend list</h1>
                        <ContactList
                            contacts={orderedContacts}
                            selectedId={contactId}
                            onClickContact={onClickContact}
                        />
                    </article>
                    <article className="book-details">
                        {!person && <p style={{ 'textAlign': 'center' }} >Please select a contact to display</p>}
                        <Routes>
                            <Route path=':id' element={<Details contactId={contactId} isLoading={isLoading} resetId={resetId} />} />
                            <Route path='edit/:id' element={<Form title={'Edit Contact'} btnName={'Save changes'} />} />
                            <Route path='add' element={<Form title={'Add Contact'} btnName={'Add contact'} resetId={resetId} />} />
                        </Routes>
                        <div className="btn">
                        <Link to={'/contacts/add'}>Add new contact</Link>
                    </div>
                    </article>
                </section>}

        </>
    );
}

export default Catalog;