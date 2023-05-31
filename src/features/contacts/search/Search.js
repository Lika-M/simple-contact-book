import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllContacts } from '../catalog/catalogSlice.js';
import './Search.scss';

const Search = ({ onClickContact }) => {
    const contacts = useSelector(selectAllContacts);
    const [input, setInput] = useState('');

    let selectedContacts = [];

    const onChange = (e) => {
        setInput(e.target.value);
    };

    if (input.length > 0) {
        selectedContacts = contacts.filter(x => x.firstName.toLowerCase().startsWith(input.toLowerCase()))
    }

    const style = { visibility: 'hidden' };

    if (selectedContacts.length) {
        style.visibility = 'visible';
    }

    return (
        <div className="search">
            <div>
                <input type="text" placeholder="Enter friend name"
                    value={input}
                    onChange={onChange}
                />

                <button className="close-btn">
                    <XMarkIcon />
                </button>
                <button className="search-btn" type="submit">
                    <MagnifyingGlassIcon />
                </button>
            </div>
            {input.length > 0 &&
                <div className="result">
                    <ul style={style}>
                        {selectedContacts.map(c => (
                            <li
                                key={c.objectId}
                                onClick={() => onClickContact(c.objectId)}
                            >
                                {c.firstName} {c.lastName}
                            </li>
                        ))}

                    </ul>

                </div>}
            {input.length > 0 && !selectedContacts.length &&
                <p>No matches found.</p>}
        </div>
    );
}

export default Search;