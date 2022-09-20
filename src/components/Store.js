import { useContext, useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom';
import { AppContext } from "../App";

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
    console.log(e.target.id)
    setbookId(e.target.id);
    naviguate('/productDetail')
   }
   function handle(e){
    e.stopPropagation();
   }
  return(
    <>
    {
       books.map(elm=>{
        if(elm.store_id===storeId)
        return(
          <div id={elm.id} key={elm.id} onClick={redirectBook}
             style={{border: "2px solid black",width:"20%", margin:"3%"}}>
            <p onClick={handle}>{elm.name}</p>
            <p onClick={handle}>{elm.author}</p>
            <p onClick={handle}>{elm.type_book.name}</p>
          </div>
        )
       })
    }
    </>
  )
}
export default Store