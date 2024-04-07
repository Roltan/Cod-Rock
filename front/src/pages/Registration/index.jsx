import React from 'react'
import axios from 'axios'

const Registration = () => {

    const [isRegistered, setIsRegisteres] = React.useState(false)
    const [role, setRole] = React.useState('user')
    const [registerForm, setRegisterForm] = React.useState({ 
        name: "",
        password: ""
    })

    function handleChange(event){
        const {value, name} = event.target
        setRegisterForm(prev => ({
            ...prev, [name]: value
        }))
    }

    function getRole (event){
        if (event.target.dataset.target == 1){
            setRole('user')
        }else{
            setRole('producer')
        }
    }
    
    function btnRegistration(event){
        // try {
            const obj = {
                
            }
            console.log(obj)
        //     const req = await axios.post('http://127.0.0.1:3001/register', obj)
        //     console.log(obj)
        //     req.then((response)=> {
        //         if(response.data == 'зарегестрирован'){
        //             setIsRegisteres(true)
        //         }
        //     })
        // } catch (error) {
        //     alert('Ошибка регистрации')
        // }


        axios({
            method: "PUT",
            url: "http://127.0.0.1:3001/register",
            data:{
                "name": registerForm.name,
                "password": registerForm.password,
                "role": role
            }
        })
        .then((response) =>{
            if(response.data === 'зарегестрирован'){
                setIsRegisteres(true)
            }
        }).catch((error) => {
            if(error.response){
                console.log(error.response)
            }
        })
        event.preventDefault()
        setRegisterForm({
            name: "",
            password: ""
        })
        setRole('user');

    }
    return ( 
        <div>
            Регистрация
            <form>
                <input type="text" placeholder="Имя" onChange={handleChange}  value={registerForm.name} name='name'/>
                <input type="password" placeholder="Пароль" onChange={handleChange} value={registerForm.password} name='password'/>
                <div onClick={getRole} data-target='1'>Покупатель</div>
                <div onClick={getRole} data-target='2'>Продавец</div>
                <input type="submit" onClick={btnRegistration} />
            </form>
            {isRegistered ? 'Зареган': 'не зареган'}
        </div>
     );
     
}
 
export default Registration;