import { createSlice } from "@reduxjs/toolkit";
// import data from '../../../app/data.json';
import { getAllContacts, addContact, updateContact,removeContact } from '../../../services/contactService.js'

const initialState = {
    list: [],
    status: 'idle', // loading, succeeded, failed
    error: null
}

export const catalogSlice = createSlice({
    name: 'contacts',
    initialState,
    // reducers: {
    //     addContact(state, action) {
    //         state.list.push(action.payload);
    //     },
    //     updateContact(state, action) {
    //         const index = state.list.findIndex(x => x.id === action.payload.id);
    //         state.list.splice(index, 1, action.payload);
    //     },
    //     removeContact(state, action) {
    //         const index = state.list.findIndex(x => x.id === action.payload.id);
    //         state.list.splice(index, 1)
    //     },
    // },
    extraReducers(builder) {
        builder
            .addCase(getAllContacts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllContacts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list.push(...action.payload);
            })
            .addCase(getAllContacts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addContact.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list.push(action.payload);
            })
            .addCase(addContact.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateContact.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.list.findIndex(x => x.id === action.payload.id);
                state.list.splice(index, 1, action.payload);
            })
            .addCase(updateContact.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(removeContact.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeContact.fulfilled, (state, action) => {
                state.status = 'succeeded';
                return state.list.filter(x => x.id !== action.payload);
            })
            .addCase(removeContact.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }


});

export const selectAllContacts = (state) => state.contacts.list;
export const getContactsStatus = (state) => state.contacts.status;
export const getContactsError = (state) => state.contacts.error;

export const selectContactById = (state, contactIdd) => state.contacts.list.find(x => x.id === contactIdd)
export const getContactByIdStatus = (state, contactIdd) => state.contacts.status.find(x => x.id === contactIdd)
export const getContactByIdError = (state, contactIdd) => state.contacts.error.find(x => x.id === contactIdd)

export default catalogSlice.reducer;




