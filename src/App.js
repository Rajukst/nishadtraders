
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import UserList from './Pages/UserList/UserList';
import AddUser from './Pages/UserList/AddUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='users' element={<UserList/>} />
        <Route path='/add' element={<AddUser/>} />
   
      
       
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
