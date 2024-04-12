import axios  from 'axios';
import React, { useContext } from 'react'
import AppContext from '../context';

const Profile = (props) => {
    React.useEffect(() => {
        getUsers();
    }, []);
     
    const{token} = useContext(AppContext)
    const [profileData, setProfileData] = React.useState([])
    async function getUsers() { 
        try {
            const req = await axios({
                method: "GET",
                url:`http://127.0.0.1:3001/user`, 
                headers: {
                  Authorization: 'Bearer ' + token
                }
              })

                req.data.access_token && props.setToken(req.data.access_token)
                setProfileData(({
                    profile_name: req.data.name,
                    profile_id: req.data.id,
                    profile_role: req.data.role
                }))
            
        } catch (error) {
            alert('Ошибка')
        }
    }
    return ( 
        <div>
            Профиль
            <p>Имя {profileData.profile_name}</p>
            <p>Ид {profileData.profile_id}</p>
            <p>Role {profileData.profile_role}</p>
            <p></p>
        </div>
     );
}
 
export default Profile;