import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from '../../context'

const PersonalUser = (props) => {
    const {token} = React.useContext(AppContext)
    const navigate = useNavigate()
    async function logMeOut() {
        try {
            const req = await axios({
                method: "POST",
                url:"http://127.0.0.1:3001/logout",
            })
            console.log(req.data)
            localStorage.removeItem('name')
            localStorage.removeItem('token')
            alert('Выход прошло успешно')
            navigate('/galary')
            window.location.reload()
        } catch (error) {
            alert('Ошибка при выходе из аккаунта, повторите попытку')
            console.log(error.response)
        }
    }
    return ( 
        <>
            {token ? 
            <section class="LcabUser">
                <div>
                    <img src="../img/User.svg" alt="user"/>
                    <div class="user">
                        <p>покупатель</p>
                        <img src="../img/basket.svg" alt="basket"/>
                    </div>
                    <p>имя покупателя</p>
                    <button>
                        <p>Изменить пароль</p>
                        <img src="../img/key.svg" alt="key"/>
                    </button>
                    <button>
                        <p>Удалить аккаунт</p>
                        <img src="../img/delUser.svg" alt="delete"/>
                    </button>
                </div>

                <div>
                    <div class="userFunc">
                        <div>
                            <Link to='/cart'>
                                <img src="../img/pack.svg" alt="pack"/>
                                <p>Мои покупки</p>
                            </Link>
                        </div>
                        <div>
                            <img src="../img/star.svg" alt="star"/>
                            <p>Избранное</p>
                        </div>
                    </div>
                    <button onClick={logMeOut} className='cup'>
                        <img src="../img/logout.svg" alt="logout"/>
                        <p >Выход из аккаунта</p>
                    </button>
                </div>
            </section> : 
            <>
            {navigate('/login')}
            {alert('Отказано в доступе, пожалуйста авторизуйтесь')}
            </>
            }
            
        </>
     );
}
 
export default PersonalUser;