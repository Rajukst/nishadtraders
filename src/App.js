
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
import SingleUserReportEdit from './Pages/UserList/SingleUserReportEdit';
import ReportsPage from './Pages/UserList/ReportsPage';
import SignUp from './Pages/Login/SignUp';
import Employee from './Private/Employee';
import SmsReport from './Pages/SmsReport/SmsReport';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/employee' element={<Employee/>} />
        <Route path='/reports' element={<ReportsPage/>} />
        <Route path='users' element={<UserList/>} />
        <Route path='/add' element={<AddUser/>} />
        <Route path='/:id' element={<SingleUserReportEdit/>} />
        <Route path="users/:id" element={<SingleUser/>} />   
        <Route path=":id/report" element={<SingleUserReport/>} />   
        <Route path=":id/edit" element={<SingleUserEdit/>} />   
        <Route path=":id/delete" element={<SingleUserDelete/>} />   
        <Route path=":id/smsreport" element={<SmsReport/>} />   
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
