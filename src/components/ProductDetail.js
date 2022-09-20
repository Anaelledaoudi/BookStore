import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

const ProductDetail=(props)=>{
    const {bookId} = useContext(AppContext);
    const [book,setBook]=useState({}); 

    useEffect(()=>{
        getData();
    },[])

    async function getData(){
        try{
            const result=await fetch(`https://logical-calf-89.hasura.app/api/rest/books/${bookId}`)
            .then(res=>res.json())
            .then(res=>res.books[0])
            
            console.log(result)
            setBook(result);
            
            //console.log(result);
            // if(result.status===200){
    
            // }
        }
        catch(e){
           console.log(e)
        }
       }

    return(
       <>
         <div>
            <p>{book.name}</p>
            <p>By {book.author}</p>
            <p>{book.ratings}</p>
            <p>{book.description}</p>
            <h2>Products details</h2>
            <p>Publisher: {book.publisher}</p>
            <p>Language: {book.language}</p>
            <p>Paperback: {book.paperback}</p>
         </div>
         <div>
            <p>Buy: {book.price}</p>
            <p>As an alternative, pre-order the Kindle eBook instead to automatcally receive on day of release.</p>
            <button>Add to cart</button>
         </div>
       </>
    )
}
export default ProductDetail;