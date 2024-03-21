import { Link } from 'react-router-dom';
import './Contact.scss';

const Contact = ({ person, selected, onClickContact }) => {

    return (
        < Link to={`/contacts/${person.objectId}`} >
            <div className={selected ? "contact selected" : "contact"} onClick={() => onClickContact(person.objectId)}>
                <div className="image small">
                    <img src={person.picture} alt={'Person'} />
                </div>
                <h3>
                    {person.firstName}  {person.lastName}
                    <span> &#10151;</span>
                </h3>
            </div>
        </Link>
    );
}

export default Contact;