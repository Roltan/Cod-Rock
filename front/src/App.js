import Login from "./pages/Login/index";
import useToken from "./components/useToken";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Registration from "./pages/Registration";

function App() {
  const {token, removeToken, setToken} = useToken()

  return (
    <div className="App">
      <BrowserRouter>
        <Header token={removeToken} />
        {!token && token!=="" && token!==undefined?
        <Login setToken={setToken}/>
        :(
          <>
            <Routes>
              <Route path="/profile" element={<Profile token={token} setToken={setToken}/>}/>
            </Routes>
          </>
        )

        }
        <Registration />
      </BrowserRouter>
    </div>
  );
}

export default App;
