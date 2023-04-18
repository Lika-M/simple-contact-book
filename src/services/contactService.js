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

        if (!response.ok) {
            return { code: `${response.status}`, message: `${response.statusText}` }
        }
        const data = await response.json();
        return data.results.map(p => ({ ...p, id: p.objectId }));

    } catch (error) {
        console.log(error)
        return error.message;
    }
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
    try {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'X-Parse-Application-Id': 'eIuHZ0NpWBbftCz4Wuld9RygonY0uCELwhgG2cJf',
            'X-Parse-REST-API-Key': 'kxclWGzoda8nuX8R05SfFOrICqv5poL5aXJUkrqk',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact)
    });

    if (!response.ok) {
        return { code: `${response.status}`, message: `${response.statusText}` }
    }
    const person = await response.json();

    const data = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            'X-Parse-Application-Id': 'eIuHZ0NpWBbftCz4Wuld9RygonY0uCELwhgG2cJf',
            'X-Parse-REST-API-Key': 'kxclWGzoda8nuX8R05SfFOrICqv5poL5aXJUkrqk'
        }
    });

    if (!data.ok) {
        return { code: `${data.status}`, message: `${data.statusText}` }
    }

    const contacts = await data.json();

    const currentPerson = contacts.results.find(c => c.objectId === person.objectId);
    currentPerson.id = currentPerson.objectId;
    return currentPerson;

    } catch (error) {
        return error.message;
    }
});

export const updateContact = createAsyncThunk('contacts/updateContact', async (data) => {
    try {
    const response = await fetch(`${baseUrl}/${data.id + 3}`, {
        method: 'PUT',
        headers: {
            'X-Parse-Application-Id': 'eIuHZ0NpWBbftCz4Wuld9RygonY0uCELwhgG2cJf',
            'X-Parse-REST-API-Key': 'kxclWGzoda8nuX8R05SfFOrICqv5poL5aXJUkrqk',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.body)
    });

    if (!response.ok) {
        return { code: `${response.status}`, message: `${response.statusText}` }
    }

    const res = await fetch(`${baseUrl}/${data.id}`, {
        method: 'GET',
        headers: {
            'X-Parse-Application-Id': 'eIuHZ0NpWBbftCz4Wuld9RygonY0uCELwhgG2cJf',
            'X-Parse-REST-API-Key': 'kxclWGzoda8nuX8R05SfFOrICqv5poL5aXJUkrqk'
        }
    });

    if (!res.ok) {
        return { code: `${res.status}`, message: `${res.statusText}` }
    }
    const person = await res.json();
    person.id = person.objectId;
    return await person;

    } catch (error) {
        return error.message;
    }
});

export const removeContact = createAsyncThunk('contacts/removeContact', async (contactId) => {
    try {
   const response = await fetch(`${baseUrl}/${contactId}`, {
        method: 'DELETE',
        headers: {
            'X-Parse-Application-Id': 'eIuHZ0NpWBbftCz4Wuld9RygonY0uCELwhgG2cJf',
            'X-Parse-REST-API-Key': 'kxclWGzoda8nuX8R05SfFOrICqv5poL5aXJUkrqk'
        }
    });

    if (!response.ok) {
        return { code: `${response.status}`, message: `${response.statusText}` }
    }

    return contactId;

    } catch (error) {
        return error.message;
    }
});

