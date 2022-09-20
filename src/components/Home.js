import {useNavigate} from 'react-router-dom';
import { useContext, useEffect, useState } from "react"
import { AppContext } from '../App';

export const Home=(props)=>{
   const [stores,setStores]=useState([])
   const {setStoreId}=useContext(AppContext)
   
const naviguate=useNavigate();
   
   useEffect(()=>{
        getStores();
    },[])

   async function getStores(){
    try{
        const result=await fetch('https://logical-calf-89.hasura.app/api/rest/stores')
        .then(res=>res.json())
        .then(res=>res.stores)
         setStores(result)
    }
    catch(e){
       console.log(e)
    }
   }
   function redirectBooks(e){
    console.log(e.target.id);
    console.log(e);
    setStoreId(e.target.id)
    naviguate('/store')
   }
   function handle(e){
    e.stopPropagation()
   }
  return(
    <>
    <div style={{display:"flex"}}>
        {
        stores.map(elm=>{
           return (
             <div key={elm.id} id={elm.id} onClick={redirectBooks}
                style={{border: "2px solid black",width:"20%", margin:"3%"}}>
                <p onClick={handle}>{elm.name}</p>
                <p onClick={handle}>{elm.address}</p>
                <p onClick={handle}>{elm.city}</p>
              </div>
            )
                 
        })
      }
    </div>
      
    </>
  )
}
export default Home