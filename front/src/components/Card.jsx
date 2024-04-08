const Card = ({name, foto, price, size, mass, description, producer}) => {

    return ( 
        <div>
            Карточка товара
            <p>Имя {name}</p>
            <p>Фото: 
                <img src={foto} alt="Photo" />
            </p>
            <p>Цена:{price} </p>
            <p>Размер: {size}</p>
            <p>Масса {mass}</p>
            <p>Описание: {description}</p>
            <p>Продавец: {producer} </p>
        </div>
        
     );
}
 
export default Card;