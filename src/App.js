import './App.css';
import {Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar';
import Home from './Components/Home'
import Coins from './Components/Coins'
import CoinDetails from './Components/CoinDetails'
import Exchanges from './Components/Exchanges'
import Footer from './Components/Footer';


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/coins' element={<Coins/>}></Route>
      <Route exact path='/exchanges' element={<Exchanges/>}></Route>
      <Route exact path='/coin/:id' element={<CoinDetails/>}></Route>  
      </Routes> 
      <Footer/>  
    </>
  );
}

export default App;
