import React from 'react'
import axios  from 'axios';


const Store = (props) => {
    const[isAdded, setIsAdded] = React.useState(false)
    const[city, setCity] = React.useState({
        city: ""
    })

    function handleChange(event){
        const {value, name} = event.target
        setCity(prev => ({
            ...prev, [name]: value
        }))
    }

    function btnAdd(event){
        axios({
            method: "PUT",
            url: "http://127.0.0.1:3001/addStorehouse",
            headers: {
                Authorization: 'Bearer ' + props.token
            },
            data:{
                "city": city.city
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
            Добавление скалад города 
            <form>
                <input type="text" placeholder="название города" onChange={handleChange} name='city' value={city.city}/>
                <button onClick={btnAdd}>Добавить склад</button> 
                
            </form>
            {isAdded ? 
                <div>'Товар добавлен'</div> : ''}
        </div>
     );
}
 
export default Store;