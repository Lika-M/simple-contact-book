import { Route, Routes, useNavigate, Link, useLocation } from 'react-router-dom';
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

    useEffect(() => {
        setClassAttribute('');
    }, [setClassAttribute]);
    

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

    function resetId(id) {
        setContactId(id);
    }

    function onClose() {
        setClassAttribute('closed');
        navigate(`${location.pathname}`);
        setTimeout(() => {
            setContactId('');
            navigate('/contacts');
        }, 1100)
    }

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
            <p style={{ 'textAlign': 'center' }} >Please select a contact to display</p>
            <Search
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                onClickContact={onClickContact} />
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
                        <div className="book-list-content">
                            <h2>Contact list</h2>
                            <ContactList
                                contacts={orderedContacts}
                                selectedId={contactId}
                                onClickContact={onClickContact}
                            />
                        </div>
                        {!hidden && <div className="book-list-overlay" style={{ display: hidden ? 'none' : 'block' }}></div>}                    </article>
                    <article className="book-details">
                        <Routes>
                            <Route path='' element={noSelectedContact} />
                            <Route path=':id'
                                element={<Details
                                    contactId={contactId}
                                    isLoading={isLoading}
                                    resetId={resetId}
                                    classAttribute={classAttribute}
                                    handleClassAttribute={handleClassAttribute}
                                    onClose={onClose} />}
                            />
                            <Route path='edit/:id'
                                element={<Form title={'Edit Contact'}
                                    btnName={'Save changes'}
                                    classAttribute={classAttribute}
                                    handleClassAttribute={handleClassAttribute}
                                    resetId={resetId}
                                    onClose={onClose} />}
                            />
                            <Route path='add'
                                element={<Form title={'Add Contact'}
                                    btnName={'Save contact'}
                                    classAttribute={classAttribute}
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