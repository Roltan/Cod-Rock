import axios from "axios";
import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import AppContext from "../context";

const Header = (props) => {
    const Navigate = useNavigate();
    const {profileData} = React.useContext(AppContext)
    function logMeOut() {
        axios({
            method: "POST",
            url:"http://127.0.0.1:3001/logout",
        })
        .then((response) => {
            props.token()
            console.log(props.token())
            localStorage.removeItem('email')
            Navigate("/");
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
        window.location.reload()
        }
    const logged = localStorage.getItem('email')

    return ( 
        <div>
            Шапка сайта 
            {profileData.profile_role == 'гость' ?
            (<>
                <Link to='/login'>
                    <button>Войти</button>
                </Link>
                <Link to='/register'>
                    <button>Зарегаться</button>
                </Link>
            </>)
            : profileData.profile_role == 'producer' ? (
                <>
                    <button onClick={logMeOut}>Выйти</button>
                    <Link to='/addstuff'>
                        <button>добавить товар</button>
                    </Link>
                    <Link to='/addstore'>
                        <button>добавить склад</button>
                    </Link>
                    <Link to='/addpvz'>
                        <button>добавить пвз</button>
                    </Link>
                    <Link to='/galary'>
                        <button>каталог</button>
                    </Link>
                    <Link to='/edit'>
                        <button>Панель управления</button>
                    </Link>
                 </>
            ) : (
                <>
                    <button onClick={logMeOut}>Выйти</button>
                    <Link to='/galary'>
                        <button>каталог</button>
                    </Link>
                 </>
            )
            }
                
        </div>
     );
}
 
export default Header;