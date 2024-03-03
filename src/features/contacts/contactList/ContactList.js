import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';
import Contact from '../contact/Contact.js';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllContacts, selectCurrentPage, getNextPage, getPreviousPage } from '../catalog/catalogSlice.js';
import './ContactList.scss';

const ContactList = ({ selectedId, onClickContact }) => {
    const dispatch = useDispatch();

    const contacts = useSelector(selectAllContacts);
    const orderedContacts = [...contacts].sort((a, b) => a.firstName.localeCompare(b.firstName));

    const currentPage = useSelector(selectCurrentPage);

    const pageSize = 5;
    const totalPages = Math.ceil(contacts.length / pageSize);
    const lastIndex = currentPage * pageSize;
    const firstIndex = lastIndex - pageSize;


    const visibleContacts = orderedContacts.slice(firstIndex, lastIndex);

    const onNavigatePrev = () => {
        if (currentPage === 1) {
            return;
        }
        dispatch(getPreviousPage());
    };

    const onNavigateNext = () => {
        if (currentPage === totalPages) {
            return;
        }
        dispatch(getNextPage());
    };

    return (
        <>
            <div className="book-list-wrapper">
                {visibleContacts.map(c => (
                    <Contact
                        key={c.objectId}
                        person={c}
                        selected={c.objectId === selectedId}
                        onClickContact={onClickContact}
                    />
                ))}
            </div >
            <div className="content-footer">
            </div>
            <div className="pagination">
                {currentPage > 1 &&
                    <button className="pagination-btn" onClick={onNavigatePrev}>
                        <span><ArrowLongLeftIcon /></span>
                        {/* <span >Prev</span> */}
                    </button>}
                {currentPage < totalPages &&
                    <button className="pagination-btn" onClick={onNavigateNext}>
                        {/* <span>Next</span> */}
                        <span> <ArrowLongRightIcon /></span>
                    </button>}
            </div>
        </>
    );
}

export default ContactList;