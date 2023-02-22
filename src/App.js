import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import ProfileInfo from './pages/user-route/ProfileInfo';
import UserProvider from './context/UserProvider';
import Error from './pages/Error';
import Booking from './components/Booking';
import AdminDashboard from './pages/user-route/AdminDashboard';

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
    <ToastContainer position='bottom-center'/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/services" element={<Home/>} />
      {/* <Route component={Error}/> */}
      {/* <Route index element={<div>Default Page Content</div>} /> */}

      <Route path="/user" element={<PrivateRoute/>}>
        <Route path="user-info" element={<ProfileInfo/>}/>
        <Route path="seats" element={<Booking/>}/>        
        {/* <Route component={Error}/> */}
        </Route>

      <Route path="/admin" element={<PrivateRoute/>}>
      <Route path="dashboard" element={<AdminDashboard/>}/>        
      </Route>
      <Route path="*" element={<Error/>} />
    </Routes>
    </BrowserRouter>
    </UserProvider>
    );
}

export default App;
