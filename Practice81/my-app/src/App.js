import { Link, Navigate, Route, Routes } from "react-router-dom";
import logo from './logo.svg'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from "react";


function App() {
  const [number, setNumber] = useState(0)

  function handleClick() {
    setNumber(number + 1)
  }
  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="logo" className="logo" onClick={()=> console.log('Dumb')}></img>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
          <TextField id="input-with-sx" label="Search" variant="standard" color="warning" />
        </Box>
      
        <Box onClick={handleClick} className='cart'sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <h2>Cart</h2>
          <ShoppingCartIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
          <span className="cart_counter">{number}</span>
        </Box>
 
      </header>
    </div>
  );
}

export default App;
