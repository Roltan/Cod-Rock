import React from 'react'
import axios from 'axios'
import Login from "./pages/Login/index";
import useToken from "./components/useToken";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Registration from "./pages/Registration";
import AddStuff from "./pages/AddStuff";
import Store from "./pages/AddStore";
import AddPvz from "./pages/AddPvz";
import Catalog from "./pages/Catalog";
import GetPvz from './components/GetPvz';
import AppContext from "./context";
import Edit from './pages/Edit';
import PesrsonalUser from './pages/PersonalUser';
import PesrsonalProducer from './pages/PersonalProducer';


function App() {
  const[items, setItems] = React.useState([])
  const {token, removeToken, setToken} = useToken()
  const [profileData, setProfileData] = React.useState([])

  React.useEffect(()=>{
      try {
        async function fetchData(){
          const getItem = await axios.get("http://127.0.0.1:3001/galary");
          setItems(getItem.data)
        }
        fetchData()

        async function fetchUser(){
          const req = await axios({
              method: "GET",
              url:`http://127.0.0.1:3001/user`, 
              headers: {
                Authorization: 'Bearer ' + token
              }
          })

          req.data.access_token && setToken(req.data.access_token)
          setProfileData(({
              profile_name: req.data.name,
              profile_id: req.data.id,
              profile_role: req.data.role
          }))
        }
        if(token){
          fetchUser()
        }
        else{
          setProfileData(({
            profile_name: '',
            profile_id: '',
            profile_role: "гость"
        }))
        }
        
      } catch (error) {
        alert('ошибка получения')
      }
      // window.location.reload();
  }, [])


  function onAddToCart (id) {
    // console.log(id)
    try {
      axios({
        method: "PUT",
        url: "http://127.0.0.1:3001/addToCart",
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            "stuff": id
        }
    }).then((response) =>{
        console.log(response)
    }).catch((error) => {
        if(error.response){
            console.log(error.response)
        }
    })
    }
    catch{
        alert('оишкба')
    }
  }

  return (
    <div className="App">
      <AppContext.Provider value={{profileData, token}}>
        <BrowserRouter>
        
        <Header token={removeToken} />
          <Routes>
            <Route path="/addstuff" element={<AddStuff token={token} />} />
            <Route path="/addstore" element={<Store token={token} />} />
            <Route path="/addpvz" element={<AddPvz token={token} />} />
            <Route path="/getPvz" element={<GetPvz token={token} />} />
            <Route path="/profile" element={<Profile token={token} setToken={setToken}/>}/>

            <Route path="/profile" element={<Profile token={token} setToken={setToken}/>}/>

            <Route path="/login" element={<Login setToken={token} token={token} />} />
            <Route path="/register" element={<Registration token={token} />} />
            <Route path='/galary' element={<Catalog items={items} onAddToCart={onAddToCart} token={token} />}/>
            <Route path='/edit' element={<Edit token={token} />}/>
            <Route path='/user' element={<PesrsonalUser  />}/>
            <Route path='/producer' element={<PesrsonalProducer  />}/>
            {/* <Route path="/decoration" element={<Accept token={token} />} /> */}
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
