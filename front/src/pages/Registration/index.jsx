import React from 'react'
import axios from 'axios'
import { Link, useNavigate} from 'react-router-dom'
import useToken from '../../components/useToken'

const Registration = () => {
    const {setToken} = useToken()
    const navigate = useNavigate()
    const [isRegistered, setIsRegisteres] = React.useState(false)
    const [accept, setAccept] = React.useState(false)
    const [role, setRole] = React.useState('user')
    // прикрутить валидацию на отпарвку форму через state
    const [registerForm, setRegisterForm] = React.useState({ 
        name: "",
        password: "",
        reppassword: ""
    })

    function handleChange(event){
        const {value, name} = event.target
        setRegisterForm(prev => ({
            ...prev, [name]: value
        }))
    }
    const acceptForm = () => {
        setAccept(prev => setAccept(!prev))
    }
    const handleCheckboxChange = () => {
        console.log(role)
        // Проверяем текущее значение роли
        if (role === 'user') {
            // Если текущая роль 'user', меняем на 'producer'
            setRole('producer');
        } else {
            // Если текущая роль не 'user' (то есть 'producer'), меняем на 'user'
            setRole('user');
        }
        
    };
    const validateForm = () => {
        if (registerForm.name.length < 4) {
            alert('Имя должно содержать минимум 4 символа');
            return false;
        }
        if (registerForm.password.length < 8) {
            alert('Пароль должен содержать минимум 8 символов');
            return false;
        }
        if (registerForm.password !== registerForm.reppassword) {
            alert('Пароль и его подтверждение не совпадают');
            return false;
        }
        const passwordRegex = /^[a-zA-Z\d]+$/;
        if (!passwordRegex.test(registerForm.password)) {
            alert('Пароль должен содержать латинские символы и цифры');
            return false;
        }
        return true;
    };
    
    async function btnRegistration(event){
        event.preventDefault()
        if(!accept){
            alert('Примите согласие с условиями политики безопасности и офертой')
            return;
        }
        if (!validateForm()) {
            return;
        }
        try {
            
            const req = await axios({
                method: "PUT",
                url: "http://127.0.0.1:3001/register",
                data:{
                    "name": registerForm.name,
                    "password": registerForm.password,
                    "role": role
                }
            })
            alert('Успешно зарегистрирован')
            setToken(req.data.access_token)
            localStorage.setItem('name', registerForm.name)
            navigate('/galary')
            window.location.reload()
        } catch (error) {
            if(error.response.data.errCode === 4){
                alert("Ошибка регистрации. Пользователь с таким именем существует")
            }
            else if(error.response.data.errCode === 1){
                alert("Не хватает данных для регистрации, заполните форму")
            }
        }
        
        // if(req.data){
        //     alert('Зарегистрирован')
        // }
        // else if(req.data.errcode === 4){
        //     alert('Пользователь с таким логином уже сущетсвует')
        // }
        setIsRegisteres(true)
      
        setRegisterForm({
            name: "",
            password: ""
        })
        setRole('user');

    }
    return ( 
        <section class="login">
            <div>
                <form>
                    <div class="header">
                        <div>
                            <div>
                                <h1>РЕГИСТРАЦИЯ</h1>
                                {role === 'user' ? <h2>для покупателя</h2> : <h2>для продавца</h2>}
                            </div>
                            <div>
                                <input type="checkbox" id="typeUser" onChange={handleCheckboxChange} checked={role === 'producer'}/>
                                <label for="typeUser">
                                    <div></div>
                                </label>
                            </div>
                        </div>
                        <div>
                            <h2>Есть аккаунт?</h2>
                            <Link to='/login'>
                                <div>ВОЙТИ</div>
                            </Link>
                        </div>
                    </div>

                    <input type="text" placeholder="Логин" onChange={handleChange}  value={registerForm.name} name='name' />
                    <input type="password" placeholder="Пароль" onChange={handleChange} value={registerForm.password} name='password' />
                    <input type="password" placeholder="Повторите пароль" onChange={handleChange} value={registerForm.reppassword} name='reppassword'/>
                    <div class="checkbox">
                        <input type="checkbox" id="accept" onChange={acceptForm}/>
                        <label for="accept"><a href="!#">Я соглашаюсь с условиями политики безопасности и офертой</a></label>
                    </div>
                    <input type="submit" onClick={btnRegistration} value="Зарегестрироваться" />
                </form>
            </div>
            <div>
                <div>
                    <img src="../img/box.png" alt="box" /> 
                </div>
            </div>
        </section>
     );
     
}
 
export default Registration;