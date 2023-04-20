import { createSlice } from "@reduxjs/toolkit";
// import data from '../../../app/data.json';
import { getAllContacts, addContact, updateContact, removeContact } from '../../../services/contactService.js'

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
        // Two ways to maintain the response status - global or local.
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
            });
        builder
            .addCase(addContact.fulfilled, (state, action) => {
                if (!action.payload.objectId) {
                    state.status = 'failed';
                    state.error = action.payload;
                    state.error.message = 'This contact isn\'t added. Try again later!';
                    return;
                }
                state.status = 'succeeded';
                state.list.push(action.payload);
            })

        builder
            .addCase(updateContact.fulfilled, (state, action) => {
                if (!action.payload.objectId) {
                    state.status = 'failed';
                    state.error = action.payload;
                    state.error.message = 'This contact isn\'t updated. Try again later!';
                    return;
                }
                state.status = 'succeeded';
                const index = state.list.findIndex(x => x.objectId === action.payload.objectId);
                if (index === -1) {
                    return state;
                }
                state.list.splice(index, 1, action.payload);
            })
        builder
            .addCase(removeContact.fulfilled, (state, action) => {
                if (!action.payload.objectId) {
                    state.status = 'failed';
                    state.error = action.payload;
                    state.error.message = 'This contact isn\'t removed. Try again later!';
                    return;
                }
                state.status = 'succeeded';
                state.list = [...state.list.filter(x => x.objectId !== action.payload.objectId)]
            })
    }

});

export const selectAllContacts = (state) => state.contacts.list;
export const getContactsStatus = (state) => state.contacts.status;
export const getContactsError = (state) => state.contacts.error;

export const selectContactById = (state, contactId) => state.contacts.list.find(x => x.objectId === contactId)
export const getContactByIdStatus = (state, contactIdd) => state.contacts.status.find(x => x.payload.objectId === contactIdd)
export const getContactByIdError = (state, contactIdd) => state.contacts.error.find(x => x.payload.objectId === contactIdd)

export default catalogSlice.reducer;




