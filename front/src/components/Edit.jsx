import React from 'react'
import axios from "axios"
import AppContext from '../context'
import {v4 as uuidv4} from 'uuid';

const PvzEditComponent = ({data}) => {
    
    const {token} = React.useContext(AppContext)
    const [editingPvzId, setEditingPvzId] = React.useState(null); 
    const [pvz, setPvz] = React.useState({});
    const handleEditClick = (id) => {
        setEditingPvzId(id);
        const editedPvz = data.find(item => item.id === id); 
        setPvz(editedPvz); 
    };

    const savePvz = async () => {
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
            alert('Данные изменены')
            window.location.reload()
            setEditingPvzId(null); 
        } catch (error) {
            alert('Ошибка изменения PVZ');
        }
    };
    const deletePvz = async (id) => {
        try {
            const delPvz = await axios.delete(`http://127.0.0.1:3001/Producer/del/PVZ/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            });
            console.log(delPvz);
        } catch (error) {
            alert('Ошибка удаления ПВЗ');
        }
    };

    const handleChangePvz = (event) => {
        const { value, name } = event.target;
        setPvz(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainderMinutes = minutes % 60;
    
        const getMinutesEnding = (num) => {
            if (num >= 11 && num <= 19) {
                return "минут";
            }
    
            const lastDigit = num % 10;
            switch (lastDigit) {
                case 1:
                    return "минута";
                case 2:
                case 3:
                case 4:
                    return "минуты";
                default:
                    return "минут";
            }
        };
    
        if (hours === 1 && remainderMinutes === 0) {
            return `${hours} час`;
        } else if (hours > 0) {
            if (remainderMinutes === 0) {
                return `${hours} часов`;
            } else {
                return `${hours} часов ${remainderMinutes} ${getMinutesEnding(remainderMinutes)}`;
            }
        } else {
            return `${remainderMinutes} ${getMinutesEnding(remainderMinutes)}`;
        }
    };
    
    const handleCloseClick = () => {
        setEditingPvzId(null);
    };
    return (
        <>
            {data.map((item, index) => (
                <div key={index} className='pvz'>
                    <div>

                        <div>Адрес: {item.address}</div>
                        <div>Город: {item.city}</div>
                        <div>Расстояние от центра: {item.distance_from} км</div>
                        <div>Номер пункта выдачи: {item.id}</div>
                        <div>Стоимость от центра: {item.price_from} руб</div>
                        <div>Время от центра: {formatTime(item.time_from)}</div>
                    </div>
                    <div className='pvz-flex'>
                        {editingPvzId !== item.id && (
                            <button onClick={() => handleEditClick(item.id)}>Редактировать ПВЗ</button>
                        )}
                        <button className='del' onClick={() => deletePvz(item.id)}>Удалить ПВЗ</button>
                    </div>

                    {editingPvzId === item.id && (
                        <div className='pvz-2'>
                            <button className='hide' onClick={handleCloseClick}>Скрыть</button>
                            <form enctype="multipart/form-data">
                                <p>Адрес</p>
                                <input type="text" value={pvz.address} onChange={handleChangePvz} name='address' />
                                <p>Город</p>
                                <input type="text" value={pvz.city} onChange={handleChangePvz} name='city' />
                                <p>Расстояние от центра</p>
                                <input type="number" value={pvz.distance_from} onChange={handleChangePvz} name='distance_from' />
                                <p>Стоимость от центра</p>
                                <input type="number" value={pvz.price_from} onChange={handleChangePvz} name='price_from' />
                                <p>Время от центра</p>
                                <input type="number" value={pvz.time_from} onChange={handleChangePvz} name='time_from' />
                                <button type='button' onClick={savePvz}>Сохранить изменения</button>
                            </form>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};


  
const StuffEditComponent = ({data}) => {
    const[getUrl, setGetUrl] = React.useState({
        name: "" 
     })
    const {token} = React.useContext(AppContext)
    const[stuffClick, setStuffClick] = React.useState(false)
    const[selectedFile, setSelectedFile] = React.useState(false)
    const [selectedPreviewFile, setSelectedPreviewFile] = React.useState(null);
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
        setSelectedPreviewFile(URL.createObjectURL(e.target.files[0]));
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
    {data.map((item, index) => (
        <div className='pvz-3' key={index}>
            <div>Ид товара {item.id}</div>
            <div>Имя {item.name}</div>
            <div>Фото товара 
                <img src={item.photo} alt="photo" width={250} height={250}/>
            </div>
            <div>Цена {item.price} руб</div>
            <div>Размеры {item.size}</div>
            <div>Описание{item.description} </div>
            <div>Масса {item.mass} кг</div>
            <div className='pvz-flex'>
                <button onClick={()=> getEditStuff(
                        item.id, 
                        item.name, 
                        item.price, 
                        item.size, 
                        item.description,
                        item.mass
                    )}>редактировать товар</button>
                <button className='del' onClick={() => deleteStuff(item.id)}>Удалить товар</button>
            </div>
            {stuffClick && stuff.id === item.id && (
                <div className='pvz-3 pvz-4'>
                    <button type='button' className='hide' onClick={() => setStuffClick(false)}>Скрыть</button>
                    <form encType="multipart/form-data">
                        <p>Имя</p>
                        <input type="text" value={stuff.name} onChange={handleChangeStuff} name='name'/>
                        <p>Цена</p>
                        <input type="number" value={stuff.price} onChange={handleChangeStuff} name='price'/>
                        <p>Фото</p>
                        <input type="file" onChange={giveName} name='photo'/>
                        {selectedFile ? (
                        <img
                            src={selectedPreviewFile}
                            alt="Preview"
                            width="250"
                            height="250"
                            />
                        ) : (
                            <p>Фото не загружено</p>
                        )}
                        <input type="hidden" disabled placeholder="Имя файлы" name='photoName' value={getUrl.name}/>
                        <p>Размеры</p>
                        <input type="text" value={stuff.size} onChange={handleChangeStuff} name='size'/>
                        <p>Описание</p>
                        <input type="text" value={stuff.description} onChange={handleChangeStuff} name='description'/>
                        <p>Масса</p>
                        <input type="number" value={stuff.mass} onChange={handleChangeStuff} name='mass'/>
                        <button type='submit' onClick={saveStuff}>Сохранить изменения   </button>
                    </form>
                </div>
            )}
        </div>
    ))}
</>
  )
}

const StoreHouseEditComponent = ({ data }) => {
    const { token } = React.useContext(AppContext);
    const [editedStore, setEditedStore] = React.useState({
        id: '',
        city: ''
    });
    const [editableStoreId, setEditableStoreId] = React.useState(null);

    const saveStore = async () => {
        try {
            const formData = new FormData();
            formData.append('city', editedStore.city);

            const reqPvz = await axios.patch(`http://127.0.0.1:3001/Producer/patch/Storehouse/${editedStore.id}`, formData, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'content-type': 'multipart/form-data'
                },
            });
            console.log(reqPvz);
            setEditableStoreId(null); // После сохранения закрываем форму редактирования
        } catch (error) {
            alert('Ошибка изменения PVZ');
        }
    };

    async function deleteStore(id) {
        try {
            const delStore = await axios.delete(`http://127.0.0.1:3001/Producer/del/Storehouse/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            });
            console.log(delStore);
        } catch (error) {
            alert('Ошибка удаления склада');
        }
    }

    const handleChangeStore = (event) => {
        const { value, name } = event.target;
        setEditedStore(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            {data.map((item, index) => (
                <div key={index} className='pvz'>
                    <div>ID склада {item.id}</div>
                    <div>ID Продавца {item.producer}</div>
                    {editableStoreId === item.id ? (
                        <form encType="multipart/form-data">
                            <input placeholder='город' value={editedStore.city} onChange={handleChangeStore} name='city' className='store-input'/>
                            <button type='button' onClick={saveStore}>Сохранить изменения</button>
                        </form>
                    ) : (
                        <div>Город {item.city}</div>
                    )}
                    <div className='pvz-flex'>
                        {editableStoreId !== item.id ? <button onClick={() => {
                            setEditableStoreId(item.id);
                            setEditedStore({
                                id: item.id,
                                city: item.city
                            });
                        }}>Редактировать склад</button> : <button className='hide' onClick={() => setEditableStoreId(null)}>Скрыть</button>}
                        <button className='del' onClick={() => deleteStore(item.id)}>Удалить склад</button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default StoreHouseEditComponent;

  
  export { PvzEditComponent, StuffEditComponent, StoreHouseEditComponent };