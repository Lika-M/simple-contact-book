import { Link } from 'react-router-dom';
import './Details.css';

const Details = ({ person }) => {

    if (!person) {
        return;
    }

    return (
        <>
            <h2>Person details</h2>
            <div className="content">
                <div className="info">
                    <div className="image col">
                        <img src={person.picture} alt="" />
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
                        <Link to="#" className="btn">&#9998;</Link>
                        <button className="btn">&#10006;</button>
                    </div>
                </div>
            </div>
            <div className="btn">
                <button>Add contact</button>
            </div>
        </>
    );
}

export default Details;