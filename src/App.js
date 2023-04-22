import React from 'react';
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import Header from './components/header/Header.js';
import Footer from './components/footer/Footer.js';
import Catalog from './features/contacts/catalog/Catalog.js';

import './App.css';

function App() {
  return (
    <div className="container">
      <Header />
      <main>
      <Routes>
        <Route path='/' element={<Navigate to={'/contacts'} />} />
        <Route path='/contacts/*' element={<Catalog />} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
