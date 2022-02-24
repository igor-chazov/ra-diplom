import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import IndexPage from './pages/IndexPage';
import CatalogPage from './pages/CatalogPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Page404 from './pages/Page404';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/ra-diplom" element={<Navigate replace to="/" />} />
          <Route path="/" element={<IndexPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/catalog/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
