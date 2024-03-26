import { Link, Navigate, Route, Routes } from "react-router-dom";
import logo from './logo.svg'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useState } from "react";
import MainPage from "./pages/MainPage.js"
import Catalog from "./pages/Catalog.js"
import Cocktail from "./pages/Cocktail.js"

export const CocktailContext = React.createContext()

function App() {
  const [number, setNumber] = useState(0)

  function handleClick() {
    setNumber(number => number + 1)
  }
 
  return (
  <CocktailContext.Provider value={{handleClick, number}} >
    <div className="App">
      <header className="header">
        <img src={logo} alt="logo" className="logo" onClick={()=> console.log('Dumb')}></img>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
          <TextField id="input-with-sx" label="Пошук" variant="standard" color="warning" />
        </Box>
      
        <Box onClick={handleClick} className='cart'sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <h2>Cart</h2>
          <ShoppingCartIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
          <span className="cart_counter">{number}</span>
        </Box>
      </header>
      <main>
        <div className="main_container">
          <Routes>
            <Route key='Main' exact path="/" 
              Component={() => <MainPage />}
            />
            <Route key='Catalog' path="/Catalog" 
              Component={() => <Catalog />}
            />
            <Route key='Cocktail' path="/Cocktail" 
              Component={() => <Cocktail />}
            />
          </Routes>
        </div>
      </main>
      <footer>

      </footer>
    </div>
  </CocktailContext.Provider>
  );
}

export default App;
