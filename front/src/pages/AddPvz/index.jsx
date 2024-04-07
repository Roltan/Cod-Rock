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

    function btnAdd(event){
        console.log(pvz)
        axios({
            method: "PUT",
            url: "http://127.0.0.1:3001/addPVZ",
            headers: {
                Authorization: 'Bearer ' + props.token
            },
            data:{
                "address": pvz.address,
                "city": pvz.city,
                "time_from": Number(pvz.time_from),
                "price_from": Number(pvz.price_from),
                "distance_from": Number(pvz.distance_from)
            }})
            .then((response) =>{
            if(response.data === 'создал'){
                console.log('создал')
                setIsAdded(true)
            }})
            .catch((error) => {
            if(error.response){
                console.log(error.response)
            }
            })
            event.preventDefault()
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