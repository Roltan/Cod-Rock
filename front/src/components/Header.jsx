import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'

const Header = (props) => {
    const Navigate = useNavigate();

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
    }

    const logged = localStorage.getItem('email')

    return ( 
        <div>
            Шапка сайта 
            {!logged ?
            <>
                <Link to='/login'>
                    <button>Войти</button>
                </Link>
                <Link to='/register'>
                    <button>Зарегаться</button>
                </Link>
            </>
            :
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
            </>}
                
        </div>
     );
}
 
export default Header;