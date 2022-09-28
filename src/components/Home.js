import {useNavigate} from 'react-router-dom';
import { useContext, useEffect, useState } from "react"
import { AppContext } from '../App';
import myImg from '../assets/book.jpg'
import HomeStyle from './Home.module.css'
import img1 from '../assets/london.jpg';
import img2 from '../assets/dauntBookMarlyebone.jpg';
import img3 from '../assets/fnac.jpg';
import img4 from '../assets/puerto.jpg';
import img5 from '../assets/miguel.jpg';
import img6 from '../assets/steimatzky.jpg';
import img7 from '../assets/moria.jpg';
import Footer from './Footer';

export const Home=(props)=>{
   const [stores,setStores]=useState([])
   const [loading,setLoading]=useState(true)
   const {setStoreId}=useContext(AppContext)
   const imgArr=[img1,img2,img3,img4,img5,img6,img7];
const naviguate=useNavigate();
   
   useEffect(()=>{
        getStores();
    },[])

   async function getStores(){
    try{
        const result=await fetch('https://logical-calf-89.hasura.app/api/rest/stores')
        .then(res=>res.json())
        .then(res=>res.stores)
         setStores(result);
         setLoading(false);
    }
    catch(e){
       console.log(e)
    }
   }
   function redirectBooks(e){
    // console.log(e.target.id);
    const id=e.target.id;
    console.log('parent',id);
    setStoreId(id)
     naviguate('/store')
   }
   
   function handle(e){
    // console.log(e.target.parentElement.id)
    
    const id=e.target.parentElement.id;
    console.log('child',id);
    e.stopPropagation();
    setStoreId(id);
    naviguate('/store')
   }
   if(loading){
    return(
      <div> </div>
    )
   }
  return(
    <>
    <div className={HomeStyle.stores}>
        {
        stores.map((elm,index)=>{
         return (
          <div className={HomeStyle.contain} key={elm.id} id={elm.id} onClick={redirectBooks} >
            <img id={HomeStyle.imgLib} src={imgArr[index]} onClick={handle}></img>
             <div className={HomeStyle.storeDtl} id={elm.id}>
                <h4 onClick={handle}>{elm.name}</h4>
                <p onClick={handle}>{elm.address}</p>
                <p onClick={handle}>{elm.city}</p>
              </div>
            </div>
            )
                 
        })
      }
    </div>
     if()
      <Footer/>
    </>
  )
}
export default Home