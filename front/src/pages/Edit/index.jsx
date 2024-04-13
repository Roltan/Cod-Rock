import React from 'react'
import axios from 'axios'
import AppContext from '../../context'
import { PvzEditComponent, StuffEditComponent, StoreHouseEditComponent } from '../../components/Edit';
import { Link, useNavigate } from 'react-router-dom';


const Edit = () => {
    const[pvz, setPvz] = React.useState([])
    const navigate = useNavigate()
    const[stuff, setStuff] = React.useState([])
    const [selected, setSelected] = React.useState({
        pvz: true,
        stuff: false,
        store: false
    });

    const[storeHouse, setStoreHouse] = React.useState([])
    const {token} = React.useContext(AppContext)
    React.useEffect(()=>{
        
        try {
            async function fetchPvz(){
                const pvz = axios({
                    method: "GET",
                    url:'http://127.0.0.1:3001/pvz/Producer', 
                    headers: {
                      Authorization: 'Bearer ' + token
                    }
                })
                pvz.then(response => setPvz(response.data))
            }
            fetchPvz()
            async function fetchStuff(){
                const stuff = axios({
                    method: "GET",
                    url:'http://127.0.0.1:3001/galaryProducer', 
                    headers: {
                      Authorization: 'Bearer ' + token
                    }
                })
                stuff.then(response => setStuff(response.data))
            }
            fetchStuff()
            async function fetchStore(){
                const store = axios({
                    method: "GET",
                    url:'http://127.0.0.1:3001/Storehouse/Producer', 
                    headers: {
                      Authorization: 'Bearer ' + token
                    }
                })
                store.then(response => setStoreHouse(response.data))
            }
            fetchStore()
            
        } catch (error) {
            alert("Ошибка в получении данных о магазине")
        }
    }, [token])
    

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
                            <p>имя компании</p>
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

                            <div><Link to='/producer'><img src="../img/back.svg" alt="arrow" className='back'/>Редактировать</Link></div>

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
                        {selected.pvz && <div className='title'>Редактировать пункт выдачи</div>}
                        {selected.store && <div className='title'>Редактировать склады</div>}
                        {selected.stuff &&<div className='title'>Редактировать товар</div>}
                        <div className='item-flex'>
                            {selected.pvz && 
                            <>
                                {pvz.length !== 0 ? <PvzEditComponent data={pvz}/> 
                                : 
                                <>
                                    <div className="info">У вас нет пункта выдачи товаров</div>
                                    <div className="btn btn-redact">Добавить</div>
                                </>}
                            </>} 
                            {selected.store && 
                            <>
                                {storeHouse.length !== 0 ? <StoreHouseEditComponent data={storeHouse}/>
                                : 
                                <>
                                    <div className="info">У вас нет складов</div>
                                    <div className="btn btn-redact">Добавить</div>
                                </>}
                            </>} 
                            {selected.stuff && 
                            <>
                                {stuff.length !== 0 ?  <StuffEditComponent data={stuff}/>
                                : 
                                <>
                                    <div className="info">У вас нет товаров</div>
                                    <div className="btn btn-redact">Добавить</div>
                                </>}
                            </>} 
                        </div>
                    </div>
                </div>
            </section>
        </>
        
     );
}
 
export default Edit;