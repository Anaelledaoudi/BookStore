import { useContext, useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom';
import { AppContext } from "../App";
import HomeStyle from './Home.module.css'
import StoreStyle from './Store.module.css'
import myImg from '../assets/book.jpg'

export const Store=(props)=>{
   const [books,setBooks]=useState([]);
   const naviguate=useNavigate();
   const {storeId} = useContext(AppContext);
   const {setbookId} = useContext(AppContext);

    useEffect(()=>{
        getData();
    },[])

   async function getData(){
    try{
        const result=await fetch('https://logical-calf-89.hasura.app/api/rest/books')
        .then(res=>res.json())
        .then(res=>res.books)
        
        console.log(result)
        setBooks(result);
        //console.log(result);
        // if(result.status===200){

        // }
    }
    catch(e){
       console.log(e)
    }
   }
   function redirectBook(e){
    console.log('parent',e.target.id)
    setbookId(e.target.id);
    naviguate('/productDetail')
   }
   function handle(e){
    const id=e.target.parentElement.id;
    console.log('child',id);
    e.stopPropagation();
    setbookId(id);
    naviguate('/productDetail')
   }
   function addToCart(){
    
   }
   function prevPage(){
    naviguate('/')
   }

  return(
    <>
    <i onClick={prevPage} className={"fa-solid fa-circle-chevron-left prev"}></i>
    <div className={HomeStyle.stores}>
    {
       books.map(elm=>{
        if(elm.store_id===storeId)
        return(
         <div className={HomeStyle.contain+' '+StoreStyle.contain} key={elm.id} id={elm.id}  onClick={redirectBook}>
          <div className={HomeStyle.row1} onClick={redirectBook} id={elm.id}>
           <img onClick={handle} id={StoreStyle.imgBook}src={myImg}></img>
           <div onClick={redirectBook} id={elm.id} className={HomeStyle.storeDtl}>
              <h6 onClick={handle}>{elm.name}</h6>
              <p onClick={handle}>{elm.author}</p>
              <p onClick={handle}>{elm.type_book.name}</p>
           </div>
          </div>
          <div className={HomeStyle.row2} onClick={handle}>
              <p>{elm.price} &#8364;</p>
              <i className="fa-solid fa-cart-shopping" onClick={addToCart}></i>
          </div>
          </div>
        )
       })
    }
    </div>
    </>
  )
}
export default Store