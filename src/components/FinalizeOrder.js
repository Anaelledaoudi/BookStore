import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import FinStyle from './FinalizeOrder.module.css'
// import HomeStyle from './Home.module.css'
const FinalizeOrder =(props)=>{
  const {name,setName,lname,setLname,booksArr,order,setOrder} = useContext(AppContext);
  const [address,setAddress]=useState('');
  const [tel,setTel]=useState('');  
  const naviguate=useNavigate();

   async function postData(e){
    e.preventDefault();
    const body = { address,"amount":booksArr.length,"books":JSON.stringify(booksArr),"firstName":name,"lastName":lname,"phoneNumber":tel};
    const headers = { 
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
    };
    axios.post('https://logical-calf-89.hasura.app/api/rest/orders', body, { headers })
        .then(response =>{
          setOrder(response.data.insert_orders_one.id); 
          console.log('orderId=>',order)
          if(response.status==200){
             naviguate('/thanks');
          }
        });
    }
    return(
      <>
       <div className={FinStyle.containerForm}>
        <h2>Finalize order</h2>
        <form onSubmit={postData}>
            <div className={FinStyle.name}>
                <input type={'text'} placeholder='Name' onChange={(e)=>{setName(e.target.value)}} />
                <input type={'text'} placeholder='Last name' onChange={(e)=>{setLname(e.target.value)}}/>
            </div>
            <input type={'text'} placeholder='Address' onChange={(e)=>{setAddress(e.target.value)}}/>
            <input type={'text'} placeholder='Tel' onChange={(e)=>{setTel(e.target.value)}}/>
            <input id={FinStyle.btn} type={'submit'} value='Buy'/>
        </form>
       </div>
      </>
    )
  } 
  export default FinalizeOrder