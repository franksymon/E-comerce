import {LoadingScreen,NavBar,Footer} from './components'
import {Home, Purchases, Shop} from './page'
import { HashRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';
import ProtectedRoutes from './components/ProtectedRoutes';
function App() {
  
  const isloading = useSelector((state) => state.isLoading)
  
  
  
  return (
    <HashRouter>
      <div className="App">
        
        {isloading && <LoadingScreen/>}
        
        <NavBar/>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/shop/:id' element= {<Shop/>}/>
          <Route element={<ProtectedRoutes/>}> 
            <Route path='/purchases' element= {<Purchases/>}/>
          </Route>
        </Routes>

        <Footer/>
      </div>
    </HashRouter>
  );
}

export default App;
