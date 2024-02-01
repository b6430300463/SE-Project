import './App.css';
import Import from './Screen/Import';
import CheckPage from './Screen/Check';
import Login from './Screen/Login';
import Input from './Screen/Input';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Input/>}/>
        <Route path="import" element={<Import/>} />
        <Route path="login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
