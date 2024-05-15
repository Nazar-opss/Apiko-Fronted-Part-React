import { Link, Navigate, Outlet, Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import logo from './logo.svg'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useState, useCallback, memo, useReducer, useRef, useMemo } from "react";
import MainPage from "./pages/MainPage.js"
import Catalog from "./pages/Catalog.js"
import Cocktail from "./pages/Cocktail.js"
import Footer from "./components/Footer.js";

export const CocktailContext = React.createContext()

function App() {
  const [numberCart, setNumber] = useState(0)
  const [search, setSearch] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate();
  console.log(search)

  const navigateHome = () => {
    navigate("/")
  }

  const navigateSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // console.log(search)
      // setSearchParams({s: search})
      // console.log(searchParams)
      // console.log((`catalog/search/?s=${search}`))
      // navigate(`catalog/search/${search}`)
      // navigate({
      //   pathname: `catalog/search/${searchParams}`,
      // })
      navigate(`catalog/search/${search}`)
      setSearch('')
      // TODO in future: make it like ?s={search}
    }
  }

  const handleClick = () => {
    setNumber(numberCart + 1)
  }

  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="logo" className="logo" onClick={navigateHome}></img>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
          <TextField id="input-with-sx" label="Пошук" type="text" variant="standard" color="warning" 
            value={search} 
            onKeyDown={(e) => navigateSearch(e)} 
            onChange={(e) => setSearch(e.target.value)} />
        </Box> 
      
        <Box onClick={setNumber} className='cart'sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <h2>Cart</h2>
          <ShoppingCartIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
          <span className="cart_counter">{numberCart}</span>
        </Box>
      </header>
  <CocktailContext.Provider value={{numberCart, setNumber, handleClick}} >
      <main>
        <div className="main_container">
          <Outlet></Outlet>
          {/* <Routes>
            <Route key='Main' exact path="/" 
              Component={() => <MainPage />}
            />
            <Route key='Catalog' path="/Catalog/:letter" 
              Component={() => <Catalog />}
            />
            <Route key='Cocktail' path="/Cocktail" 
              Component={() => <Cocktail />}
            />
          </Routes> */}
        </div>
      </main>
      <footer>
        <Footer/>
      </footer>
  </CocktailContext.Provider>
    </div>
  );
}

export default App;
