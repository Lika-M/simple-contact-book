import Contact from '../contact/Contact.js';
import './ContactList.css';

const ContactList = ({ contacts, selectedId, onClickContact }) => {
    return (
        <>
        <div>
            {contacts.map(c => (

                <Contact
                    key={c.objectId}
                    person={c}
                    selected={c.objectId === selectedId}
                    onClickContact={onClickContact}
                />

            ))}

            <div className='footer'>
                <span>
                    <span className="arrow">&#10148;</span>
                    <span>Previous</span>
                </span>
                <span>
                    <span>Next</span>
                    <span> &#10148;</span>
                </span>

            </div>
        </div >
        </>
    );
}

export default ContactList;