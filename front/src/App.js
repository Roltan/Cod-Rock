import Login from "./pages/Login/index";
import useToken from "./components/useToken";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Registration from "./pages/Registration";

import AddStuff from "./pages/AddStuff";
import Store from "./pages/AddStore";

function App() {
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
