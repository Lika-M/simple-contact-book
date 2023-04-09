import { Link } from 'react-router-dom';
import './Details.css';

const Details = () => {
    return (
        <>
         <h2>Person details</h2>
            <div className="content">
                <div className="info">
                    <div className="image col">
                        <img src="./pictures/person-3.jpg" alt="" />
                    </div>
                    <div className="col">
                        <h3 className="name">Mila</h3>
                        <h3 className="last-name">Evtimova</h3>
                    </div>
                </div>
                <div className="info-details ">
                    <p className="info-line">&#9742; 0887 123 456</p>
                    <p className="info-line">&#9993; m.mileva@gmail.com</p>
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