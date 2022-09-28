import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App'
import CartStyle from './Cart.module.css'

const Cart =(props)=>{
  const {booksArr,setBooksArr}=useContext(AppContext);
  const [sum,setSum]=useState('');
  const naviguate=useNavigate();

  useEffect(()=>{
    console.log('aa');
    let count=0;
    booksArr.map((elm,index)=>{
      count+=elm.price;
    })
    console.log(count);
    setSum(count);

  },[])

  function removeBook(id){
     console.log(id);
     let priceElm;
     console.log('oldArr',booksArr)
     booksArr.map((elm,index)=>{
      if(elm.id===id){
        booksArr.splice(index,1);
        priceElm=elm.price
      }
      
     })
     
     console.log('newArr',booksArr)
     setBooksArr(booksArr);
     const p=document.getElementById('cartLength');
     p.textContent=booksArr.length;
     naviguate('/cart');
     setSum(sum-priceElm);
      console.log('after',sum);
  }
  function redirectFinalize(){
    naviguate('/finalizeOrder');
  }
  return(
    <>
    <div className={CartStyle.cartGrid}>
      <p>Name</p>
      <p>Quantity</p>
      <p>Price</p>
      <p> </p>
     {
       booksArr.map(elm=>{
        return(
          <>
             <div className={CartStyle.name}>
               <p>{elm.author} - {elm.name}</p>
               <p>{elm.description}</p>
             </div>
             <div>
               <p>{elm.qty}</p>
             </div>
             <div>
               <p>{elm.price}</p>
             </div>
             <div><i class="fa-solid fa-trash" onClick={()=>removeBook(elm.id)}></i></div>
          </>
        )
      })
     }
     <div></div>
     <div></div>
     <div></div>
     <div>{sum}</div>

     <div></div>
     <div></div>
     <div></div>
     <button onClick={redirectFinalize}>Next</button>
    </div>
      

      
    </>
  )
} 
export default Cart