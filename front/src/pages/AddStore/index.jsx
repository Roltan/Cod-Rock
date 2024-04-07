import React from 'react'
import axios  from 'axios';


const Store = (props) => {
    const[city, getCity] = React.useState({
        name: ""
    })

    function btnAdd(event){

    // axios({
    //     method: "PUT",
    //     url: "http://127.0.0.1:3001/addStore",
    //     headers: {
    //         Authorization: 'Bearer ' + props.token
    //     },
    //     data:{
    //         "name": city.name
    //     }})
    //     .then((response) =>{
    //     if(response.data === 'создал'){
    //         console.log('создал')
    //     }})
    //     .catch((error) => {
    //     if(error.response){
    //         console.log(error.response)
    //     }
    //     })
    //     event.preventDefault()
    }
    return ( 
        <div>
            Добавление скалад города 
            <form>
                <input type="text" placeholder="название города" />
                <button onClick={btnAdd}>Добавить склад</button>
            </form>
        </div>
     );
}
 
export default Store;