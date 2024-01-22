import logo from './logo.svg';
import './App.css';
import AddVideo from './components/addVideo';
import ViewPost from './components/viewPost';
import Edit from './components/editUser';
import SeeOne from './components/view';
import { ToastContainer } from 'react-bootstrap';

// import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter , Routes ,Route } from 'react-router-dom';


function App() {
  return (
  <BrowserRouter>
  <ToastContainer />
  <Routes>
    <Route path="/" element={<AddVideo />} />
    <Route path="/view" element={<ViewPost />} />
    <Route path="/edit/:id" element={<Edit />} />
    <Route path="/viewone/:id" element={<SeeOne />} /> 
  </Routes>
  </BrowserRouter>
  );
}

export default App;