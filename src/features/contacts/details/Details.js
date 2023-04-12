import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { removeContact } from '../catalog/catalogSlice.js';
import './Details.css';

const Details = ({ person }) => {
    const dispatch = useDispatch();

    function onDelete(ev){

        if(window.confirm('Are you sure you want to delete?')){
            dispatch(removeContact(person));
        }
    }

    return (
        <>
            <h2>Person details</h2>
            <div className="content">
                <div className="info">
                    <div className="image col">
                        <img src={person.picture} alt="Person img" />
                    </div>
                    <div className="col">
                        <h3 className="name">{person.firstName}</h3>
                        <h3 className="last-name">{person.lastName}</h3>
                    </div>
                </div>
                <div className="info-details ">
                    <p className="info-line">&#9742; {person.phone}</p>
                    <p className="info-line">&#9993; {person.email}</p>
                    <div>
                        <Link to={`/contacts/edit/${person.id}`} className="btn">&#9998;</Link>
                        <button className="btn" onClick={onDelete}>&#10006;</button>
                    </div>
                </div>
            </div>
            <div className="btn">
                <Link to={'/contacts/add'}>Add contact</Link>
            </div>
        </>
    );
}

export default Details;