import React from 'react'
import axios from 'axios'
import Order from './Order'

const Card = ({id, name, photo, price, size, mass, description, producer, onPlus, token}) => {
    const[isCart, setIsCart] = React.useState(false)
    const[pvz, setPvz] = React.useState([])
  
    const onClickCart = async () =>{
        // setIsCart(true);
        // onPlus(id);

    const getPvz = await axios.get(`http://127.0.0.1:3001/pvz/${producer}`)
    setIsCart(true)
    setPvz(getPvz.data)
      
}

    return ( 
        <div>
            Карточка товара
            <p>номер товара {id}</p>
            <p>Имя {name}</p>
            <p>Фото: 
                <img src={photo} alt="Photo" width={300} height={300}/>
            </p>
            <p>Цена:{price} </p>
            <p>Размер: {size}</p>
            <p>Масса {mass}</p>
            <p>Описание: {description}</p>
            <p>Продавец: {producer} </p>
            <button onClick={onClickCart}>Купить товар</button>
            
           {isCart? 
                // 
                pvz.map((item, index) => <Order key={index} {...item} token={token}/>)   
           : ''}
        </div>
        
     );
}
 
export default Card;