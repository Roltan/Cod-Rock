import axios  from 'axios';
import React from 'react'

const Profile = (props) => {
    React.useEffect(() => {
        getUsers();
    }, []);
     
    const email = localStorage.getItem('email');
    const [profileData, setProfileData] = React.useState([])
    async function getUsers() { 
        try {
            const req = await axios({
                method: "GET",
                url:`http://127.0.0.1:3001/user`, 
                headers: {
                  Authorization: 'Bearer ' + props.token
                }
              })

                req.data.access_token && props.setToken(req.data.access_token)
                setProfileData(({
                    profile_name: req.data.name
                }))
            
        } catch (error) {
            alert('Ошибка')
        }
    }
    return ( 
        <div>
            Профиль
            <p>Имя {profileData.profile_name}</p>
            <p></p>
        </div>
     );
}
 
export default Profile;