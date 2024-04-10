import axios from 'axios';
import React from 'react'

const AddPvz = (props) => {
    const[isAdded, setIsAdded] = React.useState(false)
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

    async function btnAdd(event){
        const obj = {
            "address": pvz.address,
            "city": pvz.city,
            "time_from": pvz.time_from,
            "price_from": pvz.price_from,
            "distance_from": pvz.distance_from
        }
        console.log(obj)
        const addPvz = await axios.put('http://127.0.0.1:3001/addPVZ', obj, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
        
        event.preventDefault()
        console.log(addPvz)
    }

    return ( 
        <div>
            Добавление пункта выдачи заказов
            <div>
                <input type="text" placeholder="адресс" name="address"  onChange={handleChange} value={pvz.address}/>
                <input type="text" placeholder="город" name="city" onChange={handleChange} value={pvz.city}/>
                <input type="number" placeholder="время от центра города" name="time_from" onChange={handleChange} value={pvz.time_from}/>
                <input type="number" placeholder="цена от центра города" name="price_from" onChange={handleChange} value={pvz.price_from}/>
                <input type="number" placeholder="расстояние от центра города" name="distance_from" onChange={handleChange} value={pvz.distance_from}/>
                <button onClick={btnAdd}>Добавить пвз</button>
            </div>
            {isAdded ? 'Добавлен товар' : ''}
        </div>
     );
}
 
export default AddPvz;