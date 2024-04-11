import React from 'react'
import axios from 'axios'
import { MinDistanceComponent, MinPriceComponent, MinTimeComponent } from './Way';

const Order = ({address, city, producer, id, token}) => {
    // console.log(id)   
    const[isWay, setIsWay] = React.useState(false)
    const[getWay, setGetWay] = React.useState([]);
    const[reqPvz, setReqPvz] = React.useState({
        "pvz": id,
        "car": true,
        "air": true,
        "ship": true
    })
    const clickPvz = async () =>{
        try {
            const getPvz = await axios({
                method: "POST",
                url: "http://127.0.0.1:3001/getWay",
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: {
                    pvz: id,
                    car: reqPvz.car,
                    air: reqPvz.air,
                    ship: reqPvz.ship,
                }
            })
            console.log(getPvz)
            setGetWay(getPvz.data)

            setIsWay(true)
        } catch (error) {
            alert("ошибка формирования пути")
        }
            
    }

    const onAir = () => {
        setReqPvz(prevState => ({
          ...prevState,
          air: !prevState.air // Инвертируем значение свойства air
        }));
      };
      
    const onShip = () => {
    setReqPvz(prevState => ({
        ...prevState,
        ship: !prevState.ship // Инвертируем значение свойства ship
    }));
    };
    
    const onCar = () => {
    setReqPvz(prevState => ({
        ...prevState,
        car: !prevState.car // Инвертируем значение свойства car
    }));
    };
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
                    <button onClick={onAir}>Воздух</button>
                    <button onClick={onShip}>Корабль</button>
                    <button onClick={onCar}>Авто</button>
                    {reqPvz.ship ? <div>Корабль вкл</div> : <div>Корабль выкл</div>}
                    {reqPvz.car ? <div>Авто вкл</div> : <div>Авто выкл</div>}
                    {reqPvz.air ? <div>Воздух вкл</div> : <div>воздух выкл</div>}

                    <button onClick={clickPvz}>Выбрать этот пункт выдачи</button>
                    {isWay ? 
                    <> 
                        <div>Сформированные пути</div>
                        <MinDistanceComponent id={id} data={getWay.minDistance} pvz={reqPvz.pvz} token={token}/>
                        <MinPriceComponent id={id} data={getWay.minPrice}  pvz={reqPvz.pvz} token={token}/>
                        <MinTimeComponent id={id} data={getWay.minTime}  pvz={reqPvz.pvz} token={token}/>
                    </>
                         : <div>путь не сформирован</div>}
                </div>
        </div>
    );
}
 
export default Order;