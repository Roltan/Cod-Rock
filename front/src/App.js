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

function App() {
  const[items, setItems] = React.useState([])



  React.useEffect(()=>{
      async function fetchData(){
          const getItem = await axios.get("http://127.0.0.1:3001/galary")
          setItems(getItem.data.date)
      }
      fetchData()

  }, [])
  const {token, removeToken, setToken} = useToken()

  

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
          <Route path="/galary" element={<Catalog token={token} items={items}/>} />
          <Route path="/getPvz" element={<GetPvz token={token} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
