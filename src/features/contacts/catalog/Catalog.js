import { Route, Routes } from 'react-router-dom';

import ContactList from '../contactList/ContactList.js';
import Details from '../details/Details.js';
import './Catalog.css';

const Catalog = () => {
    return (
        <article className="book">
            <div className="book-list">
                <h1>Friend list</h1>
                <ContactList />
            </div>
            <div className="book-details">
               
                <Routes>
                    <Route path='/' element={<Details />} />
                    <Route path='/edit/*' element={<p>Edit Form</p>} />
                </Routes>
               
            </div>
        </article>
    );
}

export default Catalog;