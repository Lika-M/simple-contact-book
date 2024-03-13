import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectAllContacts, getContactsStatus, getContactsError } from './catalogSlice.js';
import ContactList from '../contactList/ContactList.js';
import Details from '../details/Details.js';
import Form from '../form/Form.js';
import Preloader from '../../../components/preloader/Preloader.js';
import PageNotFound from '../../../components/pageNotFound/PageNotFound.js';
import Search from '../search/Search.js';
import './Catalog.scss';

const Catalog = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [contactId, setContactId] = useState('');
    const [classAttribute, setClassAttribute] = useState('');
    const [hidden, setHidden] = useState(true);

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
        setClassAttribute('loaded');
        setContactId(id);
        navigate(`/contacts/${id}`);
    }

    function onClose() {
        setClassAttribute('closed');
        navigate(`${location.pathname}`);
        setTimeout(() => {
            setContactId('');
            navigate('/contacts');
        }, 1100)
    }

    function addNewContact() {
        setClassAttribute('loaded');
        setContactId('add');
        navigate('/contacts/add');
    }

    function editContact(id){
        setClassAttribute('');
        navigate(`/contacts/edit/${id}`)
    }

    console.log(classAttribute)

    const handleFocus = () => {
        setHidden(false);
    };

    const handleBlur = () => {
        setHidden(true);
    };

    const handleClassAttribute = useMemo(() => {
        return (className) => setClassAttribute(className);
    }, [setClassAttribute]);

    const noSelectedContact = (
        <>
            <p className="book-details-msg">Please select a contact to display</p>
            <Search
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                onClickContact={onClickContact} />
            <button className="btn add" onClick={addNewContact}>Add new contact</button>
        </>
    )

    return (
        <>
            {isLoading && content}
            {!isLoading &&
                <section className="book">
                    <article className={contactId ? `book-list ${classAttribute}` : "book-list"}>
                        <div className="book-content">
                            <h2>Contact list</h2>
                            <ContactList
                                contacts={orderedContacts}
                                selectedId={contactId}
                                onClickContact={onClickContact}
                            />
                        </div>
                        {!hidden && <div className="book-list-overlay" style={{ display: hidden ? 'none' : 'block' }}></div>}                    </article>
                    <article className={!contactId ? "book-details" : `book-details ${classAttribute}`}>
                        <Routes>
                            <Route path='' element={noSelectedContact} />
                            <Route path=':id'
                                element={<Details
                                    contactId={contactId}
                                    isLoading={isLoading}
                                    editContact={editContact}
                                    handleClassAttribute={handleClassAttribute}
                                    onClose={onClose} />}
                            />
                            <Route path='edit/:id'
                                element={<Form title={'Edit Contact'}
                                    btnName={'Save changes'}
                                    handleClassAttribute={handleClassAttribute}
                                    onClose={onClose} />}
                            />
                            <Route path='add'
                                element={<Form title={'Add Contact'}
                                    btnName={'Save contact'}
                                    handleClassAttribute={handleClassAttribute}
                                    onClose={onClose} />}
                            />
                        </Routes>
                    </article>
                </section>}
        </>
    );
}

export default Catalog;