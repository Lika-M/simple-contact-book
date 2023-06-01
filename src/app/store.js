import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from '../features/contacts/catalog/catalogSlice.js'

export const store = configureStore({
  reducer: {
    contacts: catalogReducer
  },
});
