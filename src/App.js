import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './features/common/header/Header.js';
import Footer from './features/common/footer/Footer.js';
import Catalog from './features/contacts/catalog/Catalog.js';

import './App.css';

function App() {
  return (
    <main className="container">
      <Header />
      <Routes>
        <Route path='/*' element={<Catalog />} />
        <Route path='contact/*' element={<Catalog />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
