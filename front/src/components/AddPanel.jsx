import axios from 'axios';
import React, { useContext } from 'react'
import {v4 as uuidv4} from 'uuid';
import AppContext from '../context';

const AddPvz = () => {
    const{token} = useContext(AppContext)
    const[pvz, setPvz] = React.useState({
        address: '',
        city: '',
        time_from: '',
        price_from: '',
        distance_from: '',
    })

    function handleChange(event){
        const {value, name} = event.target
        setPvz(prev => ({
            ...prev, [name]: value
        }))
    }
    const validateInt = (price) => {
        return /^\d+$/.test(price) && price.length >= 1;
    };
    async function btnAdd(event){
        if(!validateInt(pvz.time_from)){
            alert('Поле "Время от" должно содержать только цифры')
        }
        if(!validateInt(pvz.price)){
            alert('Поле "Цена от" должно содержать только цифры')
        }
        if(!validateInt(pvz.distance_from)){
            alert('Поле "Расстояние от" должно содержать только цифры')
        }
        if (pvz.city.trim() === '') {
            alert('Поле "Город" не может быть пустым.');
            return;
        }
        if (pvz.address.trim() === '') {
            alert('Поле "Адресс" не может быть пустым.');
            return;
        }
        const obj = {
            "address": pvz.address,
            "city": pvz.city,
            "time_from": Number(pvz.time_from),
            "price_from": Number(pvz.price_from),
            "distance_from": Number(pvz.distance_from)
        }
        try {
            const addPvz = await axios.put('http://127.0.0.1:3001/addPVZ', obj, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            
            event.preventDefault()
            console.log('Успешно добавлен')
        } catch (error) {
            if(error.response.errCode === 4){
                alert('Ошибка. По этому адрессу уже есть ПВЗ')
            }else{
                alert('Ошибка создания ПВЗ')
            }
       }
    }

    return ( 
        <> 
            <div class="flex-input">
                    <div class="input">
                        <p>Город</p>
                        <input type="text" placeholder="город" name="city" onChange={handleChange} value={pvz.city}/>
                    </div>
                    <div class="input">
                        <p>Адресс</p>
                        <input type="text" placeholder="адресс" name="address"  onChange={handleChange} value={pvz.address}/>
                    </div>
                    <div class="input">
                        <p>Время от</p>
                        <input type="number" placeholder="время от центра города" name="time_from" onChange={handleChange} value={pvz.time_from}/>
                    </div>
                    <div class="input">
                        <p>Центра от</p>
                        <input type="number" placeholder="цена от центра города" name="price_from" onChange={handleChange} value={pvz.price_from}/>
                    </div>
                    <div class="input">
                        <p>Расстояние от</p>
                        <input type="number" placeholder="расстояние от центра города" name="distance_from" onChange={handleChange} value={pvz.distance_from}/>
                    </div>
                    <button onClick={btnAdd} className='btn'>Добавить</button>
            </div>
        </>
     );
}

const Store = () => {
    const{token} = useContext(AppContext)
    const[city, setCity] = React.useState({
        city: ""
    })

    function handleChange(event){
        const {value, name} = event.target
        setCity(prev => ({
            ...prev, [name]: value
        }))
    }

    async function btnAdd(event){
        if (city.city.trim() === '') {
            alert('Поле "Город" не может быть пустым.');
            return;
        }
        event.preventDefault()
        try {
            const req = await axios.put('http://127.0.0.1:3001/addStorehouse', city, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            alert('Склад добавлен')
        } catch (error) {
            if(error.response.data.errCode === 4){
                alert('Ошибка. По этому адрессу уже есть склад')
            }else{
                alert('Ошибка при создании склада')
            }
        }
            
    }
    return ( 
        // <div>
        //     Добавление скалад города 
        //     <form>
        //         
        //         <button onClick={btnAdd}>Добавить склад</button> 
                
        //     </form>
        //     {isAdded ? 
        //         <div>'Товар добавлен'</div> : ''}
        // </div>
        <div class="flex-input">
            <div class="input">
                <p>Город</p>
                <input type="text" placeholder="название города" onChange={handleChange} name='city' value={city.city}/>
            </div>
            
            <div class="btn" onClick={btnAdd}>Добавить</div>
        </div>
     );
}

const AddStuff = () => {
    const [selectedPreviewFile, setSelectedPreviewFile] = React.useState(null);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const{token} = useContext(AppContext)
    const[getUrl, setGetUrl] = React.useState({
       name: "" 
    })
    const[stuff, setStuff] = React.useState({
        name: "",
        price: "",
        size: "",
        mass: "",
        description: "",
        photoName: ""
    })
    function handleChange(event){
  
        const {value, name} = event.target
        setStuff(prev => ({
            ...prev, [name]: value
        }))

    }

    async function btnAdd(event){
        try {
            if (!validatePrice(stuff.price)) {
                alert('Поле "Цена" должно содержать только цифры и не быть пустым.');
                return;
            }
    
            if (!validateName(stuff.name)) {
                alert('Поле "Имя" должно содержать только буквы и цифры, независимо от регистра, и не быть пустым.');
                return;
            }
    
            if (stuff.size.trim() === '') {
                alert('Поле "Размеры" не может быть пустым.');
                return;
            }
            if (stuff.description.trim() === '') {
                alert('Поле "Описание" не может быть пустым.');
                return;
            }
            if (!validateMass(stuff.mass)) {
                alert('Поле "Масса" должно содержать только цифры и не быть пустым.');
                return;
            }
            if(selectedFile === '' || selectedFile === undefined || selectedFile === null){
                alert('Пожалуйста, загрузите файл.');
                return;
            }
        
            const get = getUrl.name
            const afterDot = get.substr(get.indexOf('.'));
            const idImg = uuidv4()
            
            const formData = new FormData();
            formData.append('name', stuff.name);
            formData.append('price', Number(stuff.price));
            formData.append('size', Number(stuff.size));
            formData.append('mass', Number(stuff.mass));
            formData.append('description', stuff.description);
            formData.append('photo', selectedFile); 
            formData.append('photoName', idImg+afterDot);
    
            event.preventDefault()
    
            const resp = await axios.put('http://127.0.0.1:3001/addStuff', formData, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            });
            alert('Карточка успешно создана')
        } catch (error) {
            if(error.response.data.errCode === 2){
                alert("Ошибка доступа.")
            }
            else{
                alert("Ошибка создания товара")
            }

        }
        
    };
    
    function giveName (e){
        if (e.target.files.length > 0) {
        let filename = e.target.files[0].name;
        setSelectedFile(e.target.files[0]);
        setSelectedPreviewFile(URL.createObjectURL(e.target.files[0]));
        setGetUrl({
            name: filename
        })
        }
    }
    const validatePrice = (price) => {
        return /^\d+$/.test(price) && price.length >= 1;
    };

    const validateName = (name) => {
        return /^[a-zA-Zа-яА-Я0-9]+$/.test(name) && name.length >= 1;
    };

    const validateMass = (mass) => {
        return /^\d+$/.test(mass) && mass.length >= 1;
    };
    return ( 
        <div>
            <form enctype="multipart/form-data" id='addStuffForm'>
                <div class="grid-input">
                    <div class="input-g">
                        <p>Цена</p>
                        <input type="text" placeholder="цена" name='price'  onChange={handleChange} value={stuff.price}/>
                    </div>
                    <div class="input-g">
                        <p>Размеры</p>
                        <input type="text" placeholder="16см*15см" name='size'  onChange={handleChange}  value={stuff.size}/>
                    </div>
                    <div class="input-g">
                        <p>Имя</p>
                        <input type="text" placeholder="Имя" name='name' onChange={handleChange} value={stuff.name}/>
                    </div>
                    <div class="input-g">
                        <p>Масса</p>
                        <input type="text" placeholder="масса в кг" name='mass'  onChange={handleChange}  value={stuff.mass}/>
                    </div>
                </div>
                <div class="input">
                    <p><img src="./img/img.svg" alt="img" />Загрузить карточку товара</p>
                    <input type="file" onChange={giveName} name='photo'/>
                    <input type="hidden" disabled placeholder="Имя файлы" name='photoName' value={getUrl.name}/>

                </div>
                <div class="input">
                    <p>Описание</p>
                    <input type='text' name='description'  onChange={handleChange}  value={stuff.description} />
                    <div class="btn" onClick={btnAdd}>Добавить</div>
                </div>
                
            </form>
            <div class="pre-visible">   
                <div class="card-block">
                    <div class="card">
                        <div>
                            <div>
                                <img src={selectedPreviewFile} alt="photo" />
                            </div>
                            <div>
                                <div>
                                    <div class="img"><img src="./img/User.svg" alt="photo" /></div>
                                    <p>Продовец</p>
                                </div>
                                <p>{stuff.price} р.</p>
                                <button>Купить</button>
                            </div>
                        </div>
                        <div>
                            <p>{stuff.name}</p>
                            <div class="footer-card"><p>Продано 0</p> <div><span>{stuff.mass} кг</span><span>{stuff.size ? stuff.size : <div> </div>}</span></div></div>
                        </div>
                    </div>
                    <div class="btn">Список моих товаров</div>
                </div>
            </div>
        </div>
     );
}
 
export {AddPvz, Store, AddStuff};