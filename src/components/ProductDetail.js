import { Suspense, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import ProdDtlStyle from './ProductDetail.module.css';

const ProductDetail=(props)=>{
    const {bookId} = useContext(AppContext);
    const {booksArr,setBooksArr} = useContext(AppContext);
    const [book,setBook]=useState({}); 
    const [loading,setLoading]=useState(true); 
    const naviguate=useNavigate();
    useEffect(()=>{
        getData();
        const icon=document.getElementById('cartNav');
        icon.addEventListener('click',redirectCart);
    },[])

    async function getData(){
        try{
            const result=await fetch(`https://logical-calf-89.hasura.app/api/rest/books/${bookId}`)
            .then(res=>res.json())
            .then(res=>res.books[0])
            
            console.log(result)
            setBook(result);
            setLoading(false);
            //console.log(result);
            // if(result.status===200){
    
            // }
        }
        catch(e){
           console.log(e)
        }
       }
      function redirectCart(){
        naviguate('/cart');
      }
     function addBook(){
         let count=0;
         console.log('arr before',booksArr);
         if(booksArr.length!==-1){
            booksArr.forEach(elm=>{
            if(book.id===elm.id){
              elm.qty++;
              count++;
            }
          })
           if(count===0){
            booksArr.push({'id':book.id,'author':book.author,'name':book.name,'description':book.description,'price':book.price,'qty':1});
            setBooksArr(booksArr);
           }
         }
         else{
            setBooksArr({'id':book.id,'author':book.author,'name':book.name,'description':book.description,'price':book.price,'qty':1});
         }
         //   setArr([[...arr],bookId])
         
         console.log('arr after',booksArr);
         console.log(booksArr.length);
         addOneToCart();
      }
      function addOneToCart(){
        const p=document.getElementById('cartLength');
        console.log(p);
        p.textContent=booksArr.length;
        p.classList.add(ProdDtlStyle.cartDigit);
        const msg=document.getElementById('msgAdd');
        msg.textContent=`${book.name} added to cart`
        msg.classList.add(ProdDtlStyle.msg);
      }
     function prevPage(){
      naviguate('/store');
     }

  if(loading){
    return (
      <i className={"fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"+' '+ ProdDtlStyle.mySpin}></i>
    )
  }
    return(
       <>
        <i onClick={prevPage} className={"fa-solid fa-circle-chevron-left prev"}></i>
       <div className={ProdDtlStyle.container}>
         <div className={ProdDtlStyle.desc} >
            <div className={ProdDtlStyle.headDtl}>
              <h1>{book.name}</h1>
              <p>By {book.author}</p>
              <p>{book.ratings}</p>
            </div>
            
            <p>{book.description}</p>
            <h3>Products details</h3>
            <p>Publisher: {book.publisher}</p>
            <p>Language: {book.language}</p>
            <p>Paperback: {book.paperback}</p>
          </div>
          <div className={ProdDtlStyle.addCart}>
            <p id='msgAdd'></p>
            <p>Buy: {book.price}</p>
            <p>As an alternative, pre-order the Kindle eBook instead to automatcally receive on day of release.</p>
            <button onClick={addBook}>ADD TO CART</button>
         </div>
       </div>
       </>
    )
}

export default ProductDetail;