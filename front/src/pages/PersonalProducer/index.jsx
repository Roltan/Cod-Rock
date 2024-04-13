import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context";
import React from 'react'
import axios from 'axios'

const PersonalProducer = () => {
    const {profileData, token} = React.useContext(AppContext)
    const[user, setUser] = React.useState({
        id: '',
        name: '',
        role: ''
    })
    const navigate = useNavigate()
    React.useEffect(()=>{
        async function fetchUser(){
            try {
                const req = await axios('http://127.0.0.1:3001/user', {
                headers: {
                    Authorization: 'Bearer ' + token
                }})
                setUser(req.data)
            } catch (error) {
                alert('Ошибка получения данных')
            }
        }
        fetchUser()
    }, [token])
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
            {profileData.profile_role === 'producer' ? (
                <section class="LcabProd">
                <aside class="LcabHide">
                    <section class="LcabUser">
                        <div>
                            <img src="../img/User.svg" alt=""/>
                            <div class="user">
                                <p>продавец</p>
                                <img src="../img/box.svg" alt=""/>
                            </div>
                            <p>{user.name}</p>
                            <button>
                                <p>Изменить пароль</p>
                                <img src="../img/key.svg" alt=""/>
                            </button>
                            <button>
                                <p>Удалить аккаунт</p>
                                <img src="../img/delProducer.svg" alt=""/>
                            </button>
                        </div>
                        
                        <div>
                            <button onClick={logMeOut} className="cup">
                                <img src="../img/logout.svg" alt=""/>
                                <p>Выход из аккаунта</p>
                            </button>
                        </div>
                    </section>
                    <div></div>
                </aside>

                <div class="miShop">
                    <div>
                        <h1>Мой магазин</h1>
                        <img src="../img/User.svg" alt=""/>
                    </div>
                    
                    <div>
                        <Link to='/edit'>
                            Редактировать
                        </Link>
                    </div>
                    <div>
                        <Link to='/add'>
                            Добавить
                        </Link>
                    </div>
                </div>
                </section>

            ) : (
                <>
                    {navigate('/galary')}
                    {alert('Отказано в доступе')}
                </>  
            )}
        </>
     );
}
 
export default PersonalProducer;