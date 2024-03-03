import { Link } from 'react-router-dom';
import './Contact.scss';

const Contact = ({ person, selected, onClickContact }) => {

    const style = {};

    if (selected) {
        style.boxShadow = 'inset 0 0 0 2px #6D2269';
        style.borderRadius = '6px';
    }

    return (
        < Link to={`/contacts/${person.objectId}`} >
            <div className="contact" style={style} onClick={() => onClickContact(person.objectId)}>
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