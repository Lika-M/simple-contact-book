import { createSlice} from "@reduxjs/toolkit";
import data from '../../../app/data.json';

export const catalogSlice = createSlice({
    name: 'contacts',
    initialState: data,
    reducers: {
        addContact(state, action) {
            state.push(action.payload);
        },
        updateContact(state, action) {
            const index = state.findIndex(x => x.id === action.payload.id);
            state.splice(index, 1, action.payload);
        }
    }
});

export default catalogSlice.reducer;
export const { addContact, updateContact } = catalogSlice.actions;



