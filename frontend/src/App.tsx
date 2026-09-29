import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './styles/modern-ui.css';
import FourOhThree from './pages/migrated-repo/FourOhThree';
import AdminhomeComponent from './AdminhomeComponent';
import AdminLogin from './pages/migrated-repo/AdminLogin';
import CartProduct from './src/pages/migrated-repo/CartProduct';
import CategoriesComponent from './CategoriesComponent';
import DisplayCustomers from './pages/migrated-repo/DisplayCustomers';
import IndexComponent from './IndexComponent';
import Products from './pages/Products';
import ProductsAdd from './src/pages/ProductsAdd';
import ProductsUpdate from './src/pages/ProductsUpdate';
import Register from './src/pages/Register';
import UpdateprofileComponent from './UpdateprofileComponent';
import Uproduct from './pages/Uproduct';
import UserLogin from './src/pages/UserLogin';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="modern-app-root">
        <header className="modern-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#2563eb' }}>Modernized Application</span>
          </div>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#475569', fontWeight: 500 }}>Home</Link>
          </nav>
        </header>
        <main className="modern-main-content">
          <Routes>
        <Route path="/" element={<FourOhThree />} />
        <Route path="/fourohthree" element={<FourOhThree />} />
        <Route path="/adminhome" element={<AdminhomeComponent />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/cartproduct" element={<CartProduct />} />
        <Route path="/categories" element={<CategoriesComponent />} />
        <Route path="/displaycustomers" element={<DisplayCustomers />} />
        <Route path="/index" element={<IndexComponent />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productsadd" element={<ProductsAdd />} />
        <Route path="/productsupdate" element={<ProductsUpdate />} />
        <Route path="/register" element={<Register />} />
        <Route path="/updateprofile" element={<UpdateprofileComponent />} />
        <Route path="/uproduct" element={<Uproduct />} />
        <Route path="/userlogin" element={<UserLogin />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
