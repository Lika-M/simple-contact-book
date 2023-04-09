import './ContactList.css';

const ContactList = () => {
    return (
        <div>
            <div className="contact">
                <div className="image small">
                    <img src="./pictures/person-4.jpg" alt="" />
                </div>
                <h3 className=" title">Ivan Ivanov &#10151;</h3>
            </div>

            <div className="contact">
                <div className="image small">
                    <img src="./pictures/person-2.jpg" alt="" />
                </div>
                <h3 className="title">Jordan Kirov &#10151;</h3>
            </div>

            <div className="contact">
                <div className="image small">
                    <img src="./pictures/person-1.jpg" alt="" />
                </div>
                <h3 className="title">Maria Petrova &#10151;</h3>
            </div>

            <div className="contact">
                <div className="image small">
                    <img src="./pictures/person-3.jpg" alt="" />
                </div>
                <h3 className="title">Maria Petrova &#10151;</h3>
            </div>

            <div className="contact">
                <div className="image small">
                    <img src="./pictures/person-3.jpg" alt="" />
                </div>
                <h3 className="title">Maria Petrova &#10151;</h3>
            </div>
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
        </div>
    );
}

export default ContactList;