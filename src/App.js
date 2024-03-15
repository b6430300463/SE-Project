import './App.css';
import Import from './Screen/Import';
import CheckPage from './Screen/Check';
import Login from './Screen/Login';
import Input from './Screen/Input';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CheckSubject from './Screen/checksubject';
import Requestsubject from './Screen/requestsubject';
import Users from './Screen/Users';
import MainPage from './Screen/Mainpage';
import MainPageAdmin from './Screen/MainpageAdmin';
import MainpageTable from './Screen/mainpagetable';
import ManageSchedule from './Screen/ManageSchedule';
import Request from './Screen/Request';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Request/>}/>
        <Route path="import" element={<Import/>} />
        <Route path="check" element={<CheckPage/>}/>
        <Route path="checksubject" element={<CheckSubject/>}/>
        <Route path="users" element={<Users/>}/>
        <Route path="mainpageteacher" element={<MainPage/>}/>
        <Route path="mainpageadmin" element={<MainPageAdmin/>}/>
        <Route path="mainpagetable" element={<MainpageTable/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="manageschedule" element={<ManageSchedule/>}/>
        <Route path="input" element={<Input/>}/>
        <Route path="request" element={<Request/>}/>
        <Route path="checkpage" element={<CheckPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;