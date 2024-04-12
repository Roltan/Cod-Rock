import React, { useState } from 'react'
import axios  from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import useToken from '../../components/useToken'

const Login = (props) => {
    const { setToken} = useToken()
    // валидация на отправку формы 
    const [loginForm, setLoginForm] = useState({
        name: "",
        password: ""
    })

    const Navigate = useNavigate()
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^[a-zA-Z0-9()]+$/;
        return passwordRegex.test(password);
    }
    async function btnLogin(event){
        event.preventDefault()
        if (!validateEmail(loginForm.name) && !validatePassword(loginForm.password)) {
            alert('Некорректный email или пароль');
            return;
        }

        try {
            const req = await axios({
                method: "POST",
                url: "http://127.0.0.1:3001/login",
                data:{
                    name: loginForm.name,
                    password: loginForm.password
                }
            })
            setToken(req.data.access_token)
            localStorage.setItem('name', loginForm.name)
            Navigate('/galary')
            window.location.reload()
        } catch (error) {
            if(error.response.data.errCode === 2){
                alert('Неверный логин или пароль')
            }
            else if(error.response.data.errCode === 2){
                alert('Не хватает данных')
            }
        }
        
    }
    function handleChange(event){
        const {value, name} = event.target
        setLoginForm(prev => ({
            ...prev, [name]: value
        }))
    }
    
    return ( 
        <section class="login">
            <div>
                <form>
                    <div class="header">
                        <div>
                            <div>
                                <h1>ВХОД</h1>
                            </div>
                        </div>
                        <div>
                            <h2>Нет аккаунта?</h2>
                            <Link to='/register'>
                                <div>ЗАРЕГЕСТРИРОВАТЬСЯ</div>
                            </Link>
                        </div>
                    </div>

                    <input type='text' value={loginForm.email} onChange={handleChange} placeholder="Логин" name='name'/>
                    <input type='password' value={loginForm.password} onChange={handleChange} placeholder="Пароль" name='password'/>
                    <a href="">Забыли пароль?</a>
                    <input type="submit" value="Войти" onClick={btnLogin} />
                </form>
            </div>
            <div>
                <div>
                    <img src="../img/woman.png" alt="" /> 
                </div>
            </div>
        </section>
     );
}
 
export default Login;