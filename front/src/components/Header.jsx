import axios from "axios";
import React from 'react'
import {Link} from 'react-router-dom'
import AppContext from "../context";

const Header = (props) => {
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
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
        window.location.reload()
    }
    return ( 
        <>
            {profileData.profile_role == 'гость' ?
            (<header>
                 <div>
                    <div class="logo">
                        <img src="../img/logo.svg" alt="" />
                    </div>
                    <a href="">о нас</a>
                    <a href="">каталог</a>
                </div>
                <div class="noAuth">
                    <Link to='/login'>
                        <a href="">ВХОД</a>
                    </Link>
                    <Link to='/register'>
                        <a href="">РЕГИСТРАЦИЯ</a>
                    </Link>
                </div>
            </header>)
            : profileData.profile_role == 'producer' ? (
                <header>
                    <div>
                        <div class="logo">
                            <img src="../img/logo.svg" alt="shop" />
                        </div>
                        <a href="">о нас</a>
                        <a href="">каталог</a>
                    </div>
                    <div class="Auth">
                        <span>Привет, продовец!</span>
                        <a href="">
                            <img src="../img/shop.svg" alt="shop" />
                        </a>
                    </div>
                    {/* <button onClick={logMeOut}>Выйти</button>
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
                    </Link> */}
                </header>
            ) : (
                <header>
                    <div>
                        <div class="logo">
                            <img src="../img/logo.svg" alt="logotype" />
                        </div>
                        <a href="">о нас</a>
                        <a href="">каталог</a>
                    </div>
                    <div class="Auth">
                        <span>Привет, пользователь!</span>
                        <button onClick={logMeOut}>
                            Выход
                        </button>
                        <a href="">
                            <img src="../img/User.svg" alt="user" />
                        </a>
                        <a href="">
                            <img src="../img/Cart.svg" alt="cart" />
                        </a>
                    </div>
                    {/* <button onClick={logMeOut}>Выйти</button>
                    <Link to='/galary'>
                        <button>каталог</button>
                    </Link> */}
                 </header>
            )
            }
        </>
     );
}
 
export default Header;