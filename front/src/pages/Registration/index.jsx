import React from 'react'
import axios from 'axios'

const Registration = () => {

    const [isRegistered, setIsRegisteres] = React.useState(false)
    const [LoginForm, setLoginForm] = React.useState({ 
        name: "",
        password: ""
    })

    function handleChange(event){
        const {value, name} = event.target
        setLoginForm(prev => ({
            ...prev, [name]: value
        }))
    }

    function btnRegistration(event){
        try {
            const obj = {
                name: LoginForm.name,
                password: LoginForm.password
            }
            const req =  axios.put('http://127.0.0.1:3001/register', obj)
            req.then((response)=> {
                if(response.data == 'зарегестрирован'){
                    setIsRegisteres(true)
                }
            })
        } catch (error) {
            alert('Ошибка')
        }
        event.preventDefault()
    }
    return ( 
        <div>
            Регистрация
            <form>
                <input type="text" placeholder="Имя" onChange={handleChange}  value={LoginForm.name} name='name'/>
                <input type="password" placeholder="Пароль" onChange={handleChange} value={LoginForm.password} name='password'/>
                <input type="submit" onClick={btnRegistration} />
            </form>
            {isRegistered ? 'Зареган': 'не зареган'}
        </div>
     );
}
 
export default Registration;