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
                    <button>
                        <span className="arrow">&#10148;</span>
                        <span>Previous</span>
                    </button>
                    <button>
                        <span>Next</span>
                        <span> &#10148;</span>
                    </button>
                </div>
            </div >
        </>
    );
}

export default ContactList;