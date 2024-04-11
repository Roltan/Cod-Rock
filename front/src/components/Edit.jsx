import React from 'react'
import axios from "axios"
import AppContext from '../context'
import {v4 as uuidv4} from 'uuid';

const PvzEditComponent = ({data}) => {
    const {token} = React.useContext(AppContext)
    const[pvzClick, setPvzClick] = React.useState(false)
    const[pvz, setPvz] = React.useState({
        id: '',
        address: '',
        city: '',
        distance_from: '',
        price_from: '',
        time_from: ''
    })

    function handleChangePvz(event){
        const {value, name} = event.target
        setPvz(prev => ({
            ...prev, [name]: value
        }))
    }

    function getEditPvz(a,b,c,d,e,f){
        setPvz(
            {
            id: f,
            address: a,
            city: b,
            distance_from: c,
            price_from: d,
            time_from: e
        })
        setPvzClick(true)
    }
    async function deletePvz(a){
        try {
            const delPvz = await axios.delete(`http://127.0.0.1:3001/Producer/del/PVZ/${a}`, {
                    headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
        console.log(delPvz)
        } catch (error) {
            alert('ошибка удаления ПВЗ')
        }
    }
    const savePvz = async () =>{
        try {
            const formData = new FormData();
            formData.append('address', pvz.address);
            formData.append('city', pvz.city);
            formData.append('distance_from', Number(pvz.distance_from));
            formData.append('price_from', Number(pvz.price_from));
            formData.append('time_from', Number(pvz.time_from));

            const reqPvz = await axios.patch(`http://127.0.0.1:3001/Producer/patch/PVZ/${pvz.id}`, formData, {
                headers: {
                'Authorization': 'Bearer ' + token,
                'content-type': 'multipart/form-data'
            },
            
        });
            // console.log(reqPvz)
        } catch (error) {
            alert('Ошибка изменения PVZ')
        }
    }
    return(
        <>
        <hr />
        <div>Редактирование пвз</div>

            {data.map((item, index) => (
                <div key={index}>
                    <div>Адресс {pvzClick ? pvz.address : item.address}</div>
                    <div>Город {pvzClick ? pvz.city : item.city}</div>
                    <div>Расстояние от центра {pvzClick ? pvz.distance_from : item.distance_from} км</div>
                    <div>номер пункта выдачи {item.id}</div>
                    <div>Стоимость от центра {pvzClick ? pvz.price_from : item.price_from} руб</div>
                    <div>Время от центра {pvzClick ? pvz.time_from : item.time_from} мин</div>
                    <button onClick={()=> getEditPvz(
                        item.address, 
                        item.city, 
                        item.distance_from, 
                        item.price_from, 
                        item.time_from,
                        item.id
                        )}>редактировать товар</button>
                    <button onClick={()=> deletePvz(item.id)}>Удалить ПВЗ</button>
                </div>
            ))}
            {pvzClick ?
            <div>
                <form enctype="multipart/form-data">
                    <p>Адресс</p>
                    <input type="text" value={pvz.address} onChange={handleChangePvz} name='address'/>
                    <p>Город</p>
                    <input type="text" value={pvz.city} onChange={handleChangePvz} name='city'/>
                    <p>Расстояние от центра</p>
                    <input type="number" value={pvz.distance_from} onChange={handleChangePvz} name='distance_from'/>
                    <p>цена от центра</p>
                    <input type="number" value={pvz.price_from} onChange={handleChangePvz} name='price_from'/>
                    <p>Время от центра</p>
                    <input type="number" value={pvz.time_from} onChange={handleChangePvz} name='time_from'/>
                    <button type='submit' onClick={savePvz}>Сохранить изменения   </button>
                </form>
            </div>
            : ''}
            <hr />
        </>
    )
}
  
const StuffEditComponent = ({data}) => {
    const[getUrl, setGetUrl] = React.useState({
        name: "" 
     })
    const {token} = React.useContext(AppContext)
    const[stuffClick, setStuffClick] = React.useState(false)
    const[selectedFile, setSelectedFile] = React.useState(false)
    const[stuff, setStuff] = React.useState({
        id: '',
        name: '',
        price: '',
        size: '',
        description: '',
        mass: ''
    })
    async function deleteStuff(a){
        try {
            const delStuff = await axios.delete(`http://127.0.0.1:3001/Producer/del/Stuff/${a}`, {
                    headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
        console.log(delStuff)
        } catch (error) {
            alert('ошибка удаления Товара')
        }
    }
    function handleChangeStuff(event){
        const {value, name} = event.target
        setStuff(prev => ({
            ...prev, [name]: value
        }))
    }

    function getEditStuff(a,b,c,d,e,f){
        setStuff({
            id: a,
            name: b,
            price: c,
            size: d,
            description: e,
            mass: f,
        })
        setStuffClick(true)
    }

    function giveName (e){
        if (e.target.files.length > 0) {
        let filename = e.target.files[0].name;
        setSelectedFile(e.target.files[0]);
        setGetUrl({
            name: filename
        })
        }
        
    }
    const saveStuff = async (event) =>{
        const get = getUrl.name
        const afterDot = get.substr(get.indexOf('.'));
        const idImg = uuidv4()
        
        try {
            const formData = new FormData();
            formData.append('name', stuff.name);
            formData.append('price', Number(stuff.price));
            formData.append('size', stuff.size);
            formData.append('description', stuff.description);
            formData.append('mass', Number(stuff.mass));
            console.log(idImg + afterDot)
            formData.append('photoName', idImg + afterDot);
            console.log(selectedFile)
            formData.append('photo', selectedFile);
            event.preventDefault()
            const reqPvz = await axios.patch(`http://127.0.0.1:3001/Producer/patch/Stuff/${stuff.id}`, formData, {
                headers: {
                'Authorization': 'Bearer ' + token,
                'content-type': 'multipart/form-data'
            },
            
        });
        console.log(reqPvz.data)

        } catch (error) {
            
        }
    }
    // console.log(data)
  return(
    <>
        <div>Редактирование товара</div>
        <hr />
        {data.map((item, index) => (
            <div key={index}>
                <div>Ид товара {item.id}</div>
                <div>Имя {item.name}</div>
                <div>Фото товара 
                    <img src={item.photo} alt="photo" width={250} height={250}/>
                </div>
                <div>Цена {item.price} руб</div>
                <div>Размеры {item.size}</div>
                <div>Описание{item.description} </div>
                <div>Масса {item.mass} кг</div>
                <button onClick={()=> getEditStuff(
                        item.id, 
                        item.name, 
                        item.price, 
                        item.size, 
                        item.description,
                        item.mass
                    )}>редактировать товар</button>
                <button onClick={() => deleteStuff(item.id)}>Удалить товар</button>
            </div>
        ))}
         {stuffClick ?
            <div>
                <form encType="multipart/form-data">
                    <p>Имя</p>
                    <input type="text" value={stuff.name} onChange={handleChangeStuff} name='name'/>
                    <p>Цена</p>
                    <input type="number" value={stuff.price} onChange={handleChangeStuff} name='price'/>
                    <p>Фото</p>
                    <input type="file" onChange={giveName} name='photo'/>
                    <input type="text" disabled placeholder="Имя файлы" name='photoName' value={getUrl.name}/>
                    <p>Размеры</p>
                    <input type="text" value={stuff.size} onChange={handleChangeStuff} name='size'/>
                    <p>Описание</p>
                    <input type="text" value={stuff.description} onChange={handleChangeStuff} name='description'/>
                    <p>Масса</p>
                    <input type="number" value={stuff.mass} onChange={handleChangeStuff} name='mass'/>
                    <button type='submit' onClick={saveStuff}>Сохранить изменения   </button>
                </form>
            </div>
            : ''}
        <hr />
    </>
  )
}

const StoreHouseEditComponent = ({data}) => {
    const {token} = React.useContext(AppContext)
    const[storeClick, setStoreClick] = React.useState(false)
    const[store, setStore] = React.useState({
        id: '',
        city: ''
    })
    const saveStore = async () =>{
        try {
            const formData = new FormData();
            formData.append('city', store.city);
            
            const reqPvz = await axios.patch(`http://127.0.0.1:3001/Producer/patch/Storehouse/${store.id}`, formData, {
                headers: {
                'Authorization': 'Bearer ' + token,
                'content-type': 'multipart/form-data'
            },
            
        });
            console.log(reqPvz)
        } catch (error) {
            alert('Ошибка изменения PVZ')
        }
    }
    function getEditStore(a,b){
        setStore(
            {
            id: a,
            city: b
        })
        setStoreClick(true)
    }
    async function deleteStore(a){
        try {
            const delStore = await axios.delete(`http://127.0.0.1:3001/Producer/del/Storehouse/${a}`, {
                    headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
        console.log(delStore)
        } catch (error) {
            alert('ошибка удаления склада')
        }
        
    }

    function handleChangeStore(event){
        const {value, name} = event.target
        setStore(prev => ({
            ...prev, [name]: value
        }))

    }
    return(
        <>
            <div>Редактирование складов</div>
            {data.map((item, index) => (
                <>
                    <div key={index}>
                        <div>Ид склада {item.id}</div>
                        <div>Ид Продавца {item.producer}</div>
                        <div>Город {item.city}</div>
                        <button onClick={() => getEditStore(item.id, item.city)}>Редактировать склад</button>
                        <button onClick={() => deleteStore(item.id)}>Удалить склад</button>
                    </div>
                    
                </>
            ))}
            {storeClick ?
                    <form enctype="multipart/form-data">
                        <input placeholder='город' value={store.city} onChange={handleChangeStore} name='city'/>
                        <button type='submit' onClick={saveStore}>Сохранить изменения</button>
                    </form>
                    : ''}
        </>
    )
}
  
  export { PvzEditComponent, StuffEditComponent, StoreHouseEditComponent };