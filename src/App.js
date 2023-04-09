import React from 'react';

import Header from './features/common/header/Header.js';
import Footer from './features/common/footer/Footer.js';
import Catalog from './features/contacts/catalog/Catalog.js';

import './App.css';

function App() {
  return (
    <main className="container">
      <Header />
      <Catalog />
      <Footer />
    </main>
  );
}

export default App;
