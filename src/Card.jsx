import { useState } from 'react'
import {useEffect} from 'react'

function Card({index, onClick, name, image}){
    const [visible, setVisible] = useState(false);
    
    
    useEffect(()=>{
        setTimeout(function(){
            setVisible(true);
        }, 100);
    },[]);


    let classList = '';
   if(visible){
       classList = "card visible";
    } else{
        classList = "card" ;
    }

    return(
        <div className={classList} onClick={() => onClick(index)}>
            <img className="card-image" src={image}></img>
            <h3 className="card-name">{name}</h3>
        </div>
    )
}

export default Card