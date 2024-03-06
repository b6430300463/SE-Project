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
import MainpageTable from './Screen/mainpagetable';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<CheckPage/>}/>
        <Route path="import" element={<Import/>} />
        <Route path="checksubject" element={<CheckSubject/>}/>
        <Route path="users" element={<Users/>}/>
        <Route path="mainpage" element={<MainPage/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="input" element={<Input/>}/>
        <Route path="request" element={<Requestsubject/>}/>
        <Route path="checkpage" element={<CheckPage/>}/>
        <Route path="MainpageTable" element={<MainpageTable/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;