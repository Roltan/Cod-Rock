import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppContext from '../../context';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem';

const Cart = () => {
    const { token } = useContext(AppContext);
    const [cartItem, setCartItem] = useState([]);

    React.useEffect(() => {   
        try {
            async function fetchCart() {
                const req = await axios.get('http://127.0.0.1:3001/cart', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                setCartItem(req.data);
            }
            fetchCart();

        } catch (error) {
            alert('Ошибка получения корзины');
        }
    }, [token]);
    
    console.log(cartItem)
    return (
        <>        
            {cartItem.length === 0 ? (
                <>
                    <div className="cardList">
                        <div className="empty">
                            <h1>Ваша корзина пуста</h1>
                            <div><Link to='/galary'>Перейти в каталог</Link></div>
                        </div>
                    </div>
                    <footer></footer>
                </>
                    
            ) : (
                <section className="cart">
                    <h1>Корзина заказов</h1>
                    <div className="hr">
                        <p>Товар</p>
                        <p>Цена</p>
                        <p>Количество</p>
                        <p>Стоимость</p>
                    </div>

                    <div className="cardList">
                        {cartItem.map((item, index) => <CartItem key={index} {...item} />)}
                    </div>

                    <footer>
                        <div>
                            <button className='continue'><Link to='/galary'>Продолжить покупки</Link></button>
                        </div>
                    </footer>
                </section>
            )}
        </>
    );
}

export default Cart;
