import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Homepage from './homepage/Homepage';
import Loginpage from './loginpage/Loginpage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Loginpage/>}/>
        <Route path='/chat' element={<Homepage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
