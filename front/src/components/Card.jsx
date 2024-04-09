import React from 'react'
import axios from 'axios'

const Card = ({id, name, photo, price, size, mass, description, producer, onPlus, token, }) => {

  
    const onClickCart = () =>{
        onPlus(id)
    } 
    console.log(photo)
    return ( 
        <div>
            Карточка товара
            <p>номер товара {id}</p>
            <p>Имя {name}</p>
            <p>Фото: 
                <img src={photo} alt="Photo" width={300}/>
            </p>
            <p>Цена:{price} </p>
            <p>Размер: {size}</p>
            <p>Масса {mass}</p>
            <p>Описание: {description}</p>
            <p>Продавец: {producer} </p>
            <button onClick={onClickCart}>Купить товар</button>
        </div>
        
     );
}
 
export default Card;