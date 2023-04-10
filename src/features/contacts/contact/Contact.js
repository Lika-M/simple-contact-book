const Contact = ({ person, selected, onClickContact }) => {

    const style = {};
    
    if (selected) {
        style.border = '3px solid #6D2269';
    }

    return (
        <div className="contact" style={style} onClick={() => onClickContact(person.id)}>
            <div className="image small">
                <img src={person.picture} alt={'Person'} />
            </div>
            <h3 className=" title">{person.firstName} {person.lastName} &#10151;</h3>
        </div>
    );
}

export default Contact;