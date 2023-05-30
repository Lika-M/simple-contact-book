import { Link } from 'react-router-dom';

const Contact = ({ person, selected, onClickContact }) => {

    const style = {};

    if (selected) {
        style.border = '3px solid #6D2269';
    }

    return (
        < Link to={`/contacts/${person.objectId}`} >
            <div className="contact" style={style} onClick={() => onClickContact(person.objectId)}>
                <div className="image small">
                    <img src={person.picture} alt={'Person'} />
                </div>
                <h3>{person.firstName} {person.lastName} &#10151;</h3>
            </div>
        </Link>
    );
}

export default Contact;