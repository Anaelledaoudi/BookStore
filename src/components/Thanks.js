import { useContext } from 'react'
import { AppContext } from '../App'
import ThanksStyle from './Thanks.module.css'
const Thanks =(props)=>{
  const {name,lname,order,setBooksArr}=useContext(AppContext);

  return(
      <>
       <div className={ThanksStyle.thanks}>
         <h2>Congrats, {name} {lname} </h2>
         <p>Your order: {order}</p>
         <p>Harrietts Bookshop will hope to see you again</p>
       </div>
       {
        setBooksArr([])
       }
      </>
    )
  } 
  export default Thanks