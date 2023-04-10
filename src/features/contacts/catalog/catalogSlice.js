import { createSlice } from "@reduxjs/toolkit";
import data from '../../../app/data.json';

export const catalogSlice = createSlice({
    name: 'contacts',
    initialState: data,
    reducers: {
       
    }
});

export default catalogSlice.reducer;
export const {viewContact, addContact, updateContact } = catalogSlice.actions;
