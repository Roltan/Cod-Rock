import React, { useContext, useState } from 'react';
import axios from 'axios'
import AppContext from '../context';
import { MinDistanceComponent, MinTimeComponent } from './Way';

const CartItem = ({ id, name, photo, price, size, mass, description, producer }) => {
    const [quantity, setQuantity] = useState(1);
    const{token} = useContext(AppContext)
    const[pvz, setPvz] = React.useState([])
    const[res, setRes] = React.useState([])
    const[req, setReq] = React.useState({
        pvz: '',
        car: true,
        air: true,
        ship: true
    })
    const[isPvz, setIsPvz] = React.useState(false)
    const[isWay, setIsWay] = React.useState(true)
    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };
    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setReq(prevState => ({
            ...prevState,
            [id]: checked
        }));
    };
    async function getPvz(id){
        try {
            const req = axios.get(`http://127.0.0.1:3001/pvz/${id}`, {
                headers:{
                    Authorization: 'Bearer ' + token
            }})
            req.then((response)=> setPvz(response.data))
            console.log(pvz)
            setIsPvz(true)
        } catch (error) {
            alert('Ошибка при подборе ПВЗ')
        }
    }
    const totalPrice = price * quantity;
    const setReqPvz = (id) => {
        setReq(prevState => ({
            ...prevState,
            pvz: id
        }));
    }
    const acceptOrder = async () =>{
        try {
            const response = await axios.post('http://127.0.0.1:3001/getWay', req , {headers:{
                Authorization: 'Bearer ' + token
            }})
            setRes(response.data)
            setIsWay(false)
        } catch (error) {
            alert('Ошибка формирования путей')
        }
    }
    console.log(res)
    return (<>
        {isWay ? (<>{isPvz ? 
           
           <section class="cart">
               <div class="cardList">
                   <div class="choosePVZ">
                       <h1>Выбирай доставку как тебе удобно</h1>
                       <div class="pvz">
                           <h2>Пункты выдачи</h2>
                           {pvz && pvz.map((item, index) => <button onClick={()=>setReqPvz(id)}><p key={index}>{item.address}</p></button>)}
                       </div>
                       <div class="type">
                           <h2>Отключи те способы доставки которые тебе не подходят</h2>
                           <div>
                               <div>
                                   <p>Воздух</p>
                                   <input type="checkbox" id="air" checked={req.air} onChange={handleCheckboxChange}/>
                                   <label for="air"><div></div></label>
                               </div>
                               <div>
                                   <p>Корабль</p>
                                   <input type="checkbox" id="ship" checked={req.ship} onChange={handleCheckboxChange}/>
                                   <label for="ship"><div></div></label>
                               </div>
                               <div>
                                   <p>Авто</p>
                                   <input type="checkbox" id="car" checked={req.car} onChange={handleCheckboxChange}/>
                                   <label for="car"><div></div></label>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
               <footer>
                   <div>
                       <button onClick={acceptOrder}>Продолжить оформление заказа</button>
                       <button>Перейти в каталог</button>
                   </div>

               </footer>
           </section> : 
            <div className="card">
                <div className='offer'>
                    <button onClick={() => getPvz(producer)}>Оформить <br />заказ</button>
                </div>
                <img src={photo} alt="stuff" />
                <div>
                    <p>Название {name}</p>
                    <p>
                        <span>Масса {mass} кг</span><br />
                        <span>Размер {size}</span>
                    </p>
                    <div className="del">Удалить</div>
                    <div>
                        <div className="img"><img src="../img/User.svg" alt="" /></div>
                        <p>Продавец {id}</p>
                    </div>
                </div>
                <p>Цена {price}</p>
                <div>
                    <input type="number" min="1" max="10" placeholder="1" value={quantity} readOnly />
                    <div className="numberBTN">
                        <button onClick={handleIncrement}>+</button>
                        <button onClick={handleDecrement}>-</button>
                    </div>
                </div>
                
        <p>{totalPrice} р.</p>
            </div>
       }</>) : (
       <section class="cart">
        <h1>Корзина заказов</h1>
            <div class="hr">
                <div>Выбери свой путь!</div>
            </div>

            <div class="cardList">
                <div class="accept">
                    <div>
                        <h2>Минимальное расстояние</h2>
                        {res.minDistance.map((item, index) => <MinDistanceComponent key={index} data={[item]} />)}

                    </div>
                    <div>
                        <h2>Минимальное время</h2>
                        {res.minTime.map((item, index) => <MinTimeComponent key={index} data={[item]} />)}

                    </div>
                </div>
            </div>

            <footer>
                <div>
                    <button>Заказать</button>
                    <button>Перейти в каталог</button>
                </div>
            </footer>
       </section>)}
            
        </>
    );
    
}

export default CartItem;
