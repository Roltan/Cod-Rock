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
import Accept from './pages/Accept';

function App() {
  const[items, setItems] = React.useState([])
  const {token, removeToken, setToken} = useToken()
  

  React.useEffect(()=>{
      try {
        async function fetchData(){
          const getItem = await axios.get("http://127.0.0.1:3001/galary");
          setItems(getItem.data)
        }
        fetchData()
      } catch (error) {
        alert('ошибка получения')
      }

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
      <BrowserRouter>
        <Header token={removeToken} />
        <Routes>
          <Route path="/profile" element={<Profile token={token} setToken={setToken}/>}/>
          <Route path="/login" element={<Login setToken={token} token={token} />} />
          <Route path="/register" element={<Registration token={token} />} />
          <Route path="/addstuff" element={<AddStuff token={token} />} />
          <Route path="/addstore" element={<Store token={token} />} />
          <Route path="/addpvz" element={<AddPvz token={token} />} />
          <Route path="/galary" element={<Catalog token={token} items={items} onAddToCart={onAddToCart}/>} />
          <Route path="/getPvz" element={<GetPvz token={token} />} />
          {/* <Route path="/decoration" element={<Accept token={token} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
