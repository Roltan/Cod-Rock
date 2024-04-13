import React from 'react'
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

const AddStuff = (props) => {
    const[isAdded, setIsAdded] = React.useState(false)
    const[order, setOrder] = React.useState(false)
    const [selectedFile, setSelectedFile] = React.useState(null);
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
        const get = getUrl.name
        const afterDot = get.substr(get.indexOf('.'));
        const idImg = uuidv4()
        
        const formData = new FormData();
        formData.append('name', stuff.name);
        formData.append('price', Number(stuff.price));
        formData.append('size', Number(stuff.size));
        formData.append('mass', Number(stuff.mass));
        formData.append('description', stuff.description);
        formData.append('photo', selectedFile); // assuming stuff.photo is a File object
        // console.log(selectedFile)
        formData.append('photoName', idImg+afterDot); // assuming stuff.photo is a File object

        event.preventDefault()

        const resp = await axios.put('http://127.0.0.1:3001/addStuff', formData, {
        headers: {
            'Authorization': 'Bearer ' + props.token
        },
        });
        console.log(resp.data)
    };
    
    function giveName (e){
        if (e.target.files.length > 0) {
        let filename = e.target.files[0].name;
        setSelectedFile(e.target.files[0]);
        setGetUrl({
            name: filename
        })
        }
        // console.log(getUrl)
        
    }
    
    
    return ( 
        <div>

            Добавление товара
            <form enctype="multipart/form-data" id='addStuffForm'>
                <input type="text" placeholder="название" name='name' onChange={handleChange} value={stuff.name}/>
                фото
                <input type="file" name='photoFile' onChange={
                    giveName
                }
                
                accept="image/png, image/gif, image/jpeg, image/jpg"
                />
                <input type="text" placeholder="цена" name='price'  onChange={handleChange} value={stuff.price}/>
                <input type="text" disabled placeholder="Имя файлы" name='photoName' value={getUrl.name}/>
                <input type="text" placeholder="Размеры" name='size'  onChange={handleChange}  value={stuff.size}/>
                <input type="text" placeholder="масса в кг" name='mass'  onChange={handleChange}  value={stuff.mass}/>
                Описание
                <textarea cols="30" rows="10" name='description'  onChange={handleChange}  value={stuff.description}></textarea>
                <button onClick={btnAdd}  type='submit'>Добавить товар</button>
            {isAdded ? 
                <div>'Товар добавлен'</div> : ''
            }
            </form>
            {}
        </div>
     );
}
 
export default AddStuff;