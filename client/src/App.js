import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './views/Main';
import {
  Routes,
  Route,
  useNavigate, Link
} from "react-router-dom";
import RegistrationPage from './views/RegistrationPage';
import Dashboard from './views/Dashboard';
import { useState } from 'react';
import axios from 'axios';
import Login from './views/LoginPage';


function App() {

  const [logged, setLogged] = useState(null);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    axios.get("http://localhost:8000/api/logout", { withCredentials: true })
      .then(res => {
        navigate("/")
        setLogged("")
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
        {/* {logged !== null ? <Link onClick={handleLogout} id="m-1" className="btn btn-outline-dark btn-info p-1" to={`/`}>Logout</Link> : <Link id="m-1" className="btn btn-outline-dark btn-info p-1" to="/login">Login</Link>}  */}
        {logged !== null ? <Link onClick={handleLogout} className="btn btn-outline-dark " to={`/`}>Logout</Link> : <Link className="btn btn-outline-dark " to="/login">Login</Link>} 

      
      <Routes>
            <Route element={ <Main logged={logged}/>}  path="/"/>
            <Route element={ <RegistrationPage setLogged={setLogged}/>}  path="/register"/>
            <Route element={ <Dashboard logged={logged} setLogged={setLogged}/>}  path="/dashboard/:_id"/>
            <Route element={ <Login setLogged={setLogged}/>}  path="/login/"/>

            {/* <RegistrationPage path="/register" setLogged={setLogged} /> 
            <Dashboard path="/dashboard/:_id" logged={logged}/> */}
            {/* <Route element={<LoginForm />} path="/login"/> */}

        </Routes>  
    </div>
  );
}

export default App;
