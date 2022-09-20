import logo from './logo.svg';
import './App.css';
import Store from './components/Store';
import Home from './components/Home';
import {Routes, Route } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import { createContext, useState } from 'react';

export const AppContext = createContext(null);

function App() {
  const [storeId,setStoreId]=useState('');
  const [bookId,setbookId]=useState('');
  return (
    <AppContext.Provider value={{storeId,setStoreId,bookId,setbookId}}>
      <nav>
        <p>BookStore</p>
      </nav>

      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/store' element={<Store/>}></Route>
        <Route path='/productDetail' element={<ProductDetail/>}></Route>
      </Routes>
     </AppContext.Provider>
  );
}

export default App;
