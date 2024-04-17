import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import logo from './logo.svg'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useState, useCallback, memo, useReducer, useRef } from "react";
import MainPage from "./pages/MainPage.js"
import Catalog from "./pages/Catalog.js"
import Cocktail from "./pages/Cocktail.js"
import Footer from "./components/Footer.js";

export const CocktailContext = React.createContext()

function App() {
  const [numberCart, setNumber] = useState(0)
  const [search, setSearch] = useState('')
  const navigate = useNavigate();
 
    const navigateHome = () => {
      navigate("/")
    }

  const initialState = {count: 0};

  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  // const handleClick = useCallback(() => {
  //   setNumber(numberCart => numberCart + 1)
  // }, []);
  // function handleClick() {
  //   setNumber(numberCart => numberCart + 1)
  // }
  
  let cartRef = useRef(0);

  const handleClick = () => {
      cartRef.current = cartRef.current + 1;
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    console.log(search)
}
  // TODO: Stop re-rerender please AAAAAAAAAAAAAAAAAAAAAAAAAA!!!!!!!!!!!!!!!!!!!! Fix search rere
  return (
  <CocktailContext.Provider value={{handleClick, numberCart, cartRef, setNumber, initialState, reducer, state, dispatch}} >
    <div className="App">
      <header className="header">
        <img src={logo} alt="logo" className="logo" onClick={navigateHome}></img>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
          <TextField id="input-with-sx" label="Пошук" variant="standard" color="warning" value={search} onChange={e => handleSearch(e)} />
        </Box>
      
        <Box onClick={handleClick} className='cart'sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <h2>Cart</h2>
          <ShoppingCartIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
          {/* <span className="cart_counter">{numberCart}</span> */}
          <span className="cart_counter">{cartRef.current}</span>
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
        <Footer/>
      </footer>
    </div>
  </CocktailContext.Provider>
  );
}

export default App;
