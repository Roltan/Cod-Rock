import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Header = (props) => {
    const Navigate = useNavigate();

    function logMeOut() {
        axios({
            method: "POST",
            url:"http://127.0.0.1:3001/logout",
        })
        .then((response) => {
            props.token()
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
                <button>Войти</button>:
                <button onClick={logMeOut}>Выйти</button>}
                
        </div>
     );
}
 
export default Header;