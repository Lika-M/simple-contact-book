import Contact from '../contact/Contact.js';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllContacts, selectCurrentPage, getNextPage, getPreviousPage } from '../catalog/catalogSlice.js';
import './ContactList.css';

const ContactList = ({ selectedId, onClickContact }) => {
    const dispatch = useDispatch();

    const contacts = useSelector(selectAllContacts);
    const orderedContacts =[...contacts].sort((a, b) => a.firstName.localeCompare(b.firstName));

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
            <div>
                {visibleContacts.map(c => (
                    <Contact
                        key={c.objectId}
                        person={c}
                        selected={c.objectId === selectedId}
                        onClickContact={onClickContact}
                    />
                ))}
                <div className='footer'>
                    {currentPage > 1 && <button onClick={onNavigatePrev}>
                        <span className="arrow">&#10148;</span>
                        <span>Previous</span>
                    </button>}
                    {currentPage < totalPages && <button onClick={onNavigateNext}>
                        <span>Next</span>
                        <span> &#10148;</span>
                    </button>}
                </div>
            </div >
        </>
    );
}

export default ContactList;