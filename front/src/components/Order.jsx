import React from 'react'
import axios from 'axios'

const Order = ({address, city, producer, id, token}) => {

    const clickPvz = async () =>{
        const obj = {
            "pvz": id
        }
        try {
            const getPvz = await axios.post(`http://127.0.0.1:3001/getWay`, obj, {
                headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'multipart/form-data',
                },
            });
            console.log(getPvz)
        } catch (error) {
            alert('ошибка формирования путей')
        }
           
    }
    return ( 
        <div className="overlay">
            <div className="odrer">
                Оформление товара
                <div>Пункты выдачи</div>
                <div>
                    Пункт: 
                    <p>Адресс: {address}</p>
                    <p>Номер ПВЗ: {id}</p>
                    <p>Город: {city}</p>
                    <p>Продавец: {producer}</p>
                </div>
                <button onClick={clickPvz}>Выбрать этот пункт выдачи</button>
            </div>
        </div>
    );
}
 
export default Order;