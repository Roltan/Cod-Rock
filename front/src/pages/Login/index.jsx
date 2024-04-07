import React, { useState } from 'react'
import axios  from 'axios'
import {useNavigate} from 'react-router-dom'
import useToken from '../../components/useToken'

const Login = (props) => {
    const {token, setToken} = useToken()
    const [isLogin, setIsLogin] = useState(false)
    const [getJwt, setGetJwt] = useState({})
    const [loginForm, setLoginForm] = useState({
        name: "",
        password: ""
    })

    const Navigate = useNavigate()

    function btnLogin(event){
        axios({
            method: "POST",
            url: "http://127.0.0.1:3001/login",
            data:{
                name: loginForm.name,
                password: loginForm.password
            }
        })
        .then((response) =>{
            setGetJwt(response.data.access_token)
            setIsLogin(true)
            setToken(response.data.access_token)
            localStorage.setItem('email', loginForm.name)
            Navigate('/profile')
        }).catch((error) => {
            if(error.response){
                console.log(error.response)
            }
        })

        setLoginForm(({
            email: "",
            password: ""
        }))

        event.preventDefault()
    }
    function handleChange(event){
        const {value, name} = event.target
        setLoginForm(prev => ({
            ...prev, [name]: value
        }))
    }
    
    const getData = async () =>{
        try {
            const req = {
                'headers': { 'Authorization': 'Bearer ' + getJwt },
                'name': loginForm.name
            }
            const resp = await axios.get("http://127.0.0.1:3001/name/" + loginForm.name, req)
            console.log(resp)
        } catch (error) {
            alert('Ошибка')
        }
    }

    return ( 
        <>
        {!token && token!=="" && token!==undefined?
            <div> Вы не авторизованы</div>
        : <div>Вы  авторизованы</div>
        }
        <form>
            <b>{isLogin ? 'Вы авторизованы' : 'Вы не авторизованы'}</b>
            <input type="text" value={loginForm.email} onChange={handleChange} placeholder="Логин" name='name'/>
            <input type="password" value={loginForm.password} onChange={handleChange} placeholder="Логин" name='password'/>
            {/* <input type="passteword" value={loginForm.password} onChange={handleChange} placeholder="Пароль" /> */}
            <input type="submit" onClick={btnLogin} />
        </form>
        <button disabled={!isLogin} onClick={getData}>{isLogin ? 'Получить данные' : 'Авторизуйся'}</button>
        </>
     );
}
 
export default Login;