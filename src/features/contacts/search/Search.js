import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllContacts } from '../catalog/catalogSlice.js';
import './Search.scss';

const Search = ({ onClickContact, handleFocus, handleClose }) => {
    const contacts = useSelector(selectAllContacts);
    const [input, setInput] = useState('');

    

    let selectedContacts = [];
    let hasScrollbar = false;

    const orderedContacts = contacts.slice().sort((a, b) => a.firstName.localeCompare(b.firstName));

    const onChange = (e) => {
        setInput(e.target.value);
    };

    if (input.length > 0) {
        selectedContacts = orderedContacts.filter(x => x.firstName.toLowerCase().startsWith(input.toLowerCase()))
    }

    const style = { visibility: 'hidden' };

    if (selectedContacts.length) {
        style.visibility = 'visible';
        if (selectedContacts.length > 6) {
            hasScrollbar = true;
        }
    }

    return (
        <div className="search">
            <div>
                <input type="text" placeholder="Enter contact name"
                    value={input}
                    onChange={onChange}
                    onFocus={handleFocus}
                />
                <button className="search-icon">
                    <MagnifyingGlassIcon />
                </button>
                <button className="close-btn" onClick={() => {
                    handleClose();
                    setInput('');
                }}>
                    <XMarkIcon />
                </button>
            </div>
            {input.length > 0 &&
                <div className="result">
                    <ul className={hasScrollbar ? 'scrollable' : ''} style={style}>
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