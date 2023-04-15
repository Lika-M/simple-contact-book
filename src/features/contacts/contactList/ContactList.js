import { Link } from 'react-router-dom';


import Contact from '../contact/Contact.js';
import './ContactList.css';

const ContactList = ({ contacts, selectedId, onClickContact }) => {
    return (
        <div>
            {contacts.map(c => (
                < Link to={`/contacts/${c.id}`} key={c.id}>
                    <Contact
                        person={c}
                        selected={c.id === selectedId}
                        onClickContact={onClickContact}
                    />
                </Link>
            ))
            }

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
    );
}

export default ContactList;