import React from 'react'
import axios from 'axios';

const AddStuff = (props) => {
    const[getUrl, setGetUrl] = React.useState({
       name: "" 
    })
    const[stuff, setStuff] = React.useState({
        name: "",
        price: "",
        size: "",
        mass: "",
        description: "",
        producer: ""
    })
    function handleChange(event){
        const {value, name} = event.target
        setStuff(prev => ({
            ...prev, [name]: value
        }))

    }

    function btnAdd(event){
        // const obj = stuff
        // console.log(stuff)
        // const req = await axios.put('http://127.0.0.1:3001/addStuff', obj)
        // console.log(req)
        // event.preventDefault()
    axios({
        method: "PUT",
        url: "http://127.0.0.1:3001/addStuff",
        headers: {
            Authorization: 'Bearer ' + props.token
        },
        data:{
            "name": stuff.name,
            "foto": getUrl.name,
            "price": Number(stuff.price),
            "size": Number(stuff.size),
            "mass": Number(stuff.mass),
            "description": stuff.description,
            "producer": Number(stuff.producer)
        }
    })
    .then((response) =>{
        if(response.data === 'создал'){
            console.log('создал')
        }
    }).catch((error) => {
        if(error.response){
            console.log(error.response)
        }
    })
    event.preventDefault()
}
    return ( 
        <div>
            Добавление товара
            <input type="text" placeholder="название" name='name' onChange={handleChange} value={stuff.name}/>
            фото
            <input type="file" name='foto' onChange={(e) =>{
                if (e.target.files.length > 0) {
                let filename = e.target.files[0].name;
                setGetUrl({
                    name: filename
                })
                }}
            }/>
            <input type="text" placeholder="цена" name='price'  onChange={handleChange} value={stuff.price}/>
            <input type="text" placeholder="Размеры" name='size'  onChange={handleChange}  value={stuff.size}/>
            <input type="text" placeholder="масса в кг" name='mass'  onChange={handleChange}  value={stuff.mass}/>
            Описание
            <textarea cols="30" rows="10" name='description'  onChange={handleChange}  value={stuff.description}></textarea>
            <input type="text" placeholder="продавец" name='producer'  onChange={handleChange}  value={stuff.producer}/>
            <button onClick={btnAdd}>Добавить товар</button>
        </div>
     );
}
 
export default AddStuff;