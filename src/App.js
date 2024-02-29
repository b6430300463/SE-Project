import './App.css';
import Import from './Screen/Import';
import CheckPage from './Screen/Check';
import Login from './Screen/Login';
import Input from './Screen/Input';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import CheckSubject from './Screen/checksubject';
import requestsubject from './Screen/requestsubject';
import Users from './Screen/Users';
import MainPage from './Screen/Mainpage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<CheckSubject/>}/>
        <Route path="import" element={<Import/>} />
        <Route path="checksubject" element={<CheckSubject/>}/>
        <Route path="users" element={<Users/>}/>
        <Route path="mainpage" element={<MainPage/>}/>
        <Route path="login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
