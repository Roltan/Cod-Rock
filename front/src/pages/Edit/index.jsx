import React from 'react'
import axios from 'axios'
import AppContext from '../../context'
import { PvzEditComponent, StuffEditComponent, StoreHouseEditComponent } from '../../components/Edit';

const Edit = () => {
    const[pvz, setPvz] = React.useState([])
    const[stuff, setStuff] = React.useState([])
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
    }, [])
    
    return ( 
        <>
        <div>Админ панель продавца</div>
        {pvz.length === 0 ? 'У вас нет достпуных ПВЗ' 
        : <PvzEditComponent data={pvz}/>
        }
        {stuff.length === 0 ? 'У вас нет достпуных товаров' 
        : <StuffEditComponent data={stuff}/>
        }
        {storeHouse.length === 0 ? 'У вас нет достпуных складов' 
        : <StoreHouseEditComponent data={storeHouse}/>
        }
        </>
     );
}
 
export default Edit;