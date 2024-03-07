
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import UserList from './Pages/UserList/UserList';
import AddUser from './Pages/UserList/AddUser';
import SingleUser from './Pages/UserList/SingleUser';
import SingleUserReport from './Pages/UserList/SingleUserReport';
import SingleUserEdit from './Pages/UserList/SingleUserEdit';
import SingleUserDelete from './Pages/UserList/SingleUserDelete';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='users' element={<UserList/>} />
        <Route path='/add' element={<AddUser/>} />
        <Route path="users/:id" element={<SingleUser/>} />   
        <Route path=":id/report" element={<SingleUserReport/>} />   
        <Route path=":id/edit" element={<SingleUserEdit/>} />   
        <Route path=":id/delete" element={<SingleUserDelete/>} />   
      </Routes>
      <Toaster
  position="top-right"
  reverseOrder={false}
/>
      </BrowserRouter>
    </div>
  );
}

export default App;
