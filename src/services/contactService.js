import { createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = 'https://parseapi.back4app.com/classes/List';

export const getAllContacts = createAsyncThunk('contacts/getAllContacts', async () => {
    try {
        const response = await fetch(baseUrl, {
            method: 'GET',
            headers: {
                'X-Parse-Application-Id': 'eIuHZ0NpWBbftCz4Wuld9RygonY0uCELwhgG2cJf',
                'X-Parse-REST-API-Key': 'kxclWGzoda8nuX8R05SfFOrICqv5poL5aXJUkrqk'
            }
        });
        const data = await response.json();
        return data.results.map(p => ({ ...p, id: p.objectId }));
    } catch (error) {
        return error.message;
    }
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
    try {
        const res = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'X-Parse-Application-Id': 'eIuHZ0NpWBbftCz4Wuld9RygonY0uCELwhgG2cJf',
                'X-Parse-REST-API-Key': 'kxclWGzoda8nuX8R05SfFOrICqv5poL5aXJUkrqk',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact)
        });
        const person = await res.json();

        const response = await fetch(baseUrl, {
            method: 'GET',
            headers: {
                'X-Parse-Application-Id': 'eIuHZ0NpWBbftCz4Wuld9RygonY0uCELwhgG2cJf',
                'X-Parse-REST-API-Key': 'kxclWGzoda8nuX8R05SfFOrICqv5poL5aXJUkrqk'
            }
        });

        const contacts = await response.json();

        const currentPerson = contacts.results.find(c => c.objectId === person.objectId);
        currentPerson.id = currentPerson.objectId;
        return currentPerson;
    } catch (error) {
        return error.message;
    }
});

export const updateContact = createAsyncThunk('contacts/updateContact', async (data) => {
    try {
        await fetch(`${baseUrl}/${data.id}`, {
            method: 'PUT',
            headers: {
                'X-Parse-Application-Id': 'eIuHZ0NpWBbftCz4Wuld9RygonY0uCELwhgG2cJf',
                'X-Parse-REST-API-Key': 'kxclWGzoda8nuX8R05SfFOrICqv5poL5aXJUkrqk',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data.body)
        });

        const res = await fetch(`${baseUrl}/${data.id}`, {
            method: 'GET',
            headers: {
                'X-Parse-Application-Id': 'eIuHZ0NpWBbftCz4Wuld9RygonY0uCELwhgG2cJf',
                'X-Parse-REST-API-Key': 'kxclWGzoda8nuX8R05SfFOrICqv5poL5aXJUkrqk'
            }
        });
        const person = await res.json();
        person.id = person.objectId;
        return await person;
    } catch (error) {
        return error.message;
    }
});

export const removeContact = createAsyncThunk('contacts/removeContact', async (contactId) => {
   await fetch(`${baseUrl}/${contactId}`, {
        method: 'DELETE',
        headers: {
            'X-Parse-Application-Id': 'eIuHZ0NpWBbftCz4Wuld9RygonY0uCELwhgG2cJf',
            'X-Parse-REST-API-Key': 'kxclWGzoda8nuX8R05SfFOrICqv5poL5aXJUkrqk'
        }
    });
    
    return contactId;
})

