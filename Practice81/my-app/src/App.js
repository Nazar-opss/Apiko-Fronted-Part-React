import { Link, Navigate, Route, Routes } from "react-router-dom";
import logo from './logo.svg'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

function App() {
  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="logo" className="logo"></img>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
          <TextField id="input-with-sx" label="With sx" variant="standard" />
        </Box>
      </header>
    </div>
  );
}

export default App;
