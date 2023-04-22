import { Route, Routes, useNavigate, Link, useParams } from 'react-router-dom';
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
    const { id } = useParams()
    const navigate = useNavigate();
    const [contactId, setContactId] = useState(id);

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

    function onClickContact(id) {
        setContactId(id);
        navigate(`/contacts/${id}`)
    }

    function resetId() {
        setContactId(id);
    }

    const noSelectedContact = (
        <>
            <p style={{ 'textAlign': 'center' }} >Please select a contact to display</p>
            <div className="btn add">
                <Link to={'/contacts/add'}>Add new contact</Link>
            </div>
        </>
    )

    return (
        <>
            {isLoading && content}
            {!isLoading &&
                <section className="book">
                    <article className="book-list">
                        <h2>Friend list</h2>
                        <ContactList
                            contacts={orderedContacts}
                            selectedId={contactId}
                            onClickContact={onClickContact}
                        />
                    </article>
                    <article className="book-details">
                        <Routes>
                            <Route path='' element={noSelectedContact} />
                            <Route path=':id' element={<Details contactId={contactId} isLoading={isLoading} resetId={resetId} />} />
                            <Route path='edit/:id' element={<Form title={'Edit Contact'} btnName={'Save changes'} />} />
                            <Route path='add' element={<Form title={'Add Contact'} btnName={'Save contact'} resetId={resetId} />} />
                        </Routes>
                    </article>
                </section>}

        </>
    );
}

export default Catalog;