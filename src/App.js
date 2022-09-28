import logo from './logo.svg';
import './App.css';
import Store from './components/Store';
import Home from './components/Home';
import {Routes, Route } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import { createContext, useState } from 'react';
import Cart from './components/Cart';
import FinalizeOrder from './components/FinalizeOrder';
import Thanks from './components/Thanks';

export const AppContext = createContext(null);

function App() {
  const [storeId,setStoreId]=useState('');
  const [bookId,setbookId]=useState('');
  const [booksArr,setBooksArr]=useState([]);
  const [name,setName]=useState('');
  const [lname,setLname]=useState('');
  const [order,setOrder]=useState('');
  
  return (
    <AppContext.Provider value={{storeId,setStoreId,bookId,setbookId,booksArr,setBooksArr,name,setName,lname,setLname,order,setOrder}}>
      <nav>
        <div className='icon'></div>
        <p id='title'>READBOOK</p>
        <i id='cartNav' className="fa-solid fa-cart-shopping">
          <p id='cartLength'></p>
        </i>
      </nav>

      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/store' element={<Store/>}></Route>
        <Route path='/productDetail' element={<ProductDetail/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/finalizeOrder' element={<FinalizeOrder/>}></Route>
        <Route path='/thanks' element={<Thanks/>}></Route>
      </Routes>
     </AppContext.Provider>
  );
}

export default App;
