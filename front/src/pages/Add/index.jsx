import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from '../../context'
import axios from 'axios'
import { AddPvz, Store, AddStuff} from '../../components/AddPanel'

const Add = () => {
    const navigate = useNavigate()
    // const[pvz, setPvz] = React.useState([])
    // const[stuff, setStuff] = React.useState([])
    const [selected, setSelected] = React.useState({
        pvz: true,
        stuff: false,
        store: false
    });
    const { profile_name} = React.useContext(AppContext)
    

    const handleTabClick = (tab) => {
        setSelected({
            pvz: tab === 'pvz',
            stuff: tab === 'stuff',
            store: tab === 'store'
        });
    };
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
            <section className="LcabProd">
                <aside className="LcabHide">
                    <section className="LcabUser">
                        <div>
                            <img src="../img/User.svg" alt=""/>
                            <div className="user">
                                <p>продавец</p>
                                <img src="../img/box.svg" alt=""/>
                            </div>
                            <p>{profile_name}</p>
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
                            <button onClick={logMeOut} className='cup'>
                                <img src="../img/logout.svg" alt=""/>
                                <p>Выход из аккаунта</p>
                            </button>
                        </div>
                    </section>
                    <div></div>
                </aside>
                <div className="redactShop">
                    <div>
    
                            <div><Link to='/producer'><img src="../img/back.svg" alt="arrow" className='back'/>Добавить</Link></div>

                    </div>
                    <div className={selected.pvz ? "active" : ""} onClick={() => handleTabClick('pvz')}>
                        Пункты выдачи заказов
                    </div>
                    <div className={selected.store ? "active" : ""} onClick={() => handleTabClick('store')}>
                        Склады
                    </div>
                    <div className={selected.stuff ? "active" : ""} onClick={() => handleTabClick('stuff')}>
                        Товары
                    </div>
                </div>
                <div className="readactPanel">
                    <div className="containerPanel">
                        {selected.pvz && <div className='title'>Добавить пункт выдачи</div>}
                        {selected.store && <div className='title'>Добавить склады</div>}
                        {selected.stuff &&<div className='title'>Добавить товар</div>}
                        {selected.pvz && <AddPvz /> } 
                        {selected.store && <Store /> } 
                        {selected.stuff && <AddStuff /> } 
                    

                    </div>
                </div>
            </section>
        </>
     );
}
 
export default Add;